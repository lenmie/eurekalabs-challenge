import * as React from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  PermissionsAndroid,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { useCameraPermission } from 'react-native-vision-camera';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import { useFocusEffect } from '@react-navigation/native';
import PhotoGrid from '../components/PhotoGrid';

const { width, height } = Dimensions.get('window');
const imageWidth = width / 3 - 10; // Calculate the image width based on the number of columns and spacing
const bottomButtonMargin = height * 0.1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default function HomeScreen({ navigation }) {
  const [photos, setPhotos] = React.useState([]);
  const [page, setPage] = React.useState(1); // Track the current page of photos

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
        <Text style={styles.buttonText}>Camera</Text>
      </TouchableOpacity>
      <PhotoGrid photos={photos} onEndReached={loadMorePhotos} />
    </View>
  );
}
