import React from 'react';
import { ImageItem } from './ImageGalleryItem';
import { ImageList } from './ImageGallery.styled';

const ImageGalerry = ({ images }) => {
  return (
    <ImageList>
      {images.map(({ id, webformatURL, tags }) => (
        <ImageItem key={id} webformatURL={webformatURL} tag={tags} />
      ))}
    </ImageList>
  );
};

export default ImageGalerry;
