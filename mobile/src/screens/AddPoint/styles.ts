import styled from 'styled-components/native';
import Constants from 'expo-constants';
import colors from '../../constants/colors';
import RNMap, {Marker} from 'react-native-maps';

interface ItemProps{
    selected?:boolean;
}
export const Container = styled.View`
   flex: 1;
    padding: 0 32px;
    padding-top: ${20 + Constants.statusBarHeight}px;
`;

export const Title = styled.Text`
 font-size: 20px;
 font-family: 'Ubuntu_700Bold';
margin-top: 24px;
`;
export const Description = styled.Text`
 color: ${colors.paragraph};
 font-size: 16px;
    margin-top: 4px;
    font-family: 'Roboto_400Regular';
`;
export const MapContainer = styled.View`
 flex: 1;
 width: 100%;
 border-radius: 10px;
 overflow: hidden;
 margin-top: 16px;
`;

export const HeaderButton = styled.View`
flex-direction:row;
justify-content:space-between;
`;

export const Map = styled(RNMap)`
width:100%;
height:350px;
`;
export const MapMarker = styled(Marker)`
width: 90px;
height: 80px; 
`;
export const ImageContainer = styled.TouchableOpacity.attrs({
  activeOpacity:0.6
})`
 width: 90%;
 height: 200px;
 margin:0 auto;
 background: ${colors.primaryColor};
 flex-direction: column;
 border-radius: 8px;
 align-items: center;
 justify-content:center;
`;

export const TakeImage = styled.Image`
 
border-radius:8px;
align-items:center;
justify-content:center;
height:90%;
width:90%;
  `;
export const ImageSelect = styled.View`
border-style:dashed;
border-color:${colors.tintColor};
border-width:2px;
align-items:center;
justify-content:center;
height:90%;
width:90%;
`;
export const ImageLabel = styled.Text`
font-family: 'Roboto_400Regular';
color: ${colors.tintColor};
font-size: 21px;

`;

export const ItemsContainer = styled.View`
 flex-direction: row;
margin-top: 16px;
margin-bottom: 32px;
border-style:dashed;
border-color:${colors.tintColor};
border-width:25px;
`;
export const Item = styled.TouchableOpacity.attrs({
    activeOpacity:0.6
})<ItemProps>`
    background: #fff;
    border-width: 2px;
    border-color: ${props => !props.selected ?colors.paragraph : colors.primaryColor};
    height: 120px;
    width: 120px;
    border-radius: 8px;
    padding: 0 16px;
    padding-top: 20px;
    padding-bottom: 16px;
    margin-right: 8px;
    align-items: center;
    justify-content: space-between;
    text-align: center;
`;
export const SelectedItem = styled.View`
 border-color: ${colors.primaryColor};
    border-width: 1px;
`;
export const ItemTitle = styled.Text`
 font-family: 'Roboto_400Regular';
    text-align: center;
    font-size: 13px;
`;

export const Input = styled.TextInput.attrs({
  placeholder:'Nome do local'
})`
background:#fff;
margin: 30px;
height:50px;
border-radius:5px;
padding-left:10px;
font-size:21px;
`;


