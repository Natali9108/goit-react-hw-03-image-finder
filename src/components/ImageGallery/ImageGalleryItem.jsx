import React from 'react';
import { GalleryItem, GalleryImage } from './ImageGalleryItem.styled';

export const ImageItem = ({ id, webformatURL, tags, onClick }) => {
  return (
    <GalleryItem>
      <GalleryImage src={webformatURL} alt={tags} id={id} onClick={onClick} />
    </GalleryItem>
  );
};
