/* eslint-disable react/forbid-prop-types */
/* eslint-disable jsx-a11y/anchor-is-valid */
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
      <a href="#" role="button" className="buttonStyle" onClick={handleExport}>
        <span className="spanText">
          <img src={ExportIconImg} alt="export-icon" />
          Export
        </span>
      </a>
    </>
  );
};

ExportButton.propTypes = {
  searchCriteria: PropTypes.object.isRequired,
};

export default ExportButton;
