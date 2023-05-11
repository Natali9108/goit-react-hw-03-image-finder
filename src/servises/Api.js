import axios from 'axios';

export const fetchImagesWithQuery = async (searchQuery, page) => {
  const response =
    await axios.get(`https://pixabay.com/api/?key=34816104-0e2476e874eadf366edbb741b&q=${searchQuery}&page=${page}&image_type=photo&orientation=horizontal&per_page=12

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
  return response.data.hits;
};

// export default { fetchImagesWithQuery };
