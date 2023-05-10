import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Component } from 'react';

import Searchbar from '../Searchbar';
import { fetchImagesWithQuery } from '../../servises/Api';
import ImageGallery from '../ImageGallery';
import { Container } from './App.styled';
import ErrorViev from '../Errors';
import Loader from '../Loader';

export class App extends Component {
  state = {
    searchQuery: '',
    images: [],
    error: null,
    status: 'idle',
  };

  async componentDidUpdate(prevProps, prevState) {
    const prevValue = prevState.searchQuery;
    const nextValue = this.state.searchQuery;

    if (prevValue !== nextValue) {
      this.setState({ status: 'pending' });
      try {
        const searchImages = await fetchImagesWithQuery(nextValue);
        this.setState({ images: searchImages, status: 'resolved' });
      } catch (error) {
        this.setState({ error, status: 'rejected' });
        console.log(error);
      }
    }
  }

  handleFormSubmit = searchQuery => {
    this.setState({ searchQuery: searchQuery });
  };

  render() {
    const { images, error, status } = this.state;

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
        <ToastContainer />
      </Container>
    );
  }
}
