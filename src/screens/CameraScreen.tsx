import React, { useRef, useState } from 'react';
import { View, StyleSheet, Text, PermissionsAndroid } from 'react-native';
import { Camera, useCameraDevice } from 'react-native-vision-camera';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import ShutterButton from '../components/ShutterButton';
import useCameraAndLocationPermissions from '../hooks/useCameraAndLocationPermissions';
import useTakePhoto from '../hooks/useTakePhoto';

const CameraScreen = ({ navigation }) => {
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
            onInitialized={() => setIsCameraReady(true)} // Set camera ready state to true when initialized
          />
          <ShutterButton
            onPress={handleShutterButtonPress}
            disabled={isTakingPhoto || !isCameraReady} // Disable button when taking photo or camera not ready
          />
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
