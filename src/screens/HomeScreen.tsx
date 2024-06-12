import * as React from 'react';
import { View, Text, Button } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { useCameraPermission } from 'react-native-vision-camera';

export default function HomeScreen({ navigation }) {
  const { hasPermission, requestPermission } = useCameraPermission();

  React.useEffect(() => {
    Geolocation.setRNConfiguration({
      skipPermissionRequests: false,
      authorizationLevel: 'whenInUse',
      enableBackgroundLocationUpdates: true,
      locationProvider: 'playServices',
    });

    Geolocation.requestAuthorization();

    Geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
      },
      (error) => {
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  }, []);

  React.useEffect(() => {
    requestPermission();
  }, []);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button title="camera" onPress={() => navigation.push('Camera')} />
    </View>
  );
}
