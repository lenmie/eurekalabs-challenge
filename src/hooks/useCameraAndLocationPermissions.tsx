import Geolocation from '@react-native-community/geolocation';
import React from 'react';
import { PermissionsAndroid } from 'react-native';

const getRequestPermissionCamera = () => {
  return PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA).then(
    (status) => status === PermissionsAndroid.RESULTS.GRANTED
  );
};
const useCameraAndLocationPermissions = (): boolean => {
  // due to a confict with the useCameraPermission hook, we will use the PermissionsAndroid API directly
  // const { hasPermission, requestPermission } = useCameraPermission();
  const [allPermissionsGranted, setAllPermissionsGranted] = React.useState(false);

  React.useEffect(() => {
    Geolocation.setRNConfiguration({
      skipPermissionRequests: false,
      authorizationLevel: 'whenInUse',
      enableBackgroundLocationUpdates: false,
      locationProvider: 'playServices',
    });

    getRequestPermissionCamera().then((granted) => {
      setAllPermissionsGranted(granted);
      Geolocation.requestAuthorization();
    });
  }, []);

  return allPermissionsGranted;
};

export default useCameraAndLocationPermissions;
