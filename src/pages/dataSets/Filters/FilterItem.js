import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const OptionContainer = styled.div`
  display: flex;
  padding: 5px 0 5px 10px;
  border-top: 1px solid #D2D2D2;

  :nth-child(even) {
    background-color: #F9FCFF;
  }

  :nth-child(odd) {
    background-color: #F0F6F6;
  }

  .form-check-input {
    border-radius: 0;
    border: 2px solid #004187;
    &:checked {
      border: 0;
      background-color: #0776C6;
    }
  }

  .checkbox-disabled {
    border: 2px solid gray;
  }
`;

const SearchableOption = styled.span`
  padding: 0 10px 0 8px  ;
  color: #000000;
  cursor: pointer;
  font-family: Nunito;
  font-size: 14px;
  font-weight: 300;
  line-height: 22px;
  letter-spacing: 0.15px;
  text-align: left;
  width: 100%;

  &:hover {
    text-decoration: underline;
  }
`;

const OptionLabel = styled.span`
  color: lightgray;
  padding-left: 8px;
  font-weight: bold;
  font-size: 17px;
`;

const CountSpan = styled.span`
  float: right;
  padding-right: 10px;
`;
const FilterItem = ({
  item, checked, highlight, onSourceClick,
}) => {
  const handleResourceClick = () => {
    onSourceClick(item.name);
  };

  return (
    <OptionContainer>
      <span>
        <span style={{ display: 'none' }}>{item.name}</span>
        <input className="form-check-input" onClick={handleResourceClick} type="checkbox" value={item.name} checked={checked} readOnly />
      </span>

      <SearchableOption title={`${item.name}: ${item.count}`} onClick={handleResourceClick}>
        {item.name}

      </SearchableOption>
      <CountSpan>
        (
        {item.count}
        )
      </CountSpan>
    </OptionContainer>
  );
};

export default FilterItem;
