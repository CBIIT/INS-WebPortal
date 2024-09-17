/* eslint-disable react/forbid-prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const OptionContainer = styled.div`
  display: flex;
  padding: 5px 0 5px 10px;
  
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
  padding-left: 8px;
  color: #000000;
  cursor: pointer;
  font-family: Nunito;
  font-size: 14px;
  font-weight: 300;
  line-height: 15px;
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

const FilterItem = ({
  item, checked, highlight, onSourceClick,
}) => {
  const handleResourceClick = () => {
    onSourceClick(item.data_resource_id);
  };

  return (
    <OptionContainer>
      <label>
        <span style={{ display: 'none' }}>{item.data_resource_id}</span>
        <input className="form-check-input" onClick={handleResourceClick} type="checkbox" value={item.data_resource_id} checked={checked} readOnly />
      </label>
      <SearchableOption title={`${item.resource_name} , ${item.resource_type}`} onClick={handleResourceClick}>
        {item.data_resource_id}
        <span style={{ float: 'right' }}>
          (123)
        </span>
      </SearchableOption>
    </OptionContainer>
  );
};

FilterItem.propTypes = {
  item: PropTypes.object.isRequired,
  checked: PropTypes.bool.isRequired,
  highlight: PropTypes.bool.isRequired,
  onSourceClick: PropTypes.func.isRequired,
};

export default FilterItem;
