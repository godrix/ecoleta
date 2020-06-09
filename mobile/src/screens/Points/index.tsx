import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Alert, SafeAreaView, FlatList } from 'react-native';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';
import { Feather as Icon } from '@expo/vector-icons';
import { SvgUri } from 'react-native-svg';
import colors from '../../constants/colors';
import api from '../../services/api';
import { useAuth } from '../../hooks/useAuth';
import axios from 'axios';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';

import { Container, Title, HeaderButton, Description, MapContainer, Map, ItemsContainer, Item, ItemTitle, MapMarker, MapMarkerContainer, MapMarkerImage, MapMarkerTitle } from './styles';

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


const Points: React.FC = () => {
  const navigation = useNavigation();
  const { user, logout } = useAuth();
  const [items, setItems] = useState<Item[]>([]);
  const [points, setPoints] = useState<Point[]>([])
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0]);
  const [reverseLocation, setReverseLocation] = useState<ReverseLocation>({} as ReverseLocation);

  useEffect(() => {
    (async () => {
      const { granted } = await Location.requestPermissionsAsync();

      if (!granted) {
        Alert.alert('Ooops', 'Precisamos de sua permisao de localizacao');
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

  function handleLogout() {
    logout();
  }


  function handleNavigateToDetail(id: number): void {
    navigation.navigate('Detail', { point_id: id });
  }

  function handleNavigateAddPoint(): void {
    navigation.navigate('AddPoint');
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container>
        <HeaderButton>
          <TouchableOpacity onPress={handleLogout}>
            <Icon name="log-out" size={20} color={colors.primaryColor} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleNavigateAddPoint}>
            <Icon name="plus-circle" size={20} color={colors.primaryColor} />
          </TouchableOpacity>
        </HeaderButton>
        <Title>
          Olá, {user?.name}
        </Title>
        <Description>
          Encontre no mapa um ponto de coleta
    </Description>
        <MapContainer>
          {
            initialPosition[0] === 0 ? (
              <ShimmerPlaceHolder autoRun={true}  style={{ height: '100%', width:'100%' }}/>
            ) : (<Map
              loadingEnabled={initialPosition[0] === 0}
              initialRegion={{ latitude: initialPosition[0], longitude: initialPosition[1], latitudeDelta: 0.014, longitudeDelta: 0.014 }}
            >
              {points.map(point => (<MapMarker
                key={String(point.id)}
                coordinate={{ latitude: Number(point.latitude), longitude: Number(point.longitude) }}
                onPress={() => handleNavigateToDetail(point.id)}
              >
                <MapMarkerContainer>
                  <MapMarkerImage source={{ uri: point.imageUrl }} />
                  <MapMarkerTitle>{point.name}</MapMarkerTitle>
                </MapMarkerContainer>
              </MapMarker>))}
            </Map>)
          }
        </MapContainer>
      </Container>
      <ItemsContainer>
        <FlatList
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
        />
      </ItemsContainer>
    </SafeAreaView>
  );
}

export default Points;