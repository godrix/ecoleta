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
height:100%;
`;
export const MapMarker = styled(Marker)`
width: 90px;
    height: 80px; 
`;
export const MapMarkerContainer = styled.View`
 width: 90px;
 height: 70px;
 background: ${colors.primaryColor};
 flex-direction: column;
 border-radius: 8px;
 overflow: hidden;
 align-items: center;
`;
export const MapMarkerImage = styled.Image.attrs({
  resizeMode: 'cover'
})`
width: 90px;
height: 45px;
`;
export const MapMarkerTitle = styled.Text`
flex: 1px;
font-family: 'Roboto_400Regular';
color: ${colors.tintColor};
font-size: 13px;
line-height: 23px;
`;

export const ItemsContainer = styled.View`
 flex-direction: row;
    margin-top: 16px;
    margin-bottom: 32px;
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
    border-width: 2px;
`;
export const ItemTitle = styled.Text`
 font-family: 'Roboto_400Regular';
    text-align: center;
    font-size: 13px;
`;
