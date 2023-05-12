import React from 'react';
import PropTypes from 'prop-types';
import { ButtonLoadMore } from './Button.styled';

const BtnLoadMore = ({ onClick }) => {
  return <ButtonLoadMore onClick={onClick}>Load More</ButtonLoadMore>;
};

export default BtnLoadMore;

BtnLoadMore.propTypes = {
  onClick: PropTypes.func.isRequired,
};
