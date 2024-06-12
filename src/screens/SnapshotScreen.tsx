import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, Text, Button, Share, TouchableOpacity } from 'react-native'; // Import Button and Share
import { CameraRoll } from '@react-native-camera-roll/camera-roll';

const SnapshotScreen: React.FC = ({ navigation }) => {
  const [snapshot, setSnapshot] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const photos = await CameraRoll.getPhotos({
        first: 1,
        assetType: 'Photos',
        sortBy: 'creationTime',
        groupTypes: 'All',
      });

      if (photos.edges.length > 0) {
        const lastPhoto = photos.edges[0].node.image.uri;
        setSnapshot(lastPhoto);
      }
    })();
  }, []);

  const onShare = async () => {
    if (snapshot) {
      try {
        await Share.share({
          message: 'Check out this snapshot!',
          url: snapshot,
        });
      } catch (error) {
        // Handle error
      }
    }
  };

  const goToHome = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      {snapshot && <Image source={{ uri: snapshot }} style={styles.image} />}
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
});

export default SnapshotScreen;
