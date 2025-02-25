import React from 'react';
import _ from 'lodash';
import {
  Grid,
  withStyles,
  Link,
} from '@material-ui/core';
import { cn } from '@bento-core/util';
import {
  pageTitle,
  projectDetailIcon,
  pageSubTitle,
  topPanel,
  bottomPanel,
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
          <div className={classes.breadCrumbs}>
            <Link href="#programs" className={classes.navLink}>
              Explore Projects
            </Link>
            {'    '}
            <span className={classes.carrot}>
              {'>'}
            </span>
            {'    '}
            {projectData[pageTitle.dataField] || ''}
          </div>
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
            <Grid item sm={6} xs={6} className={[classes.detailPanel, classes.topPanel]}>
              <div className={classes.innerPanel}>
                <Grid container spacing={2}>
                  {topPanel.slice(0, 3).map((section) => (
                    <Subsection
                      key={section.sectionHeader}
                      config={section}
                      data={data}
                    />
                  ))}
                </Grid>
              </div>
            </Grid>
            <Grid item sm={12} xs={12} className={[classes.detailPanel, classes.bottomPanel]}>
              <div className={classes.innerPanel}>
                <Grid container spacing={2}>
                  {bottomPanel.slice(0, 3).map((section) => (
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
    paddingTop: '30px',
    fontFamily: theme.custom.fontFamily,
    paddingLeft: '48px',
    paddingRight: '48px',
    background: '#FFFF',
    paddingBottom: '16px',
  },
  header: {
    paddingLeft: '21px',
    paddingRight: '35px',
    borderBottom: '#4B619A 10px solid',
    height: 'fit-content',
    margin: 'auto',
    display: 'inline-block',
    width: '100%',
  },
  headerTitle: {
    margin: 'auto',
    marginLeft: '95px',
    width: 'calc(100% - 265px)',
  },
  headerMainTitle: {
    '& > span': {
      fontWeight: '400',
      letterSpacing: '0.017em',
    },
    '& > span > span': {
      fontWeight: '600',
      letterSpacing: '0.025em',
    },
    fontFamily: 'Inter',
    letterSpacing: '0.025em',
    color: '#274FA5 ',
    fontSize: '26px',
    lineHeight: '30px',
    paddingLeft: '0px',
  },
  headerSubTitleCate: {
    color: '#5A656A',
    fontWeight: '400',
    fontFamily: 'Nunito',
    letterSpacing: '0.023em',
    fontSize: '16px',
    overflow: 'hidden',
    lineHeight: '25px',
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
    marginTop: '-9px',
    width: '107px',
    filter: 'drop-shadow(24px 22px 7px rgba(27,28,28,0.29))',
  },
  detailContainer: {
    maxWidth: '100%',
    margin: 'auto',
    marginBlockEnd: '50px',
    paddingTop: '50px',
    paddingLeft: '5px',
    fontFamily: theme.custom.fontFamily,
    letterSpacing: '0.014em',
    color: '#000000',
    size: '12px',
    lineHeight: '23px',
  },
  topPanel: {
    paddingLeft: '25px !important',
  },
  bottomPanel: {
    borderTop: '3px solid #7D91C4',
    paddingLeft: '25px !important',
    marginTop: '55px',
    paddingTop: '59px !important',
  },
  blankSpace: {
    height: '73px',
    background: '#e6f2f7',
  },
  innerContainer: {
    padding: '0 ',
    fontFamily: theme.custom.fontFamily,
    background: '#FFFFFF',
  },
  detailTabContainer: {
    maxWidth: '95%',
    margin: 'auto',
  },
  navLink: {
    color: '#005EA2',
    fontFamily: 'Public Sans',
    fontSize: '16px',
    fontWeight: '400',
    lineHeight: '26px',
    textDecoration: 'underline solid',
  },
  breadCrumbs: {
    color: '#1B1B1B',
    fontFamily: 'Public Sans',
    fontSize: '16px',
    textAlign: 'left',
    fontWeight: '400',
    lineHeight: '26px',
    marginTop: '-20px',
    marginBottom: '55px',
  },
  carrot: {
    color: '#71767A',
  },
});

export default withStyles(styles, { withTheme: true })(ProjectView);
