import React from 'react';
import PropTypes from 'prop-types';
import { GalleryItem, GalleryImage } from './ImageGalleryItem.styled';

export const ImageItem = ({ id, webformatURL, tags, onClick }) => {
  return (
    <GalleryItem>
      <GalleryImage src={webformatURL} alt={tags} id={id} onClick={onClick} />
    </GalleryItem>
  );
};

ImageItem.propTypes = {
  id: PropTypes.number.isRequired,
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
