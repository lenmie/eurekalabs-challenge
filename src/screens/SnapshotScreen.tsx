import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, Text, Button, Share } from 'react-native'; // Import Button and Share
import { CameraRoll } from '@react-native-camera-roll/camera-roll';

const SnapshotScreen: React.FC = () => {
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

  return (
    <View style={styles.container}>
      {snapshot && <Image source={{ uri: snapshot }} style={styles.image} />}
      <Button title="Share Snapshot" onPress={onShare} />
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
    height: '100%',
    resizeMode: 'contain',
  },
});

export default SnapshotScreen;
