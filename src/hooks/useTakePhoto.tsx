import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import { useNavigation } from '@react-navigation/native';
import { useRef, useState } from 'react';
import { useCameraDevice } from 'react-native-vision-camera';

const useTakePhoto = () => {
  const navigation = useNavigation();
  const device = useCameraDevice('back');
  const camera = useRef<Camera>(null);
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
        navigation.navigate('Snapshot');
      }
    }
  };
  return { handleShutterButtonPress, device, camera, isTakingPhoto, isCameraReady, setIsCameraReady };
};

export default useTakePhoto;
