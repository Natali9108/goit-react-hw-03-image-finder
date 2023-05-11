import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Component } from 'react';
import Searchbar from '../Searchbar';
import { fetchImagesWithQuery } from '../../servises/Api';
import ImageGallery from '../ImageGallery';
import { Container } from './App.styled';
import ErrorViev from '../Errors';
import Loader from '../Loader';
import BtnLoadMore from '../Button';

export class App extends Component {
  state = {
    searchQuery: '',
    images: [],
    error: null,
    status: 'idle',
    show: false,
    page: 1,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { searchQuery, page } = this.state;
    const prevValue = prevState.searchQuery;
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
          show: true,
        });
      }

      if (prevPage !== nextPage && nextPage > 1 && prevValue === nextValue) {
        this.setState({ status: 'pending' });
        console.log('work');
        const loadMoreImages = await fetchImagesWithQuery(nextValue, nextPage);
        this.setState({
          images: loadMoreImages,
          status: 'resolved',
          show: true,
        });
      }
    } catch (error) {
      this.setState({ error, status: 'rejected' });
      console.log(error);
    }
  }

  handleFormSubmit = searchQuery => {
    this.setState({ searchQuery: searchQuery });
  };

  toggle = () => {
    this.setState(({ show }) => ({ show: !show }));
  };

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
    console.log('click');
  };

  render() {
    const { images, error, status, show } = this.state;

    return (
      <Container>
        <Searchbar getImageName={this.handleFormSubmit} />
        {status === 'idle' && (
          <div>Please enter a value to search for images</div>
        )}
        {status === 'pending' && <Loader />}
        {status === 'rejected' && <ErrorViev message={error.message} />}
        {status === 'resolved' && images.length === 0 && (
          <ErrorViev
            message="No images were found for the specified parameters, please try
              again"
          />
        )}
        {status === 'resolved' && <ImageGallery images={images} />}
        {show && status === 'resolved' && images.length !== 0 && (
          <BtnLoadMore onClick={this.handleLoadMore} />
        )}

        <ToastContainer />
      </Container>
    );
  }
}
