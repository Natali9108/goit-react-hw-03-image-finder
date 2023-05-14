import React from 'react';
import PropTypes from 'prop-types';
import { ImageItem } from './ImageGalleryItem';
import { ImageList } from './ImageGallery.styled';

export const ImageGallery = ({ images, onClick }) => {
  return (
    <ImageList>
      {images.map(image => (
        <ImageItem
          key={image.id}
          webformatURL={image.webformatURL}
          tags={image.tags}
          onClick={() => onClick(image)}
        />
      ))}
    </ImageList>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.number,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
      onClick: PropTypes.func,
    })
  ),
};
