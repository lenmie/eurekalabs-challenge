import * as React from 'react';
import { View, Text, PermissionsAndroid, Dimensions, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import { useFocusEffect } from '@react-navigation/native';
import PhotoGrid from '../components/PhotoGrid';
import { COLORS } from '../constants/colors';

const { width, height } = Dimensions.get('window');
const imageWidth = width / 3 - 10; // Calculate the image width based on the number of columns and spacing
const bottomButtonMargin = height * 0.1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.BACKGROUND,
  },
  image: {
    width: imageWidth,
    height: imageWidth,
    margin: 5,
  },
  button: {
    zIndex: 1,
    position: 'absolute',
    bottom: bottomButtonMargin,
    backgroundColor: COLORS.PRIMARY,
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

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

export default function HomeScreen({ navigation }) {
  const [photos, setPhotos] = React.useState([]);
  const [page, setPage] = React.useState(1); // Track the current page of photos
  const [photosPermission, setPhotosPermission] = React.useState(false);

  React.useEffect(() => {
    getRequestPermissionPromise().then((hasPermission) => {
      if (hasPermission) {
        setPhotosPermission(true);
      }
    });
  }, []);

  useFocusEffect(() => {
    getPhotos();
  });

  const getPhotos = async () => {
    try {
      const { edges } = await CameraRoll.getPhotos({
        first: 20 * page,
        groupName: 'VisionCamera',
        groupTypes: 'Album',
      });
      setPhotos(edges);
    } catch (error) {
      console.log('Error retrieving photos:', error);
    }
  };

  const loadMorePhotos = () => {
    setPage(page + 1);
    getPhotos();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => navigation.push('Camera')}>
        <Text style={styles.buttonText}>Take a Picture</Text>
      </TouchableOpacity>
      {!photosPermission ? (
        <Text>need file access permission</Text>
      ) : (
        <PhotoGrid photos={photos} onEndReached={loadMorePhotos} />
      )}
    </View>
  );
}
