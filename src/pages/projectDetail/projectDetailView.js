import React from 'react';
import _ from 'lodash';
import {
  Grid,
  withStyles,
} from '@material-ui/core';
import { cn } from '@bento-core/util';
import {
  pageTitle,
  projectDetailIcon,
  pageSubTitle,
  leftPanel,
} from '../../bento/projectDetailData';
import Subsection from '../../components/PropertySubsection/projectDetailSubsection';
import StatsView from '../../components/Stats/StatsView';
import TabsView from './tabs/TabsView';

const ProjectView = ({
  classes, data,
}) => {
  const {
    numberOfPrograms,
    numberOfPublications,
    numberOfGrants,
  } = data;
  const projectData = data;

  const stat = {
    numberOfPrograms: numberOfPrograms !== undefined ? numberOfPrograms : 'undefined',
    numberOfProjects: 1,
    numberOfGrants: numberOfGrants !== undefined ? numberOfGrants : 'undefined',
    numberOfPublications: numberOfPublications !== undefined ? numberOfPublications : 'undefined',
  };

  return (
    <>
      <StatsView data={stat} />
      <div className={classes.container}>
        <div className={classes.innerContainer}>
          <div className={classes.header}>
            <div className={classes.logo}>
              <img
                src={projectDetailIcon.src}
                alt={projectDetailIcon.alt}
              />
            </div>
            <div className={classes.headerTitle}>
              <div className={classes.headerMainTitle} id="project_detail_title">
                <span>
                  {pageTitle.label}
                  <span>
                    {' '}
                    {projectData[pageTitle.dataField]}
                  </span>
                </span>
              </div>
              <div className={cn(classes.headerMSubTitle, classes.headerSubTitleCate)}>
                <span id="project_detail_subtile">
                  {projectData[pageSubTitle.dataField]}
                </span>
              </div>
            </div>
          </div>
          <Grid container spacing={1} className={classes.detailContainer}>
            <Grid item sm={12} xs={12} className={[classes.detailPanel, classes.leftPanel]}>
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
          </Grid>
        </div>
      </div>
      <div className={classes.detailTabContainer}>
        <TabsView
          projectStats={data}
          activeFilters={{ project_id: projectData.project_id }}
        />
      </div>
      <div className={classes.blankSpace} />
    </>
  );
};

const styles = (theme) => ({
  root: {
    fontFamily: '"Open Sans", sans-serif',
    fontSize: '9pt',
    letterSpacing: '0.025em',
    color: '#000',
  },
  container: {
    paddingTop: '50px',
    fontFamily: theme.custom.fontFamily,
    paddingLeft: '32px',
    paddingRight: '32px',
    background: '#FFFF',
    paddingBottom: '16px',
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
  headerMSubTitle: {
    paddingTop: '3px',
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
  },
  leftPanel: {
    paddingLeft: '25px !important',
  },
  blankSpace: {
    height: '73px',
    background: '#f3f3f3',
  },
  innerContainer: {
    maxWidth: '1340px',
    margin: '0 auto',
    padding: '0',
    fontFamily: theme.custom.fontFamily,
    background: '#FFFFFF',
  },
  detailTabContainer: {
    maxWidth: theme.custom.maxContentWidth,
    margin: 'auto',
  },
});

export default withStyles(styles, { withTheme: true })(ProjectView);
