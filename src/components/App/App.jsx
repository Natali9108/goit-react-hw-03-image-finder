import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Component } from 'react';
import Searchbar from '../Searchbar';
import ImageGallery from '../ImageGallery';
import { Container } from './App.styled';

export class App extends Component {
  state = {
    searchQuery: '',
    images: [],
    error: null,
    status: 'idle',
    showBtn: false,
    showModal: false,
    page: 1,
  };

  handleFormSubmit = searchQuery => {
    this.setState({ searchQuery: searchQuery });
  };

  render() {
    const { searchQuery } = this.state;

    return (
      <Container>
        <Searchbar getImageName={this.handleFormSubmit} />
        <ImageGallery searchQuery={searchQuery} />
        <ToastContainer />
      </Container>
    );
  }
}
