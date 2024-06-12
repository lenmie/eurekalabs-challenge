import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native'; // Import Button and Share
import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import Share from 'react-native-share';
import Geolocation from '@react-native-community/geolocation';
import { COLORS } from '../constants/colors';

const SnapshotScreen: React.FC = ({ navigation }) => {
  const [snapshot, setSnapshot] = useState<string | null>(null);
  const [location, setLocation] = useState('');

  useEffect(() => {
    (async () => {
      const photos = await CameraRoll.getPhotos({
        first: 1,
      });

      if (photos.edges.length > 0) {
        const lastPhoto = photos.edges[0].node.image.uri;
        setSnapshot(lastPhoto);
      }
    })();
  }, []);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation(`Lat: ${latitude}, Long: ${longitude}`);
      },
      (error) => {
        console.log(error);
        setLocation('Location not available');
      },
      { enableHighAccuracy: false, timeout: 15000, maximumAge: 10000 }
    );
  }, []);

  const onShare = async () => {
    // TODO: share function not working, there seems to be a problem with the uri given by CameraRoll
    if (snapshot) {
      Share.open({ url: snapshot, message: 'Watch this snapshot' })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          err && console.log(err);
        });
    }
  };

  const goToHome = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      {snapshot && <Image source={{ uri: snapshot }} style={styles.image} />}
      <Text style={styles.locationText}>Your Location: {location}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={onShare} style={styles.button}>
          <Text style={styles.buttonText}>Share Snapshot</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={goToHome} style={styles.button}>
          <Text style={styles.buttonText}>Go Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '80%',
    resizeMode: 'contain',
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
  locationText: {
    fontSize: 16,
    color: COLORS.ACCENT,
  },
});

export default SnapshotScreen;
