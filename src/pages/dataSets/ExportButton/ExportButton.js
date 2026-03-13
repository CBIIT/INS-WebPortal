import React, { useState } from 'react';
import PropTypes from 'prop-types';
import * as exportApi from '../../../api/exportApi';
import './ExportButton.css';
import ExportIconImg from './export.svg';

const ExportButton = ({
  searchCriteria,
}) => {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async (event) => {
    event.preventDefault();
    if (isExporting) return;

    setIsExporting(true);
    try {
      await exportApi.getSearchResult(searchCriteria);
    } catch (error) {
      console.error('Failed to export datasets:', error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <>
      <button type="button" className="buttonStyle" onClick={handleExport} disabled={isExporting}>
        <span className="spanText">
          <img src={ExportIconImg} alt="export-icon" />
          Export
        </span>
      </button>
    </>
  );
};

export default ExportButton;
