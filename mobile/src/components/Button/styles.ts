import styled from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler';
import colors from '../../constants/colors';

export const Container = styled(RectButton)`
background-color: ${colors.primaryColor};
height: 60px;
flex-direction: row;
border-radius: 10px;
overflow: hidden;
align-items: center;
margin-top: 8px;
`;
export const ButtonIcon = styled.View`
 height: 60px;
  width: 60px;
  background-color: rgba(0, 0, 0, 0.1);
  border-top-left-radius:10px;
  border-bottom-left-radius:10px;
  justify-content: center;
  align-items: center;
   
`;

export const ButtonText = styled.Text`
flex: 1;
justify-content: center;
text-align: center;
color: ${colors.tintColor};
font-family: 'Roboto_500Medium';
font-size: 18px;
`;