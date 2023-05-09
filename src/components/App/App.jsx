import { Component } from 'react';
import axios from 'axios';
import Searchbar from '../Searchbar';
import ImageGalerry from '../ImageGallery';
import { Container } from './App.styled';

// https://pixabay.com/api/?q=cat&page=1&key=your_key&image_type=photo&orientation=horizontal&per_page=12

export class App extends Component {
  state = {
    image: null,
    loading: false,
  };

  async componentDidMount() {
    this.setState({ loading: true });
    const response = await axios.get(
      'https://pixabay.com/api/?q=cat&page=1&key=34816104-0e2476e874eadf366edbb741b&image_type=photo&orientation=horizontal&per_page=12'
    );
    this.setState({ image: response.data.hits, loading: false });
  }

  render() {
    const { image, loading } = this.state;
    return (
      <Container>
        <Searchbar />
        {loading && <span>Images loading....</span>}
        {/* {image && (
          <ul>
            {image.map(el => (
              <li key={el.id}>
                <img src={el.webformatURL} alt={el.name} />
              </li>
            ))}
          </ul>
        )} */}
        {image && <ImageGalerry images={image} />}
      </Container>
    );
  }
}
