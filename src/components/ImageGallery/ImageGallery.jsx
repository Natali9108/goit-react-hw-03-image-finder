import React, { Component } from 'react';
import { fetchImagesWithQuery } from '../../servises/Api';
import { ImageItem } from './ImageGalleryItem';
import { ImageList } from './ImageGallery.styled';
import ErrorViev from '../Errors';
import Loader from '../Loader';
import BtnLoadMore from '../Button';
import Modal from '../Modal';

export default class ImageGallery extends Component {
  state = {
    // searchQuery: '',
    images: [],
    error: null,
    status: 'idle',
    showBtn: false,
    showModal: false,
    page: 1,
    activeImage: 0,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { page } = this.state;
    const { searchQuery } = this.props;
    const prevValue = prevProps.searchQuery;
    const nextValue = searchQuery;
    const prevPage = prevState.page;
    const nextPage = page;

    try {
      if (prevValue !== nextValue) {
        this.setState({ status: 'pending', page: 1 });
        const searchImages = await fetchImagesWithQuery(nextValue, page);
        this.setState({
          images: searchImages,
          status: 'resolved',
          page: 1,
          showBtn: true,
        });
      }

      if (prevPage !== nextPage && nextPage > 1 && prevValue === nextValue) {
        this.setState({ status: 'pending' });
        const loadMoreImages = await fetchImagesWithQuery(nextValue, nextPage);
        this.setState({
          images: loadMoreImages,
          status: 'resolved',
          showBtn: true,
        });
      }
    } catch (error) {
      this.setState({ error, status: 'rejected' });
      console.log(error);
    }
  }

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  handleClickImage = evt => {
    const { id } = evt.target;
    this.setState({ activeImage: id });
    this.toggleModal();
  };

  render() {
    const { images, error, status, showBtn, showModal, activeImage } =
      this.state;

    const filterById = () => {
      const filterImage = images.filter(
        image => image.id === Number(activeImage)
      );
      return filterImage[0];
    };

    if (status === 'idle') {
      return <div>Please enter a value to search for images</div>;
    }

    if (status === 'pending') {
      return <Loader />;
    }

    if (status === 'rejected') {
      return <ErrorViev message={error.message} />;
    }

    if (status === 'resolved' && images.length === 0) {
      return (
        <ErrorViev message="No images were found for the specified parameters, please try again" />
      );
    }

    if (status === 'resolved') {
      return (
        <>
          <ImageList>
            {images.length === 0 && (
              <ErrorViev
                message="No images were found for the specified parameters, please try
              again"
              />
            )}

            {images &&
              images.map(image => (
                <ImageItem
                  key={image.id}
                  id={image.id}
                  webformatURL={image.webformatURL}
                  tags={image.tags}
                  onClick={this.handleClickImage}
                />
              ))}
          </ImageList>
          {showBtn && status === 'resolved' && images.length !== 0 && (
            <BtnLoadMore onClick={this.handleLoadMore} />
          )}
          {showModal && (
            <Modal image={filterById()} onClose={this.toggleModal} />
          )}
        </>
      );
    }
  }
}
