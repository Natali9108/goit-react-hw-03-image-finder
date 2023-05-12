import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '34816104-0e2476e874eadf366edbb741b';
export const PER_PAGE = 12;

export const fetchImagesWithQuery = async (searchQuery, page) => {
  const response =
    await axios.get(`?key=${API_KEY}&q=${searchQuery}&page=${page}&image_type=photo&orientation=horizontal&per_page=${PER_PAGE}

  `);
  // {
  //   params: {
  //     key: '34816104-0e2476e874eadf366edbb741b',
  //     q: `${searchQuery}`,
  //     image_type: 'photo',
  //     orientation: 'horizontal',
  //     per_page: 12,
  //   },
  // });
  // console.log(response.headers);
  // console.log(response.config);

  return response.data;
};

// export default { fetchImagesWithQuery };
