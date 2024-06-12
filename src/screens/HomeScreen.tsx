import * as React from 'react';
import { View, Text, PermissionsAndroid, Dimensions, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import { useFocusEffect } from '@react-navigation/native';
import PhotoGrid from '../components/PhotoGrid';
import { COLORS } from '../constants/colors';
import usePhotos from '../hooks/usePhotos';
import usePhotoPermission from '../hooks/usePhotoPermission';

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

export default function HomeScreen({ navigation }) {
  const { photos, loadMorePhotos, getPhotos } = usePhotos();
  const photosPermission = usePhotoPermission();

  useFocusEffect(() => {
    getPhotos();
  });
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
