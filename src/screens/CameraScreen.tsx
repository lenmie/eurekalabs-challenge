import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Camera, useCameraDevice, useCameraPermission } from 'react-native-vision-camera';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import ShutterButton from '../components/ShutterButton';

const CameraScreen = ({ navigation }) => {
  const device = useCameraDevice('back');
  const camera = useRef<Camera>(null);
  const { hasPermission } = useCameraPermission();
  const [isTakingPhoto, setIsTakingPhoto] = useState(false);
  const [isCameraReady, setIsCameraReady] = useState(false); // New state to track camera initialization

  const handleShutterButtonPress = async () => {
    if (camera.current && !isTakingPhoto && isCameraReady) {
      // Check if camera is ready
      setIsTakingPhoto(true);
      try {
        const photo = await camera.current.takePhoto();
        await CameraRoll.save(`file://${photo.path}`, {
          type: 'photo',
          album: 'VisionCamera',
        });
      } catch (error) {
        console.error('Failed to take photo:', error);
      } finally {
        setIsTakingPhoto(false);
      }
    }

    navigation.navigate('Snapshot');
  };

  useEffect(() => {
    if (!hasPermission) {
      // Handle camera permission not granted
      return;
    }
  }, [hasPermission]);

  return (
    <View style={styles.container}>
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
