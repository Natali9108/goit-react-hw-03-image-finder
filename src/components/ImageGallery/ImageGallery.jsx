import React, { Component } from 'react';
import { toast } from 'react-toastify';
import { fetchImagesWithQuery } from '../../servises/Api';
import { PER_PAGE as paginationLimit } from '../../servises/Api';
import { ImageItem } from './ImageGalleryItem';
import { ImageList } from './ImageGallery.styled';
import ErrorViev from '../Errors';
import Loader from '../Loader';
import BtnLoadMore from '../Button';
import Modal from '../Modal';

export default class ImageGallery extends Component {
  state = {
    images: [],
    status: 'idle',
    error: null,
    showModal: false,
    page: 1,
    total: paginationLimit,
    activeImage: 0,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { page, total } = this.state;
    const { searchQuery } = this.props;
    const prevValue = prevProps.searchQuery;
    const nextValue = searchQuery;
    const prevPage = prevState.page;
    const nextPage = page;

    try {
      const searchImages = await fetchImagesWithQuery(nextValue, page);
      if (prevValue !== nextValue) {
        this.setState({ status: 'pending', page: 1 });

        this.setState({
          images: searchImages.hits,
          status: 'resolved',
          page: 1,
          showBtn: true,
          total: paginationLimit,
        });
      }

      if (prevPage !== nextPage && nextPage > 1 && prevValue === nextValue) {
        this.setState({ status: 'pending' });

        this.setState(prevState => ({
          images: searchImages.hits,
          status: 'resolved',
          showBtn: true,
          total: prevState.total + paginationLimit,
        }));
        if (total >= searchImages.total) {
          toast.info(
            "We're sorry, but you've reached the end of search results."
          );
          this.setState({ status: '' });
        }
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

  filterById = () => {
    const { images, activeImage } = this.state;
    const filterImage = images.filter(
      image => image.id === Number(activeImage)
    );

    return filterImage[0];
  };

  render() {
    const { images, error, status, showBtn, showModal } = this.state;

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
            <Modal image={this.filterById()} onClose={this.toggleModal} />
          )}
        </>
      );
    }
  }
}
