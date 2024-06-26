import React from 'react';
import _ from 'lodash';
import {
  Grid,
  withStyles,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import {
  manipulateLinks,
  cn,
} from '@bento-core/util';
import {
  TableContextProvider,
  TableView,
  Wrapper,
} from '@bento-core/paginated-table';
import { themeConfig } from './tableConfig/Theme';
import { configColumn } from './tableConfig/Column';
import { configWrapper, wrapperConfig } from './wrapperConfig/Wrapper';
import { customTheme } from './wrapperConfig/Theme';
import WidgetViewNciDoc from './widget/WidgetViewNciDoc';
import WidgetViewAwardAmount from './widget/WidgetViewAwardAmount';
import {
  pageTitle,
  table,
  externalLinkIcon,
  programDetailIcon,
  breadCrumb,
  aggregateCount,
  pageSubTitle,
  leftPanel,
  GET_PROJECTS_OVERVIEW_QUERY,
} from '../../bento/programDetailData';
import StatsView from '../../components/Stats/StatsView';
import { Typography } from '../../components/Wrappers/Wrappers';
import CustomBreadcrumb from '../../components/Breadcrumb/BreadcrumbView';

import {
  singleCheckBox,
  setSideBarToLoading,
  setDashboardTableLoading,
} from './dashboardReducer';

const ProgramView = ({
  classes, data,
}) => {
  const {
    programPublicationCount, programDatasetCount, programClinicalTrialCount, programPatentCount,
  } = data;
  const programData = data.programDetail;

  const getOverviewQuery = () => (GET_PROJECTS_OVERVIEW_QUERY);

  const redirectTo = () => {
    setSideBarToLoading();
    setDashboardTableLoading();
    singleCheckBox([{
      datafield: 'programs',
      groupName: 'Program',
      isChecked: true,
      name: programData.program_id,
      section: 'Filter By Cases',
    }]);
  };

  const stat = {
    numberOfPrograms: 1,
    numberOfProjects: programData.num_core_projects !== undefined ? programData.num_core_projects : 'undefined',
    numberOfGrants: programData.num_projects !== undefined ? programData.num_projects : 'undefined',
    numberOfPublications: programPublicationCount !== undefined ? programPublicationCount : 'undefined',
  };

  const breadCrumbJson = [{
    name: `${breadCrumb.label}`,
    to: `${breadCrumb.link}`,
    isALink: true,
  }];

  const updatedAttributesData = manipulateLinks(leftPanel.attributes);

  const initTblState = (initailState) => ({
    ...initailState,
    title: table.name,
    query: getOverviewQuery(table.api),
    paginationAPIField: table.paginationAPIField,
    dataKey: table.dataKey,
    columns: configColumn(table.columns),
    count: stat.numberOfGrants,
    selectedRows: [],
    enableRowSelection: table.enableRowSelection,
    tableMsg: table.tableMsg,
    sortBy: table.defaultSortField,
    sortOrder: table.defaultSortDirection,
    extendedViewConfig: table.extendedViewConfig,
    rowsPerPage: 10,
    page: 0,
  });

  return (
    <>
      <StatsView data={stat} />
      <div className={classes.container}>
        <div className={classes.header}>
          <div className={classes.logo}>
            <img
              src={programDetailIcon.src}
              alt={programDetailIcon.alt}
            />
          </div>
          <div className={classes.headerTitle}>
            <div className={classes.headerMainTitle} id="program_detail_title">
              <span>
                {' '}
                {pageTitle.label}
                <span>
                  {' '}
                  {' '}
                  {programData[pageTitle.dataField]}
                </span>
              </span>
            </div>
            <div className={cn(classes.headerMSubTitle, classes.headerSubTitleCate)}>
              <span id="program_detail_subtile">
                {' '}
                {programData[pageSubTitle.dataField]}
              </span>
            </div>
            <CustomBreadcrumb className={classes.breadCrumb} data={breadCrumbJson} />
          </div>
          {aggregateCount.display ? (
            <div className={classes.headerButton}>
              <span className={classes.headerButtonLinkSpan}>
                <Link
                  className={classes.headerButtonLink}
                  to={(location) => ({ ...location, pathname: `${aggregateCount.link}` })}
                  onClick={() => redirectTo()}
                >
                  {' '}
                  <span className={classes.headerButtonLinkText}>{aggregateCount.labelText}</span>
                  <span className={classes.headerButtonColumn}>{': '}</span>
                  <span className={classes.headerButtonLinkNumber} id="program_detail_header_file_count">
                    {programData[aggregateCount.dataField]}
                  </span>
                </Link>
              </span>
            </div>
          ) : ''}
        </div>
        <div className={classes.detailContainer}>
          <Grid container spacing={5}>
            <Grid item lg={7} sm={6} xs={12} container>
              <Grid container spacing={4} direction="row" className={classes.detailContainerLeft}>
                {updatedAttributesData.slice(0, 6).map((attribute, index) => (
                  <Grid item xs={12}>
                    <div>
                      {
                        attribute.internalLink
                          ? (
                            <div>
                              <span className={classes.detailContainerHeader}>
                                {attribute.label}
                              </span>
                              <div>
                                <span className={classes.content}>
                                  {' '}
                                  <Link
                                    className={classes.link}
                                    to={`${attribute.actualLink}${programData[updatedAttributesData[attribute.actualLinkId].dataField]}`}
                                  >
                                    {programData[attribute.dataField]}
                                  </Link>
                                  {' '}
                                </span>
                              </div>
                            </div>
                          )
                          : attribute.externalLink
                            ? (
                              <div>
                                <span
                                  className={classes.detailContainerHeader}
                                >
                                  {attribute.label}
                                </span>
                                <div>
                                  <span className={classes.content}>
                                    {' '}
                                    <a
                                      href={`${attribute.actualLink}${programData[updatedAttributesData[attribute.actualLinkId].dataField]}`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className={classes.link}
                                    >
                                      {programData[attribute.dataField]}
                                    </a>
                                    <img
                                      src={externalLinkIcon.src}
                                      alt={externalLinkIcon.alt}
                                      className={classes.externalLinkIcon}
                                    />
                                    {' '}
                                  </span>
                                </div>
                              </div>
                            )
                            : attribute.internalLinkToLabel
                              ? (
                                <div>
                                  <span
                                    className={classes.detailContainerHeaderLink}
                                  >
                                    <a href={`${programData[attribute.dataField]}`} rel="noopener noreferrer">{attribute.label}</a>
                                  </span>
                                </div>
                              )
                              : attribute.externalLinkToLabel
                                ? (
                                  <div>
                                    <span
                                      className={classes.detailContainerHeaderLink}
                                    >
                                      <a href={`${programData[attribute.dataField]}`} target="_blank" rel="noopener noreferrer">{attribute.label}</a>
                                      <img
                                        src={externalLinkIcon.src}
                                        alt={externalLinkIcon.alt}
                                        className={classes.externalLinkIcon}
                                      />
                                    </span>
                                  </div>
                                )
                                : (
                                  <div>
                                    <span
                                      className={classes.detailContainerHeader}
                                      id={`program_detail_left_section_title_${index + 1}`}
                                    >
                                      {attribute.label}
                                    </span>
                                    <div>
                                      <span className={classes.content} id={`program_detail_left_section_description_${index + 1}`}>
                                        {' '}
                                        {programData[attribute.dataField]}
                                        {' '}
                                      </span>
                                    </div>
                                  </div>
                                )
                      }
                    </div>
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid
              item
              lg={5}
              sm={6}
              xs={12}
            >
              <Grid container spacing={16} direction="row" className={classes.detailContainerRight}>
                <Grid
                  item
                  xs={12}
                  className={classes.marginTopN37}
                >
                  <WidgetViewNciDoc
                    data={data}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  className={classes.marginTopN37}
                >
                  <WidgetViewAwardAmount
                    data={data}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </div>
      <div id="table_program_detail" className={classes.tableContainer}>
        <div className={classes.tableDiv}>
          <div className={classes.tableTitle}>
            <span className={classes.tableHeader}>{table.name}</span>
          </div>
          <Grid item xs={12}>
            <Grid container spacing={8}>
              <div className={classes.tableContent}>
                <Grid item xs={12}>
                  <Typography>
                    <TableContextProvider>
                      <Wrapper
                        wrapConfig={configWrapper(table, wrapperConfig)}
                        customTheme={customTheme}
                        classes={classes}
                        section={table.name}
                      >
                        <Grid container>
                          <Grid item xs={12} id={table.tableID}>
                            <TableView
                              initState={initTblState}
                              themeConfig={themeConfig}
                              queryVariables={{ programs: [programData.program_id] }}
                              totalRowCount={stat.numberOfGrants}
                            />
                          </Grid>
                        </Grid>
                      </Wrapper>
                    </TableContextProvider>
                  </Typography>
                </Grid>
              </div>
              <Grid item xs={8}>
                <Typography />
              </Grid>
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
};

const styles = (theme) => ({
  link: {
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  cartlink: {
    fontFamily: 'Lato',
    color: '#3E6886',
    fontSize: '12px',
    marginRight: '70px',
    textDecoration: 'none',
    borderBottom: '1px solid #3E6886',
    paddingBottom: '3px',
  },
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
  firstColumn: {
    maxWidth: '45%',
  },
  secondColumn: {
    maxWidth: '30%',
  },
  thirdColumn: {
    maxWidth: '25%',
  },
  widgetTitle: {
    color: '#0296c9',
    textTransform: 'uppercase',
    fontFamily: 'Lato !important',
    fontWeight: '500 !important',
    fontSize: '17px !important',
    letterSpacing: '0.025em',
  },
  borderLeft: {
    borderLeft: '#81A6BA 1px solid',
    paddingLeft: '25px !important',
  },
  paddingLeft8: {
    paddingLeft: '8px',
  },
  paddingBottm17: {
    paddingBottm: '17px',
  },
  container: {
    paddingTop: '50px',
    fontFamily: theme.custom.fontFamily,
    paddingLeft: '32px',
    paddingRight: '32px',
    background: '#FFFF',
    paddingBottom: '16px',
  },
  content: {
    fontSize: '15px',
    fontFamily: theme.custom.fontFamily,
    lineHeight: '14px',
  },
  warning: {
    color: theme.palette.warning.main,
  },
  paper: {
    textAlign: 'center',
  },
  fakeToolbar: {
    ...theme.mixins.toolbar,
  },
  header: {
    paddingLeft: '21px',
    paddingRight: '35px',
    borderBottom: '#4B619A 10px solid',
    height: '80px',
    maxWidth: '1340px',
    margin: 'auto',
  },
  headerTitle: {
    margin: 'auto',
    float: 'left',
    marginLeft: '85px',
    width: 'calc(100% - 265px)',
  },
  headerMainTitle: {
    '& > span': {
      fontWeight: '300',
      letterSpacing: '0.017em',
    },
    '& > span > span': {
      fontWeight: 'bold',
      letterSpacing: '0.025em',
    },
    fontFamily: 'Lato',
    letterSpacing: '0.025em',
    color: '#274FA5 ',
    fontSize: '26px',
    lineHeight: '24px',
    paddingLeft: '0px',
  },
  headerSubTitleCate: {
    color: '#00B0BD',
    fontWeight: '300',
    fontFamily: 'Poppins',
    textTransform: 'uppercase',
    letterSpacing: '0.023em',
    fontSize: '15px',
    overflow: 'hidden',
    lineHeight: '24px',
    paddingLeft: '2px',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    paddingRight: '200px',
  },
  headerSubTitleContent: {
    color: '#000000',
    fontWeight: 'bold',
    fontFamily: theme.custom.fontFamilyRaleway,
    textTransform: 'uppercase',
    letterSpacing: '0.023em',
    fontSize: '14px',
  },
  headerMSubTitle: {
    paddingTop: '3px',
  },
  breadCrumb: {
    color: '#00B0BD',
  },
  headerButton: {
    fontFamily: theme.custom.fontFamily,
    float: 'right',
    marginTop: '15px',
    width: '104px',
    height: '33px',
    background: '#F6F4F4',
    textAlign: 'center',
    marginRight: '-20px',
  },
  headerButtonLinkSpan: {
    fontFamily: theme.custom.fontFamily,
    height: '50px',
    background: '#F5F3EE',
    width: '200px',
    fontSize: '8pt',
  },
  headerButtonLinkText: {
    fontFamily: theme.custom.fontFamily,
    color: '#7747FF',
    fontSize: '8pt',
    textTransform: 'uppercase',
  },
  headerButtonColumn: {
    color: '#000000',
  },
  headerButtonLinkNumber: {
    color: '#000000',
    fontFamily: theme.custom.fontFamily,
    borderBottom: 'solid #6690AC',
    lineHeight: '30px',
    paddingBottom: '3px',
    margin: '0 4px',
    fontSize: '8pt',
  },
  logo: {
    position: 'absolute',
    float: 'left',
    marginLeft: '-23px',
    marginTop: '-21px',
    width: '107px',
    filter: 'drop-shadow(-3px 2px 6px rgba(27,28,28,0.29))',
  },
  detailContainer: {
    maxWidth: '1340px',
    margin: 'auto',
    marginBlockEnd: '24px',
    paddingTop: '24px',
    paddingLeft: '5px',
    fontFamily: theme.custom.fontFamily,
    letterSpacing: '0.014em',
    color: '#000000',
    size: '12px',
    lineHeight: '23px',
    height: '725px',
  },
  detailContainerHeader: {
    textTransform: 'uppercase',
    fontFamily: 'Lato',
    fontSize: '17px',
    letterSpacing: '0.025em',
    color: '#0296C9',
  },
  detailContainerHeaderLink: {
    fontFamily: 'Raleway',
    fontSize: '14px',
    letterSpacing: '0.025em',
    color: '#0077E3',
  },
  detailContainerBottom: {
    borderTop: '#81a6b9 1px solid',
    marginTop: '13px',
    padding: ' 35px 0 63px 2px !important',
  },
  detailContainerLeft: {
    display: 'block',
    padding: '5px  20px 5px 0px !important',
    minHeight: '700px',
    maxHeight: '700px',
    overflowY: 'auto',
    overflowX: 'hidden',
    width: '103.9%',
    margin: '0px -8px -5px -21px',
  },
  borderRight: {
    borderRight: '#81a6b9 1px solid',
  },
  detailContainerRight: {
    padding: '5px 0 5px 36px !important',
    minHeight: '700px',
    maxHeight: '700px',
    overflowY: 'auto',
    overflowX: 'hidden',
    height: '700px',
    width: '300%',
    borderLeft: '1px solid #81A6BA',
    borderRight: '1px solid #81A6BA',
    marginLeft: '-26px',
  },
  tableContainer: {
    background: '#f3f3f3',
  },
  tableHeader: {
    paddingLeft: '30px',
  },
  paddingTop12: {
    paddingTop: '12px',
  },
  tableDiv: {
    maxWidth: '1340px',
    margin: 'auto',
    paddingTop: '50px',
    paddingLeft: '0px',
  },
  headerButtonLink: {
    textDecoration: 'none',
    lineHeight: '14px',
    fontSize: '12px',
    fontWeight: 'bold',
    color: '#c32c2e',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  detailContainerItems: {
    paddingTop: '7px',
    paddingLeft: '7px',
  },
  detailContainerItem: {
    paddingTop: '15px !important',
  },
  title: {
    color: '#0296c9',
    fontFamily: theme.custom.fontFamily,
    fontSize: '12px',
    letterSpacing: '0.017em',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  tableTitle: {
    textTransform: 'uppercase',
    fontFamily: 'Lato',
    fontSize: '17px',
    letterSpacing: '0.025em',
    color: '#0296c9',
    paddingBottom: '20px',
  },
  tableContent: {
    backgroundColor: '#ffffff',
    marginTop: '32px',
    borderBottom: '3px solid #e7e5e5',
    borderTop: '6px solid #e7e5e5',
  },
  fileContainer: {
    paddingTop: '4px',
  },
  fileContent: {
    backgroundColor: '#F3F3F3',
    borderRadius: '50%',
    height: '162px',
    width: '162px',
    paddingLeft: '48px',
    marginLeft: '36%',
    marginTop: '25px',
  },
  fileIcon: {
    '& img': {
      width: '163%',
      padding: '21px 120px 0px 0px',
    },
  },
  fileCount: {
    lineHeight: '31.7px',
    fontSize: '30px',
    color: '#7A297D',
    fontWeight: '600',
    borderBottom: '#7A297D solid 5px',
    fontFamily: 'Oswald',
    width: 'max-content',
    padding: '15px 0px 12px 0px',
  },
  paddingTop32: {
    paddingTop: '36px !important',
  },
  marginTopN37: {
    marginTop: '15px',
  },
  externalLinkIcon: {
    width: '16px',
    verticalAlign: 'sub',
    marginLeft: '4px',
  },
  snackBarMessageIcon: {
    verticalAlign: 'middle',
  },
  messageTop: {
    position: 'absolute',
    right: '20px',
    zIndex: '300',
  },
});

export default withStyles(styles, { withTheme: true })(ProgramView);
