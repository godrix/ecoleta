import styled from 'styled-components/native';
import assets from '../../constants/assets';
import {RectButton} from 'react-native-gesture-handler';
import colors from '../../constants/colors';
export const Container = styled.ImageBackground.attrs({
  source: assets.backgroud,
  imageStyle:{
    width:274,
    height:368
  }
})`
  flex: 1;
  padding: 32px;
`;

export const Main = styled.View`
    flex: 1;
    justify-content: center;`

export const Title = styled.Text`
color: ${colors.secondaryColor};
font-size: 32px;
font-family: 'Ubuntu_700Bold';
max-width: 260px;
margin-top: 64px;
`;

export const Description = styled.Text`
color: ${colors.paragraph};
font-size: 16px;
margin-top: 16px;
font-family: 'Roboto_400Regular';
max-width: 260px;
line-height: 24px;
`;

export const Footer = styled.View`

`;


export const Select = styled.View``;

export const Input = styled.View`
height: 60px;
background-color: ${colors.tintColor};
border-radius: 10px;
margin-bottom: 8px;
padding: 0 24px;
font-size: 16;
`;

export const Button = styled(RectButton)`
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
