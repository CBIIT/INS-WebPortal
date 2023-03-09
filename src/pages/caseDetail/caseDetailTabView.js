/* eslint-disable */
import React from 'react';
import {
  Grid,
  withStyles,
} from '@material-ui/core';
import { getColumns } from '../../bento-components';
import _ from 'lodash';
import {
  GET_PUBLICATIONS_OVERVIEW_QUERY,
  GET_DATASETS_OVERVIEW_QUERY,
  GET_CLINICAL_TRIALS_OVERVIEW_QUERY,
  GET_PATENTS_OVERVIEW_QUERY,
} from '../../bento/caseDetailData';
import CustomDataTable from '../../components/serverPaginatedTable/serverPaginatedTable';
import DocumentDownload from '../../components/DocumentDownload/DocumentDownloadView';
import globalData from '../../bento/siteWideConfig';

const getOverviewQuery = (api) => (api === 'GET_PROJECTS_OVERVIEW_QUERY' ? GET_PROJECTS_OVERVIEW_QUERY : (api === 'GET_PUBLICATIONS_OVERVIEW_QUERY' ? GET_PUBLICATIONS_OVERVIEW_QUERY : (api === 'GET_DATASETS_OVERVIEW_QUERY' ? GET_DATASETS_OVERVIEW_QUERY : (api === 'GET_CLINICAL_TRIALS_OVERVIEW_QUERY' ? GET_CLINICAL_TRIALS_OVERVIEW_QUERY : GET_PATENTS_OVERVIEW_QUERY))));

const TabView = ({
  classes,
  data,
  customColumn,
  tableID,
  externalLinkIcon,
  options,
  count,
  api,
  paginationAPIField,
  dataKey,
  allFilters,
  defaultSortCoulmn,
  defaultSortDirection,
  tableDownloadCSV,
}) => {
  const defaultOptions = () => ({
    dataKey,
    isRowSelectable: false,
  });

  const finalOptions = {
    ...options,
    ...defaultOptions(),
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
  caseTitle: {
    color: '#194563',
    fontSize: '25.2pt',
    fontStyle: 'normal',
    fontFamily: 'Raleway',
    letterSpacing: '0.025em',
    backgroundColor: '#f5f5f5',
    padding: '10px 32px 8px 28px',
  },
  chips: {
    position: 'absolute',
    marginLeft: '250px',
    marginTop: '36px',
    zIndex: '999',
  },
  chipRoot: {
    color: '#ffffff',
    fontFamily: '"Open Sans", sans-serif',
    letterSpacing: '0.075em',
    marginLeft: '10px',
    backgroundColor: '#9b9b9b',
    fontSize: '9pt',
  },
  chipDeleteIcon: {
    color: '#ffffff',
    '&:hover': {
      color: '#ffffff',
    },
  },
  root: {
    fontFamily: '"Open Sans", sans-serif',
    fontSize: '9pt',
    letterSpacing: '0.025em',
    color: '#000',
  },
  saveButtonDiv: {
    paddingTop: '5px',
    paddingRight: '25px',
    textAlign: 'right',
  },
  saveButtonDivBottom: {
    paddingTop: '5px',
    paddingRight: '25px',
    textAlign: 'right',
    marginBottom: '30px',
    position: 'relative',
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
  caseTableBorder: {
    borderTopColor: '#F48439',
  },
  fileTableBorder: {
    borderTopColor: '#2446C6',
  },
  sampleTableBorder: {
    borderTopColor: '#05C5CC',
  },
  messageBottom: {
    zIndex: '500',
    position: 'absolute',
    marginTop: '-148px',
    marginLeft: 'calc(100% - 220px)',
  },
  helpIcon: {
    zIndex: '600',
  },
  helpIconButton: {
    verticalAlign: 'top',
    marginLeft: '-5px',
  },
  customTooltip: {
    border: '#03A383 1px solid',
  },
  customArrow: {
    '&::before': {
      border: '#03A383 1px solid',
    },
  },
});

export default withStyles(styles, { withTheme: true })(TabView);
