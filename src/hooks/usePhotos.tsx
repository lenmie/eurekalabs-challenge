import React from 'react';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';

const usePhotos = () => {
  const [photos, setPhotos] = React.useState([]);
  const [page, setPage] = React.useState(1); // Track the current page of photos
  

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

  return { photos, loadMorePhotos, getPhotos };
};

export default usePhotos;
