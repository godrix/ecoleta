import React, { useState, useEffect, useRef } from 'react';
import { Text, View, TouchableOpacity, Modal } from 'react-native';
import {MaterialCommunityIcons as Icon} from '@expo/vector-icons'
import { Camera as RNCamera, CameraCapturedPicture } from 'expo-camera';

import { Container, ContainCamera, BTNCamera, BTNCam, BTNClose } from './styles';

interface CameraProps {
  isVisible:boolean;
  onTakePicture:(data:any)=>void;
  onCloseCamera:()=>void;
}

const Camera:React.FC<CameraProps> = ({ isVisible, onTakePicture, onCloseCamera }) => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const cameraRef = useRef<RNCamera>(null);
  const [type] = useState(RNCamera.Constants.Type.back);

  

  useEffect(() => {
    (async () => {
      const { status } = await RNCamera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  async function takePicture(){
    if(cameraRef){
      const picture = await cameraRef.current?.takePictureAsync({
        quality: 0.5,
        skipProcessing: true
      });

     onTakePicture(picture);
     onCloseCamera();
    }
  }

  return (
  <Modal 
    animationType="slide" 
    transparent={false} 
    visible={isVisible}
  >
    <Container>
      <RNCamera 
      style={{ flex: 1 }} 
      type={type}
      ref={cameraRef}
      >
        <ContainCamera>
          <TouchableOpacity style={{alignSelf: 'center'}} onPress={takePicture}>
            <BTNCamera>
              <BTNCam/>
            </BTNCamera>
          </TouchableOpacity>
          <BTNClose onPress={onCloseCamera}>
            <Icon name='close' size={45} color="#fff"/>
          </BTNClose>
        </ContainCamera>
      </RNCamera>
    </Container>
  </Modal>
  );
}

export default Camera;