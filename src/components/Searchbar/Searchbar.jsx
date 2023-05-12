import React, { Component } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import {
  SearchbarBox,
  SearchForm,
  SearchFormBtn,
  SearchFormBtnLabel,
  SearchFormInput,
} from './Searchbar.styled';

class Searchbar extends Component {
  state = {
    searchQuery: '',
  };

  static propTypes = {
    onSubmit: PropTypes.func,
    onChange: PropTypes.func,
  };

  handleNameChange = evt => {
    this.setState({ searchQuery: evt.currentTarget.value.toLowerCase() });
  };

  handleSearch = evt => {
    const { searchQuery } = this.state;
    evt.preventDefault();

    if (searchQuery.trim() === '') {
      toast.error('Please enter a value to search for images');
      return;
    }

    this.props.getImageName(searchQuery);
    this.setState({ searchQuery: '' });
  };

  render() {
    return (
      <SearchbarBox>
        <SearchForm onSubmit={this.handleSearch}>
          <SearchFormBtn type="submit">
            <SearchFormBtnLabel>Search</SearchFormBtnLabel>
          </SearchFormBtn>

          <SearchFormInput
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleNameChange}
          />
        </SearchForm>
      </SearchbarBox>
    );
  }
}

export default Searchbar;
