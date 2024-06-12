import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Camera } from 'react-native-vision-camera';
import ShutterButton from '../components/ShutterButton';
import useCameraAndLocationPermissions from '../hooks/useCameraAndLocationPermissions';
import useTakePhoto from '../hooks/useTakePhoto';

const CameraScreen = () => {
  const allPermissionsGranted = useCameraAndLocationPermissions();
  const { handleShutterButtonPress, device, camera, isTakingPhoto, isCameraReady, setIsCameraReady } = useTakePhoto();

  return (
    <View style={styles.container}>
      {!allPermissionsGranted ? (
        <Text>need camera and geolocation permissions</Text>
      ) : (
        <>
          <Camera
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={true}
            ref={camera}
            photo={true}
            onInitialized={() => setIsCameraReady(true)}
          />
          <ShutterButton onPress={handleShutterButtonPress} disabled={isTakingPhoto || !isCameraReady} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CameraScreen;
