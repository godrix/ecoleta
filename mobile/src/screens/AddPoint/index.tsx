import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Alert, Text, FlatList, ScrollView } from 'react-native';
import * as Location from 'expo-location';
import {MapEvent} from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { Feather as Icon } from '@expo/vector-icons';
import { SvgUri } from 'react-native-svg';
import colors from '../../constants/colors';
import api from '../../services/api';
import { useAuth } from '../../hooks/useAuth';
import Camera from '../../components/Camera';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import Button from '../../components/Button';
import { Container, Title, Description, MapContainer, Map, ItemsContainer, Item, ItemTitle, MapMarker, ImageContainer, ImageSelect, ImageLabel, Input, TakeImage } from './styles';

interface Item {
  id: number;
  name: string;
  imageUrl: string;
}

interface Point {
  id: number;
  image: string;
  imageUrl: string;
  name: string;
  latitude: string;
  longitude: number;
  city: string;
  uf: string;
}

interface ReverseLocation {
  city: string;
  country: string;
  isoCountryCode: string;
  name: string;
  postalCode: string;
  region: string;
  street: string;
};

interface Picture {
  uri:string
}


const AddPoint: React.FC = () => {
  const navigation = useNavigation();
  const { user, logout } = useAuth();
  const [items, setItems] = useState<Item[]>([]);
  const [points, setPoints] = useState<Point[]>([])
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0]);
  const [reverseLocation, setReverseLocation] = useState<ReverseLocation>({} as ReverseLocation);

  const [isCameraVisible, setIsCameraVisible] = useState(false);
  const [picture, setPicture] = useState<Picture | null>(null);


  useEffect(() => {
    (async () => {
      const { granted } = await Location.requestPermissionsAsync();

      if (!granted) {
        Alert.alert('Ooops', 'Precisamos de sua permisão de localizacao');
        return;
      }

      const location = await Location.getCurrentPositionAsync();

      const { latitude, longitude } = location.coords;

      const humamLocation = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      setInitialPosition([latitude, longitude]);

      axios.get(`https://brasilapi.com.br/api/cep/v1/${humamLocation[0].postalCode}`).then(res => {
        humamLocation[0].region = res.data.state;
        humamLocation[0].city = res.data.city;
        setReverseLocation(humamLocation[0] as ReverseLocation);
        console.log(humamLocation[0]);
      });



    })();
  }, []);

  useEffect(() => {
    api.get('points', {
      params: {
        city: reverseLocation.city,
        uf: reverseLocation.region,
        items: selectedItems
      }
    }).then(response => {
      setPoints(response.data);
    }).catch(error => {
      setPoints([])
    });
  }, [reverseLocation, selectedItems]);

  useEffect(() => {
    api.get('/items').then(response => {
      setItems(response.data);
    });
  }, []);

  function handleSelecedItem(id: number): void {
    const alreadySelected = selectedItems.findIndex((item) => item === id);

    if (alreadySelected >= 0) {
      const filteredItems = selectedItems.filter((item) => item !== id);
      setSelectedItems(filteredItems);
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  }

  function handleMapLocation(event:MapEvent): void {
   const {latitude, longitude} =  event.nativeEvent.coordinate;

   setInitialPosition([latitude, longitude]);
  }

  function handleGoBack(): void {
    navigation.goBack();
  }

  const onOpenCamera = ()=>{
    setIsCameraVisible(true);
  };

  const onCloseCamera = () => {
     setIsCameraVisible(false);
  };

  useEffect(()=>{
    console.log(picture)
  },[picture])


  return (
    <ScrollView style={{ flex: 1 }}>
      <Container>
          <TouchableOpacity onPress={handleGoBack}>
            <Icon name="arrow-left" size={20} color={colors.primaryColor} />
          </TouchableOpacity>
        <Title>
          Cadastro de um ponto de coleta
        </Title>
        <Description>
          Encontre no mapa um ponto de coleta
    </Description>
        <MapContainer>
          {
            initialPosition[0] === 0 ? (
              <ShimmerPlaceHolder 
                autoRun={true}
                style={{ height: 350, width:'100%' }}/>
            ) : (
            <Map
            onPress={handleMapLocation}
            loadingEnabled={initialPosition[0] === 0}
            initialRegion={{ latitude: initialPosition[0], longitude: initialPosition[1], latitudeDelta: 0.014, longitudeDelta: 0.014 }}
            >
              <MapMarker
                coordinate={{ latitude: Number(initialPosition[0]), longitude: Number(initialPosition[1]) }}
                
              >
              </MapMarker>
            </Map>)
          }
        </MapContainer>
      </Container>
      <ItemsContainer>
        {items.length < 0 ? (
          <ShimmerPlaceHolder 
          autoRun={true}
          style={{ height: 120, width:'100%' }}/>
        ) : (<FlatList
          horizontal
          contentContainerStyle={{ paddingHorizontal: 20 }}
          showsHorizontalScrollIndicator={false}
          data={items}
          renderItem={({ item }) =>
            <Item
              onPress={() => handleSelecedItem(item.id)}
              selected={selectedItems.includes(item.id)}
            >
              <SvgUri width={42} height={42} uri={item.imageUrl}></SvgUri>
              <ItemTitle>
                {item.name}
              </ItemTitle>
            </Item>
          }
          keyExtractor={item => String(item.id)}
        />)}
        
      </ItemsContainer>
      <ImageContainer onPress={onOpenCamera}>
        {picture ? (
         <TakeImage source={{uri:picture.uri}}/>
        ):(
          <ImageSelect>
          <Icon name="camera" color={colors.tintColor} size={50}/>
          <ImageLabel>
            Imagem do local
          </ImageLabel>
        </ImageSelect>
        )  
      }
      </ImageContainer>
      <Input/>
     <Button icon='send' label="Cadastrar local" style={{marginBottom:50, marginLeft:25, marginRight:25}}/>
    <Camera  
      isVisible={isCameraVisible} 
      onCloseCamera={onCloseCamera}
      onTakePicture={setPicture}
      />
    </ScrollView>
  );
}

export default AddPoint;