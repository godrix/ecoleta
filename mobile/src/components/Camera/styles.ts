import styled from 'styled-components/native';

export const Container = styled.View`
  flex:1;
`;

export const ContainCamera = styled.View`
  flex: 1;
  background: transparent;
  justify-content: flex-end;
`;

export const BTNCamera = styled.View`
  margin-bottom:50px;
  border-width: 2px;
  border-radius:25px;
  border-color: white;
  height: 50px;
  width:50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const BTNCam = styled.View`
  border-width: 2px;
  border-radius:20px;
  border-color: white;
  height: 40px;
  width:40px;
  background: white;
`;

export const BTNClose = styled.TouchableOpacity.attrs({
  hitSlop:{ top: 20, bottom: 20, left: 50, right: 50 }
})`
  position:absolute;
  top:50px;
  right:35px;
`;
