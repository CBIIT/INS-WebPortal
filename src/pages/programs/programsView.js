/* eslint-disable max-len */
import React from 'react';
import _ from 'lodash';
import {
  Grid,
  withStyles,
} from '@material-ui/core';
import {
  getOptions,
  getColumns,
} from '../../bento-components';
import CustomDataTable from '../../components/serverPaginatedTable/serverPaginatedTable';
import globalData from '../../bento/siteWideConfig';
import {
  table,
  programListingIcon,
  externalLinkIcon,
  GET_PROGRAMS_DATA_QUERY,
} from '../../bento/programData';
import Stats from '../../components/Stats/AllStatsController';
import { Typography } from '../../components/Wrappers/Wrappers';
import { getTableRowSelectionEvent } from '../dashboardTab/store/dashboardReducer';
import DocumentDownload from '../../components/DocumentDownload/DocumentDownloadView';

const getOverviewQuery = () => (GET_PROGRAMS_DATA_QUERY);

const Programs = ({ classes, data }) => {
  const numberOfPrograms = data.programInfo.length;

  const options = getOptions(table, classes);

  const selectedRowInfo = [];

  const selectedRowIndex = [];

  const primaryKeyIndex = 0;

  const { dataKey } = table;

  const headerStyles = table.columns.map((column) => column.headerStyles);

  const setRowSelection = getTableRowSelectionEvent();

  function disableRowSelection(d, cartData) {
    return true;
  }

  function rowSelectionEvent(displayData, rowsSelected) {
    const displayedDataKeies = displayData;
    const selectedRowsKey = rowsSelected
      ? rowsSelected.map((index) => displayedDataKeies[index])
      : [];
    let newSelectedRowInfo = [];

    if (rowsSelected) {
      // Remove the rowInfo from selectedRowInfo if this row currently be
      // displayed and not be selected.
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

    // Get selectedRowIndex by comparing current page data with selected row's key.
    // if rowInfo from selectedRowInfo is currently be displayed
    const newSelectedRowIndex = displayedDataKeies.reduce(
      (accumulator, currentValue, currentIndex) => {
        if (newSelectedRowInfo.includes(currentValue)) {
          accumulator.push(currentIndex);
        }
        return accumulator;
      }, [],
    );

    // reduce the state chagne, when newSelectedRowIndex and newSelectedRowInfo is same as previous.
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
      ? disableRowSelection(data[dataIndex]) : true),
  });

  const finalOptions = {
    ...options,
    ...defaultOptions(),
    serverTableRowCount: selectedRowInfo.length,
  };

  return (
    <>
      <Stats />
      <div className={classes.tableContainer}>
        <div className={classes.container}>
          <div className={classes.header}>
            <div className={classes.logo}>
              <img
                src={programListingIcon.src}
                alt={programListingIcon.alt}
              />
            </div>
            <div className={classes.headerTitle}>
              <div className={classes.headerMainTitle}>
                <span>
                  <Typography>
                    <span className={classes.headerMainTitle}>{table.title}</span>
                  </Typography>
                </span>
              </div>
            </div>
          </div>
          {table.display ? (
            <div id="table_program_list" className={classes.tableContainer}>
              <div className={classes.tableDiv}>
                <Grid item xs={12}>
                  <Grid container spacing={8}>
                    <Grid item xs={12}>
                      <Typography>
                        <CustomDataTable
                          key={data[table.dataField].length}
                          data={data[table.dataField]}
                          columns={getColumns(table, classes, data, externalLinkIcon, '', () => { }, DocumentDownload, globalData.replaceEmptyValueWith)}
                          options={finalOptions}
                          count={numberOfPrograms}
                          overview={getOverviewQuery(table.api)}
                          paginationAPIField={table.paginationAPIField}
                          defaultSortCoulmn={table.defaultSortField || ''}
                          defaultSortDirection={table.defaultSortDirection || 'asc'}
                          tableDownloadCSV={table.tableDownloadCSV || false}
                          headerStyles={headerStyles}
                        />
                      </Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography />
                    </Grid>
                  </Grid>
                </Grid>
              </div>
            </div>
          ) : ''}
        </div>
      </div>
    </>
  );
};

const styles = (theme) => ({
  link: {
    textDecoration: 'none',
    fontWeight: 'bold',
    color: '#7747FF',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  card: {
    minHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  container: {
    margin: 'auto',
    maxWidth: '1440px',
    paddingLeft: '36px',
    paddingRight: '36px',
  },
  paper: {
    textAlign: 'center',
  },
  fakeToolbar: {
    ...theme.mixins.toolbar,
  },
  root: {
    fontFamily: '"Lato Regular","Open Sans", sans-serif',
    fontSize: '9pt',
    letterSpacing: '0.025em',
    color: '#000',
    background: '#fff',
  },
  header: {
    background: '#eee',
    paddingLeft: '20px',
    paddingRight: '50px',
    borderBottom: '#42779A 10px solid',
    height: '128px',
    paddingTop: '35px',
  },
  headerMainTitle: {
    fontFamily: 'Lato',
    letterSpacing: '0.025em',
    color: '#274FA5',
    fontSize: '24pt',
    position: 'absolute',
    marginTop: '16px',
    lineHeight: '25px',
    marginLeft: '-3px',
  },
  headerTitle: {
    maxWidth: '1440px',
    margin: 'auto',
    float: 'left',
    marginLeft: '90px',
  },
  logo: {
    position: 'absolute',
    float: 'left',
    marginLeft: '-17px',
    width: '100px',
    filter: 'drop-shadow(-3px 2px 6px rgba(27,28,28,0.29))',
  },
  tableContainer: {
    background: '#eee',
    paddingBottom: '50px',
  },
  tableDiv: {
    margin: 'auto',
  },
  tableCell6: {
    width: '120px',
  },
  externalLinkIcon: {
    width: '14.5px',
    verticalAlign: 'sub',
    marginLeft: '4px',
    paddingBottom: '2px',
  },
  linkSpan: {
    display: '-webkit-box',
  },
});

export default withStyles(styles, { withTheme: true })(Programs);
