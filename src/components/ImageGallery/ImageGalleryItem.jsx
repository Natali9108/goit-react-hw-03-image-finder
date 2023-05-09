import React from 'react';
import { GalleryItem, GalleryImage } from './ImageGalleryItem.styled';

export const ImageItem = ({ webformatURL, tags }) => {
  return (
    <GalleryItem>
      <GalleryImage src={webformatURL} alt={tags} />
    </GalleryItem>
  );
};
