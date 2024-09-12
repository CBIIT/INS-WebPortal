/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import styled from 'styled-components';
import xIcon from '../../../assets/img/xmark-solid.svg';
import SearchIconImg from './search.svg';
import CloseIconImg from './close.svg';

const Container = styled.div`
  width: 100%;

  .searchBoxAreaGroup{
    width: 100%
  }

  .selectionBubbleAreaGroup{
    width: 100%
  }
`;

const BubbleContainer = styled.div`
  max-width: calc(50% - 20px);
  border-radius: 20px;
  background-color: #EDF0F2;
  color: #2E5A79;
  border: 2px solid #ECBD4D;
  font-size: 13px;
  font-family: Lato;
  font-weight: 400;
  padding: 5px 14px;
  margin-left: 15px;
  float: left;

  .removeBubble {
    margin-left: 10px;
  }

  .removeBubble:hover {
    color: #07368b;
    cursor: pointer;
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  right: 320px;
  top: 100px;
  z-index: 10;
`;

const SearchBoxArea = styled.div`
  width: 50%;

  .searchBoxInputGroup {
    border-radius: 0;
    width: 100%;
    padding: 0 0 20px 0;
    display: flex;
    justify-content: center;
  }
  
  .searchBoxInputGroup .form-control {
    border-radius: 8px 0 0 8px;
    height: 40px;
    width: 700px;
    border: 1px solid #000000;
    color: #000000;
    padding-right: 40px;
    padding-left: 8px;
    font-size: 16px;
  }

  .searchBoxInputGroup .form-control:focus {
    box-shadow: none;
  }
  
  .searchBoxInputGroup .form-control::placeholder {
    color: #666666;
    padding-left: 5px;
    font-family: Inter;
    font-size: 16px;
    font-weight: 300;
    line-height: 19.36px;
    text-align: left;
  }
  
  .searchBoxButton {
    width: 120px;
    height: 40px;
    border-radius: 0 8px 8px 0;
    font-weight: bold;
    color: white;
    border: 2.5px solid #564587;
    background-color: #564587;
    position: relative;
    right: 1px;
    line-height: 26px;
  }

  .buttonDisabled {
    color: #fff;
    background-color: #564587;
    border-color: #564587;
  }

  input[type="search"]::-webkit-search-cancel-button {
    position: relative;
    right: -30px;
    -webkit-appearance: none;
    height: 20px;
    width: 20px;
    background: url(${xIcon}) right center no-repeat;
    background-image: url(${xIcon}) red;
    background-size: 20px;
    cursor: pointer;
  }

  input[type="search"]:focus::-webkit-search-cancel-button {
    position: relative;
    right: -30px;
    -webkit-appearance: none;
    height: 20px;
    width: 20px;
    background: url(${xIcon}) right center no-repeat;
    background-image: url(${xIcon}) red;
    background-size: 20px;
    cursor: pointer;
  }

`;

const SelectionBubbleArea = styled.div`
  width: 50%;
`;

const getSearchableText = (searchString) => {
  const termArr = searchString ? searchString.trim().split(' ') : [];
  const result = [];
  termArr.forEach((term) => {
    if (term) {
      const t = term.trim();
      if (t.length > 2) {
        result.push(t);
      }
    }
  });
  return result.length === 0 ? '' : result.join(' ');
};

const SearchBox = ({
  searchText,
  searchKeyword,
  resourceFilters,
  handleBubbleSearchTextRemoveClick,
  handleBubbleResourcesRemoveClick,
  onSearchBoxKeyPress,
  onSearchSubmit,
  onSearchTextInputChange,
}) => {
  const searchableText = getSearchableText(searchText);
  const bubbleSearchKeyword = getSearchableText(searchKeyword);

  const handleTextInputChange = (event) => {
    const text = event.target.value;
    onSearchTextInputChange(text);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && searchableText.length > 0) {
      onSearchBoxKeyPress();
    }
  };

  const handleSubmit = () => {
    onSearchSubmit();
  };

  return (
    <Container>
      <SearchBoxArea className="searchBoxAreaGroup">
        <InputGroup className="searchBoxInputGroup">
          <FormControl
            type="search"
            placeholder="Search Datasets by keywords"
            aria-label="Search Datasets by keywords"
            aria-describedby="basic-addon"
            value={searchText}
            onChange={(e) => handleTextInputChange(e)}
            onKeyPress={(e) => handleKeyPress(e)}
          />
          <SearchIcon>
            <img src={SearchIconImg} alt="search-icon" />
          </SearchIcon>
          {
            searchableText.length > 0 ? (
              <Button variant="outline-secondary" className="searchBoxButton" onClick={() => handleSubmit()}>SUBMIT</Button>
            ) : (
              <Button type="button" variant="outline-secondary" className="searchBoxButton buttonDisabled" disabled>SUBMIT</Button>
            )
          }
          {
            searchText.length > 0 ? null : (
              <SearchIcon>
                <i className="fas fa-search" />
              </SearchIcon>
            )
          }
        </InputGroup>
      </SearchBoxArea>
      <SelectionBubbleArea className="selectionBubbleAreaGroup">
        {
          bubbleSearchKeyword !== '' && (
            <BubbleContainer title={bubbleSearchKeyword}>
              Search Text:&nbsp;
              {bubbleSearchKeyword.length > 24 ? `${bubbleSearchKeyword.substring(0, 21)}...` : bubbleSearchKeyword}
              <span className="removeBubble" onClick={() => handleBubbleSearchTextRemoveClick()} aria-hidden="true">
                <img src={CloseIconImg} alt="close-icon" />
              </span>
            </BubbleContainer>
          )
        }
        {
          resourceFilters.length > 0 && resourceFilters.map((filter, index) => (
            <BubbleContainer key={index} title={filter}>
              Primary Disease:&nbsp;
              {filter}
              <span className="removeBubble" onClick={() => handleBubbleResourcesRemoveClick(filter)} aria-hidden="true">
                <img src={CloseIconImg} alt="close-icon" />
              </span>
            </BubbleContainer>
          ))
        }
      </SelectionBubbleArea>
    </Container>
  );
};

SearchBox.propTypes = {
  searchText: PropTypes.string.isRequired,
  searchKeyword: PropTypes.string.isRequired,
  resourceFilters: PropTypes.array.isRequired,
  handleBubbleSearchTextRemoveClick: PropTypes.func.isRequired,
  handleBubbleResourcesRemoveClick: PropTypes.func.isRequired,
  onSearchBoxKeyPress: PropTypes.func.isRequired,
  onSearchSubmit: PropTypes.func.isRequired,
  onSearchTextInputChange: PropTypes.func.isRequired,
};

export default SearchBox;
