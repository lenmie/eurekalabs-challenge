import * as React from 'react';
import { View, Text, Button, Platform, PermissionsAndroid } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { useCameraPermission } from 'react-native-vision-camera';

export default function HomeScreen({ navigation }) {
  const { hasPermission, requestPermission } = useCameraPermission();

  // React.useEffect(() => {
  //   Geolocation.setRNConfiguration({
  //     skipPermissionRequests: false,
  //     authorizationLevel: 'whenInUse',
  //     enableBackgroundLocationUpdates: true,
  //     locationProvider: 'playServices',
  //   });

  //   Geolocation.requestAuthorization();

  //   Geolocation.getCurrentPosition(
  //     (position) => {
  //       console.log(position);
  //     },
  //     (error) => {
  //       console.log(error.code, error.message);
  //     },
  //     { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
  //   );
  // }, []);

  // React.useEffect(() => {
  //   requestPermission();
  // }, []);

  const getRequestPermissionPromise = () => {
    if (Platform.Version >= 33) {
      return PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
      ]).then(
        (statuses) =>
          statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES] === PermissionsAndroid.RESULTS.GRANTED &&
          statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO] === PermissionsAndroid.RESULTS.GRANTED
      );
    } else {
      return PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE).then(
        (status) => status === PermissionsAndroid.RESULTS.GRANTED
      );
    }
  };

  React.useEffect(() => {
    getRequestPermissionPromise();
  }, []);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button title="camera" onPress={() => navigation.push('Camera')} />
    </View>
  );
}
