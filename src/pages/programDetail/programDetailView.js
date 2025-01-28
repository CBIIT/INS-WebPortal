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
  programDetailIcon,
  pageSubTitle,
  leftPanel,
  rightPanel,
  externalLinkIcon,
} from '../../bento/programDetailData';
import Subsection from '../../components/PropertySubsection/programDetailSubsection';
import StatsView from '../../components/Stats/StatsView';
import TabsView from './tabs/TabsView';

const ProgramView = ({
  classes, data,
}) => {
  const {
    numberOfPublications,
    numberOfProjects,
    numberOfGrants,
  } = data;
  const programData = data;

  const totalResearchOutputs = (numberOfProjects || 0)
    + (numberOfGrants || 0)
    + (numberOfPublications || 0);

  const stat = {
    numberOfPrograms: 1,
    numberOfProjects: numberOfProjects !== undefined ? numberOfProjects : 'undefined',
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
              Explore Programs
            </Link>
            {'    '}
            {'>'}
            {'    '}
            {programData[pageTitle.dataField] || ''}
          </div>
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
                  {pageTitle.label}
                  <span>
                    {' '}
                    {programData[pageTitle.dataField]}
                  </span>
                </span>
              </div>
              <div className={cn(classes.headerMSubTitle, classes.headerSubTitleCate)}>
                <span id="program_detail_subtile">
                  {programData[pageSubTitle.dataField]}
                </span>
              </div>
            </div>
          </div>
          <Grid container spacing={1} className={classes.detailContainer}>
            <Grid item sm={6} xs={6} className={[classes.detailPanel, classes.leftPanel]}>
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
            <Grid item sm={6} xs={6} className={[classes.detailPanel, classes.rightPanel]}>
              <div className={classes.innerPanel}>
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
          </Grid>
        </div>
      </div>
      {totalResearchOutputs > 0 ? (
        <>
          <div className={classes.detailTabContainer}>
            <TabsView
              programStats={data}
              activeFilters={{ program_ids: [programData.program_id] }}
            />
          </div>
          <div className={classes.blankSpace} />
        </>
      ) : (
        <div className={classes.noResearchOutputsBG}>
          <div className={classes.noResearchOutputs}>
            <div className={classes.noResearchOutputsHeader}>
              Looking For Research Outputs Of This Program?
            </div>
            <div className={cn(classes.noResearchOutputsContent, classes.textCenter, classes.p10)}>
              Please visit the
              {' '}
              {programData.program_link ? (
                <>
                  <a href={programData.program_link} target="_blank" rel="noopener noreferrer" className={classes.textDecorationNone}>
                    {programData.program_acronym}
                    <img
                      src={externalLinkIcon.src}
                      alt={externalLinkIcon.alt}
                      className={classes.externalLinkIcon}
                    />
                  </a>
                  {' '}
                  program website
                </>
              ) : (
                'program website'
              )}
              {' '}
              directly to learn more.
            </div>
            <div className={classes.noResearchOutputsContent}>
              Many Programs are complex collections
              of interconnected funding inputs with
              abundant research outputs. The INS is
              continually improving and working to
              capture this complexity for all Programs.
              While we improve, the many research outputs
              for some Programs may not be reflected within INS.
            </div>
          </div>
        </div>
      )}

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
    paddingLeft: '32px',
    paddingRight: '32px',
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
    borderRight: '1px solid #B0D7E6',
  },
  rightPanel: {
    paddingLeft: '25px !important',
  },
  blankSpace: {
    height: '73px',
    background: '#f3f3f3',
  },
  innerContainer: {
    padding: '0 ',
    fontFamily: theme.custom.fontFamily,
    background: '#FFFFFF',
  },
  detailTabContainer: {
    maxWidth: theme.custom.maxContentWidth,
    margin: 'auto',
  },
  noResearchOutputsBG: {
    background: '#E6F2F7',
    width: '100%',
    padding: '60px 0 130px 0',
  },
  noResearchOutputs: {
    maxWidth: '1034px',
    margin: 'auto',
    background: '#fff',
    padding: '20px',
    border: 'solid 1px #9D9D9D',
    borderRadius: '12px',
  },
  noResearchOutputsHeader: {
    textAlign: 'center',
    fontSize: '19px',
    fontWeight: '600',
    lineHeight: '20px',
    color: '#4B619A',
    textTransform: 'capitalize',
    padding: '10px 0',
  },
  noResearchOutputsContent: {
    textAlign: 'left',
    fontSize: '18px',
    fontWeight: '400',
    lineHeight: '25px',
  },
  textCenter: {
    textAlign: 'center',
  },
  p10: {
    padding: '10px',
  },
  externalLinkIcon: {
    width: '16px',
    verticalAlign: 'sub',
    marginLeft: '4px',
  },
  textDecorationNone: {
    textDecoration: 'none',
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
});

export default withStyles(styles, { withTheme: true })(ProgramView);
