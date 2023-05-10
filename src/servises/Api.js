import axios from 'axios';

export const fetchImagesWithQuery = async searchQuery => {
  const response = await axios.get('https://pixabay.com/api', {
    params: {
      key: '34816104-0e2476e874eadf366edbb741b',
      q: `${searchQuery}`,
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: 12,
    },
  });

  return response.data.hits;
};

// export default { fetchImagesWithQuery };
