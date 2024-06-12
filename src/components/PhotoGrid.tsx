import React from 'react';
import { FlatList, Image, StyleSheet, View } from 'react-native';

interface PhotoGridProps {
  photos: any[];
  onEndReached: () => void;
}
const renderPhotoItem = ({ item }) => <Image source={{ uri: item.node.image.uri }} style={styles.image} />;

const PhotoGrid: React.FC<PhotoGridProps> = ({ photos, onEndReached }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={photos}
        renderItem={renderPhotoItem}
        keyExtractor={(_, index) => index.toString()}
        numColumns={3}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.1}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  image: {
    width: '30%',
    aspectRatio: 1,
    margin: 5,
  },
});

export default PhotoGrid;
