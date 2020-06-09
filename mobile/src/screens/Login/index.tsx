import React from 'react';
import { Image, Alert } from 'react-native';
import {Feather as Icon} from '@expo/vector-icons';
import assets from '../../constants/assets'; 
import { useAuth } from '../../hooks/useAuth';

import Button from '../../components/Button';


import { Container, Main, Title, Description, Footer} from './styles';

const Login: React.FC = () => {
  
  const {login} = useAuth();
  
  async function handleLoginWithFacebook(){
    login();
  }

  return <Container>
    <Main>
    <Image source={assets.logo}/>
      <Title>Seu marktplace de coleta de resíduos</Title>
      <Description>Ajudando pessoas a encontrar pontos de coletas, de forma eficiente</Description>
    </Main>
    <Footer>
      <Button icon='facebook' label='Entrar com Facebook' onPress={handleLoginWithFacebook}/>
    
    </Footer>
  </Container>;
}

export default Login;