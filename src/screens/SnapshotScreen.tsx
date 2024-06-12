import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
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
  return <View style={styles.container}>{snapshot && <Image source={{ uri: snapshot }} style={styles.image} />}</View>;

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>snapshot</Text>
    </View>
  );

  return (
    <Image
      style={{
        width: 300,
        height: 100,
      }}
      source={{ uri: snapshot }}
    />
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
