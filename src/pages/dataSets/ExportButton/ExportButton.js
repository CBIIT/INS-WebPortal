import React from 'react';
import PropTypes from 'prop-types';
import * as exportApi from '../../../api/exportApi';
import './ExportButton.css';
import ExportIconImg from './export.svg';

const ExportButton = ({
  searchCriteria,
}) => {
  const handleExport = (event) => {
    event.preventDefault();
    exportApi.getSearchResult(searchCriteria);
  };

  return (
    <>
      <button type="button" className="buttonStyle" onClick={handleExport}>
        <span className="spanText">
          <img src={ExportIconImg} alt="export-icon" />
          Export
        </span>
      </button>
    </>
  );
};

export default ExportButton;
