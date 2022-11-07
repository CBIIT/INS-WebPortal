/* eslint-disable */
import React from 'react';
import {
  Grid,
  withStyles,
} from '@material-ui/core';
import { getColumns } from 'bento-components';
import _ from 'lodash';
import {
  GET_PROJECTS_OVERVIEW_QUERY,
  GET_PUBLICATIONS_OVERVIEW_QUERY,
  GET_DATASETS_OVERVIEW_QUERY,
  GET_CLINICAL_TRIALS_OVERVIEW_QUERY,
  GET_PATENTS_OVERVIEW_QUERY,
} from '../../bento/dashboardTabData';
import CustomDataTable from '../../components/serverPaginatedTable/serverPaginatedTable';
import DocumentDownload from '../../components/DocumentDownload/DocumentDownloadView';
import globalData from '../../bento/siteWideConfig';

const getOverviewQuery = (api) => (api === 'GET_PROJECTS_OVERVIEW_QUERY' ? GET_PROJECTS_OVERVIEW_QUERY : (api === 'GET_PUBLICATIONS_OVERVIEW_QUERY' ? GET_PUBLICATIONS_OVERVIEW_QUERY : (api === 'GET_DATASETS_OVERVIEW_QUERY' ? GET_DATASETS_OVERVIEW_QUERY : (api === 'GET_CLINICAL_TRIALS_OVERVIEW_QUERY' ? GET_CLINICAL_TRIALS_OVERVIEW_QUERY : GET_PATENTS_OVERVIEW_QUERY))));

const TabView = ({
  classes,
  data,
  customColumn,
  primaryKeyIndex = 0,
  disableRowSelection,
  tableID,
  externalLinkIcon,
  options,
  count,
  api,
  paginationAPIField,
  paginationAPIFieldDesc,
  dataKey,
  allFilters,
  defaultSortCoulmn,
  defaultSortDirection,
  setRowSelection,
  selectedRowInfo = [],
  selectedRowIndex = [],
  tableDownloadCSV,
}) => {
  function rowSelectionEvent(displayData, rowsSelected) {
    const displayedDataKeies = displayData;
    const selectedRowsKey = rowsSelected
      ? rowsSelected.map((index) => displayedDataKeies[index])
      : [];
    let newSelectedRowInfo = [];

    if (rowsSelected) {
      if (selectedRowInfo.length > 0) {
        newSelectedRowInfo = selectedRowInfo.filter((key) => {
          if (displayedDataKeies.includes(key)) {
            return false;
          }
          return true;
        });
      }
    } else {
      newSelectedRowInfo = selectedRowInfo;
    }
    newSelectedRowInfo = newSelectedRowInfo.concat(selectedRowsKey);

    const newSelectedRowIndex = displayedDataKeies.reduce(
      (accumulator, currentValue, currentIndex) => {
        if (newSelectedRowInfo.includes(currentValue)) {
          accumulator.push(currentIndex);
        }
        return accumulator;
      }, [],
    );

    if (_.differenceWith(
      newSelectedRowIndex,
      selectedRowIndex,
      _.isEqual,
    ).length !== 0
      || _.differenceWith(
        newSelectedRowInfo,
        selectedRowInfo,
        _.isEqual,
      ).length !== 0
      || _.differenceWith(
        selectedRowInfo,
        newSelectedRowInfo,
        _.isEqual,
      ).length !== 0
      || _.differenceWith(
        selectedRowIndex,
        newSelectedRowIndex,
        _.isEqual,
      ).length !== 0) {
      setRowSelection({
        selectedRowInfo: newSelectedRowInfo,
        selectedRowIndex: newSelectedRowIndex,
      });
    }
  }

  function onRowsSelect(curr, allRowsSelected, rowsSelected, displayData) {
    rowSelectionEvent(displayData.map((d) => d.data[primaryKeyIndex]), rowsSelected);
  }

  const defaultOptions = () => ({
    dataKey,
    rowsSelectedTrigger: (displayData, rowsSelected) => rowSelectionEvent(
      displayData,
      rowsSelected,
    ),
    rowsSelected: selectedRowIndex,
    onRowSelectionChange: onRowsSelect,
    isRowSelectable: (dataIndex) => (disableRowSelection
      ? disableRowSelection(data[dataIndex], fileIDs) : true),
  });

  const finalOptions = {
    ...options,
    ...defaultOptions(),
    serverTableRowCount: selectedRowInfo.length,
  };

  const dataTransformCallbacks = customColumn.columns.filter((column, idx) => {
    return column.dataTransform !== undefined;
  });

  const headerStyles = customColumn.columns.map((column) => {
    return column.headerStyles;
  });

  return (
    <div>
      <Grid container>
        <Grid item xs={12} id={tableID}>
          <CustomDataTable
            key={data.length}
            data={data}
            columns={getColumns(customColumn, classes, data, externalLinkIcon, '', () => { }, DocumentDownload, globalData.replaceEmptyValueWith)}
            options={finalOptions}
            count={count}
            overview={getOverviewQuery(api)}
            paginationAPIField={paginationAPIField}
            paginationAPIFieldDesc={paginationAPIFieldDesc}
            queryCustomVaribles={allFilters}
            defaultSortCoulmn={defaultSortCoulmn}
            defaultSortDirection={defaultSortDirection}
            tableDownloadCSV={tableDownloadCSV}
            dataTransformation={dataTransformCallbacks}
            headerStyles={headerStyles}
          />
        </Grid>
      </Grid>
    </div>
  );
};

const styles = () => ({
  root: {
    fontFamily: '"Open Sans", sans-serif',
    fontSize: '9pt',
    letterSpacing: '0.025em',
    color: '#000',
  },
  button: {
    borderRadius: '10px',
    width: '156px',
    lineHeight: '37px',
    fontSize: '12px',
    textTransform: 'uppercase',
    fontFamily: 'Lato',
    color: '#fff',
    backgroundColor: '#10A075',
    marginTop: '6px',
    marginBottom: '10px',
    marginRight: '5px',
  },
});

export default withStyles(styles, { withTheme: true })(TabView);
