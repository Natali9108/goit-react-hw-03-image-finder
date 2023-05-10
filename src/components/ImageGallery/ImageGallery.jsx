import React from 'react';
// import api from '../../servises/Api';
import { ImageItem } from './ImageGalleryItem';
import { ImageList } from './ImageGallery.styled';
// import ErrorViev from '../Errors';
// import Loader from '../Loader';

const ImageGallery = ({ images }) => {
  return (
    <ImageList>
      {images.map(({ id, webformatURL, tags }) => (
        <ImageItem key={id} webformatURL={webformatURL} tag={tags} />
      ))}
    </ImageList>
  );
};
export default ImageGallery;

//  const ImageGallery {{images}} {
// state = {
//   images: [],
//   error: null,
//   status: 'idle',
// };

// async componentDidUpdate(prevProps, prevState) {
//   const prevValue = prevProps.searchQuery;
//   const nextValue = this.props.searchQuery;

//   if (prevValue !== nextValue) {
//     this.setState({ status: 'pending' });

//     try {
//       const searchImages = await api.fetchImagesWithQuery(nextValue);
//       this.setState({ images: searchImages, status: 'resolved' });
//     } catch (error) {
//       this.setState({ error, status: 'rejected' });
//     }
//   }
// }

// render() {
// const { images, error, status } = this.state;

// if (status === 'idle') {
//   return <div>Please enter a value to search for images</div>;
// }

// if (status === 'pending') {
//   return <Loader />;
// }

// if (status === 'rejected') {
//   return <ErrorViev message={error.message} />;
// }

// if (status === 'resolved') {
//       return (
//         <ImageList>
//           {images.length === 0 && (
//             <ErrorViev
//               message="No images were found for the specified parameters, please try
//               again"
//             />
//           )}

//           {images &&
//             images.map(image => (
//               <ImageItem
//                 key={image.id}
//                 webformatURL={image.webformatURL}
//                 tags={image.tags}
//               />
//             ))}
//         </ImageList>
//       );
//     // }
//   }
// }
