import React from 'react';
import { PermissionsAndroid, Platform } from 'react-native';

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

const usePhotoPermission = (): boolean => {
  const [photosPermission, setPhotosPermission] = React.useState(false);

  React.useEffect(() => {
    getRequestPermissionPromise().then((hasPermission) => {
      if (hasPermission) {
        setPhotosPermission(true);
      }
    });
  }, []);

  return photosPermission;
};

export default usePhotoPermission;
