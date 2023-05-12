import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { Component } from 'react';
import PropTypes from 'prop-types';
import { fetchImagesWithQuery } from '../../servises/Api';
import Searchbar from '../Searchbar';
import ImageGallery from '../ImageGallery';
import ErrorViev from '../Errors';
import Loader from '../Loader';
import BtnLoadMore from '../Button';
import Modal from '../Modal';
import { Container, MessageText } from './App.styled';

export class App extends Component {
  state = {
    searchQuery: '',
    images: [],
    isLoading: false,
    error: null,
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
    const { page, searchQuery, images } = this.state;
    const prevValue = prevState.searchQuery;
    const nextValue = searchQuery;
    const prevPage = prevState.page;
    const nextPage = page;

    try {
      if (prevValue !== nextValue || prevPage !== nextPage) {
        this.setState({ isLoading: true });
        const searchImages = await fetchImagesWithQuery(nextValue, page);
        this.setState(prevState => ({
          images: [...images, ...searchImages.hits],
          isLoading: false,
          total: searchImages.total,
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
      console.log(error);
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
    const { images, error, showModal, searchQuery, isLoading, total } =
      this.state;

    return (
      <Container>
        <Searchbar getImageName={this.handleFormSubmit} images={images} />

        {!searchQuery && images.length === 0 && (
          <div>
            <MessageText>Please enter a value to search for images</MessageText>
          </div>
        )}

        {error && <ErrorViev message={error.message} />}

        {searchQuery && images.length === 0 && (
          <ErrorViev
            message={`By request ${searchQuery} no images were found`}
          />
        )}

        {images.length > 0 && (
          <ImageGallery images={images} onClick={this.handleClickImage} />
        )}

        {isLoading && <Loader />}

        {!isLoading && images.length > 0 && images.length < total && (
          <BtnLoadMore onClick={this.handleLoadMore} />
        )}

        {images.length > 0 && total === images.length && (
          <ErrorViev message="We're sorry, but you've reached the end of search results." />
        )}

        {showModal && (
          <Modal image={this.filterById()} onClose={this.toggleModal} />
        )}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </Container>
    );
  }
}
