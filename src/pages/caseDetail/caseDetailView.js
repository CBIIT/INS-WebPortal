import React from 'react';
import {
  Grid,
  withStyles,
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { getOptions, getColumns } from 'bento-components';
import StatsView from '../../components/Stats/StatsView';
import { Typography } from '../../components/Wrappers/Wrappers';
import GridWithFooter from '../../components/GridWithFooter/GridView';
import icon from '../../assets/icons/Cases.Icon.svg';
import Subsection from '../../components/PropertySubsection/caseDetailSubsection';
import CustomBreadcrumb from '../../components/Breadcrumb/BreadcrumbView';
import {
  caseHeader,
  leftPanel,
  rightPanel,
  table1,
  table2,
  table3,
  table4,
  table5,
  externalLinkIcon,
  tooltipContent,
} from '../../bento/caseDetailData';
import Snackbar from '../../components/Snackbar';
import { fetchDataForDashboardDataTable } from '../dashboard/dashboardState';

// Main case detail component
const CaseDetail = ({ data, classes }) => {
  const [snackbarState, setsnackbarState] = React.useState({
    open: false,
    value: 0,
  });
  function openSnack(value1) {
    setsnackbarState({ open: true, value: value1 });
  }
  function closeSnack() {
    setsnackbarState({ open: false });
  }
  const dispatch = useDispatch();

  // make sure dashboard data has been loaded first for stats bar to work
  React.useEffect(() => {
    dispatch(fetchDataForDashboardDataTable());
  }, []);

  const stat = {
    numberOfPrograms: 1,
    numberOfProjects: 1,
    numberOfPublications: data.publications.length,
    numberOfGEOs: data.geos.length,
    numberOfSRAs: data.sras.length,
    numberOfDBGaps: data.dbgaps.length,
    numberOfClinicalTrials: data.clinical_trials.length,
  };

  const breadCrumbJson = [{
    name: 'ALL PROJECTS /',
    to: '/projects',
    isALink: true,
  }];

  return (
    <>
      <Snackbar
        snackbarState={snackbarState}
        closeSnack={closeSnack}
        autoHideDuration={3000}
        classes={classes}
      />
      <StatsView data={stat} />
      <div className={classes.container}>
        <div className={classes.innerContainer}>
          <div className={classes.header}>
            <div className={classes.logo}>
              <img
                className={classes.caseIcon}
                src={icon}
                alt="Bento case detail header logo"
              />

            </div>
            <div className={classes.headerTitle}>
              <div className={classes.headerMainTitle}>
                {`${caseHeader.label} :`}
                { data[caseHeader.dataField]
                  ? (
                    <span className={classes.headerMainTitleTwo}>
                      {' '}
                      {data[caseHeader.dataField]}
                    </span>
                  )
                  : (
                    <Typography variant="h5" color="error" size="sm">
                      {`"${caseHeader.dataField}" is not a valid property name`}
                    </Typography>
                  )}
              </div>
              <div className={classes.breadCrumb}>
                {' '}
                <CustomBreadcrumb data={breadCrumbJson} />
              </div>
            </div>
          </div>

          <Grid container spacing={1} className={classes.detailContainer}>
            {/* Left panel */}
            <Grid item sm={6} xs={12} className={[classes.detailPanel, classes.leftPanel]}>
              <div className={classes.innerPanel}>
                <Grid container spacing={2}>
                  {leftPanel.slice(0, 3).map((section) => (
                    <Subsection
                      key={section.sectionHeader}
                      config={section}
                      data={data}
                    />
                  ))}
                </Grid>
              </div>
            </Grid>
            {/* Left panel end */}
            {/* Right panel */}
            <Grid item sm={6} xs={12} className={[classes.detailPanel, classes.rightPanel]}>
              <div style={{ paddingLeft: '7px' }} className={classes.innerPanel}>
                <Grid container spacing={2}>
                  {rightPanel.slice(0, 3).map((section) => (
                    <Subsection
                      key={section.sectionHeader}
                      config={section}
                      data={data}
                    />
                  ))}
                </Grid>
              </div>
            </Grid>
            {/* Right panel end */}
          </Grid>
        </div>
      </div>
      {table1.display
        ? (
          <div id="case_detail_table_associated_samples" className={classes.tableContainer}>
            <div className={classes.tableDiv}>
              <Grid item xs={12}>
                <Grid container spacing={4}>
                  <Grid item xs={12}>
                    <GridWithFooter
                      data={data[table1.subjectDetailField]}
                      title={(
                        <div className={classes.tableTitle}>
                          <span className={classes.tableHeader}>{table1.tableTitle}</span>
                        </div>
                      )}
                      columns={getColumns(table1, classes, data, externalLinkIcon)}
                      options={getOptions(table1, classes)}
                      customOnRowsSelect={table1.customOnRowsSelect}
                      openSnack={openSnack}
                      closeSnack={closeSnack}
                      disableRowSelection={table1.disableRowSelection}
                      buttonText={table1.buttonText}
                      saveButtonDefaultStyle={table1.saveButtonDefaultStyle}
                      ActiveSaveButtonDefaultStyle={table1.ActiveSaveButtonDefaultStyle}
                      DeactiveSaveButtonDefaultStyle={table1.DeactiveSaveButtonDefaultStyle}
                      tooltipMessage={table1.tooltipMessage}
                      tooltipContent={tooltipContent}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </div>
          </div>
        ) : ''}
      {table2.display
        ? (
          <div id="case_detail_table_associated_files" className={classes.tableContainer}>
            <div className={classes.tableDiv}>
              <Grid item xs={12}>
                <Grid container spacing={4}>
                  <Grid item xs={12}>
                    <GridWithFooter
                      data={data[table2.subjectDetailField]}
                      title={(
                        <div className={classes.tableTitle}>
                          <span className={classes.tableHeader}>{table2.tableTitle}</span>
                        </div>
                      )}
                      columns={getColumns(table2, classes, data)}
                      options={getOptions(table2, classes)}
                      customOnRowsSelect={table2.customOnRowsSelect}
                      openSnack={openSnack}
                      closeSnack={closeSnack}
                      disableRowSelection={table2.disableRowSelection}
                      buttonText={table2.buttonText}
                      saveButtonDefaultStyle={table1.saveButtonDefaultStyle}
                      ActiveSaveButtonDefaultStyle={table1.ActiveSaveButtonDefaultStyle}
                      DeactiveSaveButtonDefaultStyle={table1.DeactiveSaveButtonDefaultStyle}
                      tooltipMessage={table2.tooltipMessage}
                      tooltipContent={tooltipContent}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </div>
          </div>
        ) : ''}
      {table3.display
        ? (
          <div id="case_detail_table_associated_participants" className={classes.tableContainer}>
            <div className={classes.tableDiv}>
              <Grid item xs={12}>
                <Grid container spacing={4}>
                  <Grid item xs={12}>
                    <GridWithFooter
                      data={data[table3.subjectDetailField]}
                      title={(
                        <div className={classes.tableTitle}>
                          <span className={classes.tableHeader}>{table3.tableTitle}</span>
                        </div>
                      )}
                      columns={getColumns(table3, classes, data)}
                      options={getOptions(table3, classes)}
                      customOnRowsSelect={table3.customOnRowsSelect}
                      openSnack={openSnack}
                      closeSnack={closeSnack}
                      disableRowSelection={table3.disableRowSelection}
                      buttonText={table3.buttonText}
                      saveButtonDefaultStyle={table3.saveButtonDefaultStyle}
                      ActiveSaveButtonDefaultStyle={table3.ActiveSaveButtonDefaultStyle}
                      DeactiveSaveButtonDefaultStyle={table3.DeactiveSaveButtonDefaultStyle}
                      tooltipMessage={table3.tooltipMessage}
                      tooltipContent={tooltipContent}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </div>
          </div>
        ) : ''}
      {table4.display
        ? (
          <div id="case_detail_table_associated_participants" className={classes.tableContainer}>
            <div className={classes.tableDiv}>
              <Grid item xs={12}>
                <Grid container spacing={4}>
                  <Grid item xs={12}>
                    <GridWithFooter
                      data={data[table4.subjectDetailField]}
                      title={(
                        <div className={classes.tableTitle}>
                          <span className={classes.tableHeader}>{table4.tableTitle}</span>
                        </div>
                      )}
                      columns={getColumns(table4, classes, data)}
                      options={getOptions(table4, classes)}
                      customOnRowsSelect={table4.customOnRowsSelect}
                      openSnack={openSnack}
                      closeSnack={closeSnack}
                      disableRowSelection={table4.disableRowSelection}
                      buttonText={table4.buttonText}
                      saveButtonDefaultStyle={table4.saveButtonDefaultStyle}
                      ActiveSaveButtonDefaultStyle={table4.ActiveSaveButtonDefaultStyle}
                      DeactiveSaveButtonDefaultStyle={table4.DeactiveSaveButtonDefaultStyle}
                      tooltipMessage={table4.tooltipMessage}
                      tooltipContent={tooltipContent}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </div>
          </div>
        ) : ''}
      {table5.display
        ? (
          <div id="case_detail_table_associated_participants" className={classes.tableContainer}>
            <div className={classes.tableDiv}>
              <Grid item xs={12}>
                <Grid container spacing={4}>
                  <Grid item xs={12}>
                    <GridWithFooter
                      data={data[table5.subjectDetailField]}
                      title={(
                        <div className={classes.tableTitle}>
                          <span className={classes.tableHeader}>{table5.tableTitle}</span>
                        </div>
                      )}
                      columns={getColumns(table5, classes, data)}
                      options={getOptions(table5, classes)}
                      customOnRowsSelect={table5.customOnRowsSelect}
                      openSnack={openSnack}
                      closeSnack={closeSnack}
                      disableRowSelection={table5.disableRowSelection}
                      buttonText={table5.buttonText}
                      saveButtonDefaultStyle={table5.saveButtonDefaultStyle}
                      ActiveSaveButtonDefaultStyle={table5.ActiveSaveButtonDefaultStyle}
                      DeactiveSaveButtonDefaultStyle={table5.DeactiveSaveButtonDefaultStyle}
                      tooltipMessage={table5.tooltipMessage}
                      tooltipContent={tooltipContent}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </div>
          </div>
        ) : ''}
      <div className={classes.blankSpace} />
    </>
  );
};

const styles = (theme) => ({
  container: {
    backgroundColor: '#FFFFFF',
    padding: '0 32px',
  },
  innerContainer: {
    maxWidth: '1340px',
    margin: '0 auto',
    padding: '38px 0 0 0',
    fontFamily: theme.custom.fontFamily,
    background: '#FFFFFF',
  },
  root: {
    fontFamily: theme.custom.fontFamily,
    fontSize: '12px',
    letterSpacing: '0.025em',
    color: '#000',
    background: '#f3f3f3',
  },
  header: {
    paddingRight: '32px',
    borderBottom: '#42779A 10px solid',
    height: '80px',
    maxWidth: theme.custom.maxContentWidth,
    margin: 'auto auto 10px auto',
  },
  caseIcon: {
    height: '94px',
  },
  headerTitle: {
    maxWidth: theme.custom.maxContentWidth,
    margin: 'auto',
    float: 'left',
    paddingLeft: '98px',
    width: 'calc(100% - 265px)',
  },
  headerMainTitle: {
    fontFamily: 'Lato',
    color: '#274FA5',
    fontSize: '26px',
    lineHeight: '24px',
    paddingLeft: '0px',
    paddingTop: '20px',
  },
  headerMainTitleTwo: {
    fontWeight: 'bold',
    letterSpacing: '0.025em',
  },
  logo: {
    position: 'absolute',
    float: 'left',
    marginTop: '-6px',
    filter: 'drop-shadow( 2px 2px 2px rgba(0, 0, 0, 0.2))',
  },
  link: {
    color: '#DC762F',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  detailContainer: {
    maxWidth: theme.custom.maxContentWidth,
    margin: 'auto',
    padding: '26px 10px 26px 0px',
    fontFamily: theme.custom.fontFamily,
    letterSpacing: '0.014em',
    color: '#000000',
    size: '12px',
    lineHeight: '23px',
  },
  detailPanel: {
    paddingTop: '0 !important',
    paddingBottom: '0 !important',
    borderRight: '1px solid #81A6BA',
  },
  leftPanel: {
    paddingLeft: '25px !important',
  },
  rightPanel: {
    paddingLeft: '16px !important',
  },
  innerPanel: {
    height: '100%',
    minHeight: '209px',
    maxHeight: '380px',
    overflowY: 'auto',
    overflowX: 'hidden',
    paddingLeft: '0px',
    scrollbarColor: '#697270',
  },
  innerPanelRight: {
    paddingLeft: '30px',
  },
  tableContainer: {
    background: '#f3f3f3',
  },
  tableDiv: {
    maxWidth: '1340px',
    margin: 'auto',
    paddingTop: '30px',
    paddingLeft: '0px',
  },
  tableTitle: {
    textTransform: 'uppercase',
    fontFamily: 'Lato',
    fontSize: '17px',
    letterSpacing: '0.025em',
    color: '#3695A9',
  },
  breadCrumb: {
    paddingTop: '3px',
  },
  snackBarMessageIcon: {
    verticalAlign: 'middle',
  },
  externalLinkIcon: {
    width: '14.5px',
    verticalAlign: 'sub',
    marginLeft: '4px',
    paddingBottom: '2px',
  },
  blankSpace: {
    height: '73px',
    background: '#f3f3f3',
  },
});

export default withStyles(styles, { withTheme: true })(CaseDetail);
