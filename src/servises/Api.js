import axios from 'axios';
import PropTypes from 'prop-types';

const API_KEY = '34816104-0e2476e874eadf366edbb741b';
export const PER_PAGE = 12;

axios.defaults.baseURL = 'https://pixabay.com/api/';

axios.defaults.params = {
  orientation: 'horizontal',
  image_type: 'photo',
  per_page: PER_PAGE,
};

export const fetchImagesWithQuery = async (searchQuery, page) => {
  const { data } = await axios.get(
    `?key=${API_KEY}&q=${searchQuery}&page=${page}`
  );

  // `?key=${API_KEY}&q=${searchQuery}&page=${page}&image_type=photo&orientation=horizontal&per_page=${PER_PAGE}

  // `

  return data;
};

fetchImagesWithQuery.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  page: PropTypes.string.isRequired,
  PER_PAGE: PropTypes.string.isRequired,
};
