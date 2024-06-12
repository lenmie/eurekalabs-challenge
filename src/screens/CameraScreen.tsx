import React, { useEffect, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { Camera, Came, useCameraDevice, useCameraPermission } from 'react-native-vision-camera';

const CameraScreen = () => {
  const device = useCameraDevice('back');
  const { hasPermission } = useCameraPermission();

  //   if (!hasPermission) return <PermissionsPage />;
  //   if (device == null) return <NoCameraDeviceError />;

  return (
    <View style={styles.container}>
      <Camera style={StyleSheet.absoluteFill} device={device} isActive={true} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    width: '100%',
    height: '100%',
  },
});

export default CameraScreen;
