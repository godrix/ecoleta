import React, {useState, useEffect} from 'react';
import { SafeAreaView, TouchableOpacity } from 'react-native';
import {Feather as Icon, MaterialCommunityIcons} from '@expo/vector-icons';
import {useNavigation, useRoute} from '@react-navigation/native';
import colors from '../../constants/colors';
import api from '../../services/api';

import { Container, PointImage, PointName, PointItems, Address, AddressTitle, AddressContent, Footer, Button, ButtonText } from './styles';

interface RouterParams {
  point_id:number;
}

interface Data {
  collectionPoint: {
    image: string;
    imageUrl:string;
    name:string;
    email: string;
    whatsapp: string;
    latitude: number;
    longitude: number;
    city: string;
    uf: string;
  },
  collectionItems: {
      title: string;
    }[]
}

const Detail: React.FC = () => {
  const navigation = useNavigation();
  const [data, setData] = useState<Data>({} as Data);
  const route = useRoute();
  const routeParams = route.params as RouterParams;
 
useEffect(()=>{
  api.get(`points/${routeParams.point_id}`).then(response=>{
    setData(response.data);
  });
},[]);

  function handleGoback(){
    navigation.goBack();
  }

  if(!data.collectionPoint){
    return null;
  }
  return (
  <SafeAreaView style={{flex:1}}>
  <Container>
    <TouchableOpacity onPress={handleGoback}>
    <Icon name="arrow-left" color={colors.primaryColor} size={20} />
    </TouchableOpacity>
    <PointImage source={{uri:data.collectionPoint.imageUrl}}/>
    <PointName>
      {data.collectionPoint.name}
    </PointName>
    <PointItems>
      {data.collectionItems.map(item=>item.title).join(', ')}
    </PointItems>
    <Address>
      <AddressTitle>
        Endereço
      </AddressTitle>
      <AddressContent>
        {data.collectionPoint.city}, {data.collectionPoint.uf}
      </AddressContent>
    </Address>
  </Container>
  <Footer>
<Button>
  <Icon name="thumbs-up" color={colors.tintColor} size={30}/>
  <ButtonText>Gostei</ButtonText>
</Button>
<Button>
  <Icon name="thumbs-down" color={colors.tintColor} size={30}/>
  <ButtonText>Não Gostei</ButtonText>
</Button>
  </Footer>
  </SafeAreaView>
  );
}

export default Detail;