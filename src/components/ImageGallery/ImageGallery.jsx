import React from 'react';
import { ImageItem } from './ImageGalleryItem';
import { ImageList } from './ImageGallery.styled';

const ImageGallery = ({ images, onClick }) => {
  return (
    <ImageList>
      {images.map(({ id, webformatURL, tags }) => (
        <ImageItem
          key={id}
          id={id}
          webformatURL={webformatURL}
          tags={tags}
          onClick={onClick}
        />
      ))}
    </ImageList>
  );
};

export default ImageGallery;
