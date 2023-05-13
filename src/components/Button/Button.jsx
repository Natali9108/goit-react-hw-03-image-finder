import React from 'react';
import PropTypes from 'prop-types';
import { ButtonLoadMore } from './Button.styled';

export const BtnLoadMore = ({ onClick }) => {
  return <ButtonLoadMore onClick={onClick}>Load More</ButtonLoadMore>;
};

BtnLoadMore.propTypes = {
  onClick: PropTypes.func.isRequired,
};
