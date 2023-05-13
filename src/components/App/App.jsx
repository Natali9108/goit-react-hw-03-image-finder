import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { Component } from 'react';
import PropTypes from 'prop-types';
import { fetchImagesWithQuery } from '../../servises/Api';
import {
  BtnLoadMore,
  ImageGallery,
  Loader,
  Modal,
  Searchbar,
} from 'components';
import { Container, MessageText } from './App.styled';

export class App extends Component {
  state = {
    searchQuery: '',
    images: [],
    isLoading: false,
    showBtn: false,
    error: '',
    showModal: false,
    page: 1,
    total: 0,
    activeImage: 0,
  };

  static propTypes = {
    message: PropTypes.string,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.number.isRequired,
        id: PropTypes.number.isRequired,
        webformatURL: PropTypes.string.isRequired,
        tags: PropTypes.string.isRequired,
        onClick: PropTypes.func.isRequired,
      })
    ),
  };

  async componentDidUpdate(__, prevState) {
    const { page, searchQuery } = this.state;
    const prevValue = prevState.searchQuery;
    const nextValue = searchQuery;
    const prevPage = prevState.page;
    const nextPage = page;

    try {
      if (prevValue !== nextValue || prevPage !== nextPage) {
        this.setState({ isLoading: true });
        const searchImages = await fetchImagesWithQuery(nextValue, page);
        this.setState(prevState => ({
          images: [...prevState.images, ...searchImages.hits],
          isLoading: false,
          total: searchImages.total,
          showBtn: page < Math.ceil(searchImages.total / 12),
        }));
      }

      if (this.state.images.length > prevState.images.length) {
        const interval = setInterval(() => {
          window.scrollBy(0, 10);
          if (
            document.documentElement.clientHeight + window.pageYOffset ===
            document.body.offsetHeight
          ) {
            clearInterval(interval);
          }
        }, 10);
      }
    } catch (error) {
      this.setState({ error });
    }
  }

  handleFormSubmit = searchQuery => {
    this.setState({ searchQuery: searchQuery, page: 1, images: [] });
  };

  handleLoadMore = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
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
    const { images, error, showBtn, showModal, searchQuery, isLoading, total } =
      this.state;

    return (
      <Container>
        <Searchbar getImageName={this.handleFormSubmit} images={images} />

        {!searchQuery && !images.length && (
          <MessageText>Please enter a value to search for images</MessageText>
        )}

        {error && <MessageText>{error.message}... 😭 </MessageText>}

        {!isLoading && searchQuery && !images.length && (
          <MessageText>
            By request {searchQuery} no images were found... 😭
          </MessageText>
        )}

        {images.length > 0 && (
          <ImageGallery images={images} onClick={this.handleClickImage} />
        )}

        {isLoading && <Loader />}

        {showBtn && <BtnLoadMore onClick={this.handleLoadMore} />}

        {images.length > 0 && total === images.length && (
          <MessageText>
            We're sorry, but you've reached the end of search results.
          </MessageText>
        )}

        {showModal && (
          <Modal image={this.filterById()} onClose={this.toggleModal} />
        )}
        <ToastContainer />
      </Container>
    );
  }
}
