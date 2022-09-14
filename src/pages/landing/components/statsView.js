/* eslint-disable object-curly-newline */
import React from 'react';
import classnames from 'classnames';
import {
  withStyles,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import baseImg from '../../../assets/landing/Base.png';

const linkPage = '/explore';

const dataTransform = (data) => {
  let transformedCount = '';

  if (data >= 1000) {
    transformedCount = `${data.toString().slice(0, -3)}K`;
  } else {
    transformedCount = data.toString();
  }

  return transformedCount;
};

const LandingStatsView = ({ classes, stats, statsData }) => (
  <>
    <div className={classnames({
      [classes.statsSection]: stats.length < 6,
      [classes.statsSectionCenter]: stats.length === 6,
    })}
    >
      <div className={classes.leftGroup}>
        <div className={classes.leftText}>
          INS compiles programs, projects, and outputs funded by the NCI.
          <br />
          <br />
          Explore the data
          <Link to={linkPage} className={classes.linkText}> here</Link>
          .
        </div>
      </div>
      {stats.length > 0 && (
        <div
          className={classnames({
            [classes.boxCut]: stats.length < 6,
            [classes.box]: stats.length === 6,
          })}
        >
          {
            stats.map((stat, index) => (
              <div className={classes.statsGroup}>
                <div className={classes.statsText}>
                  <div className={classes.statCount} id={`count_${index + 1}`}>
                    {dataTransform(statsData[stat.statAPI])}
                  </div>
                  <div className={classes.statTitle} id={`title_${index + 1}`}>
                    {stat.statTitle}
                  </div>
                  <div className={classnames({ [classes.statBarPrograms]: stat.statTitle === 'Programs', [classes.statBarProjects]: stat.statTitle === 'Projects', [classes.statBarPublications]: stat.statTitle === 'Publications', [classes.statBarDatasets]: stat.statTitle === 'Datasets', [classes.statBarClinicalTrials]: stat.statTitle === 'Clinical Trials', [classes.statBarPatents]: stat.statTitle === 'Patents' })} id={`bar_${index + 1}`} />
                </div>
              </div>
            ))
          }
        </div>
      )}
    </div>
  </>
);

const styles = () => ({
  statsSection: {
    background: '#3E3C3F',
    maxWidth: '1200px',
    textAlign: 'right',
    position: 'absolute',
    left: 0,
    right: 0,
    margin: '-24px auto auto auto',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  statsSectionCenter: {
    background: '#3E3C3F',
    maxWidth: '1200px',
    textAlign: 'right',
    position: 'absolute',
    overflow: 'auto',
    left: 0,
    right: 0,
    margin: '-24px auto auto auto',
    display: 'flex',
    justifyContent: 'right',
    '@media (min-width: 900px)': {
      overflow: 'inherit',
    },
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
  },
  bannerTexture: {
    color: '#4898B4',
    fontFamily: 'Raleway',
    fontSize: '19px',
    fontWeight: '600',
    lineHeight: '60px',
    textAlign: 'center',
    margin: '0 auto',
    letterSpacing: '0.050pt',
    textTransform: 'uppercase',
    width: '869px',
  },
  boxCut: {
    direction: 'ltr',
    display: 'block',
    borderBottom: '74px solid white',
    borderLeft: '50px solid transparent',
    height: '74px',
  },
  box: {
    direction: 'ltr',
    display: 'block',
    borderBottom: '74px solid #3E3C3F',
    height: '255px',
    marginTop: '20px',
    marginRight: '10px',
  },
  statsText: {
    // backgroundImage: `url(${baseImg})`,
    height: '42px',
    display: 'flex',
    lineHeight: '15px',
    float: 'right',
  },
  statTitle: {
    display: 'inline-block',
    float: 'right',
    textAlign: 'right',
    color: '#CECECE',
    fontFamily: 'Nunito',
    fontWeight: 900,
    fontSize: '11px',
    textTransform: 'uppercase',
    paddingRight: '10px',
  },
  statCount: {
    display: 'inline-block',
    color: '#FFFFFF',
    textAlign: 'right',
    float: 'right',
    fontFamily: 'Oswald',
    fontSize: '24px',
    fontWeight: 600,
    marginRight: '5px',
  },
  floatLeft: {
    float: 'left',
    marginTop: '3px',
    letterSpacing: '1px',
  },
  floatRight: {
    float: 'right',
    marginLeft: '6px',
    marginTop: '3px',
  },
  statsGroup: {
    margin: '5px 5px -10px 5px',
  },
  leftGroup: {
    padding: '36px 310px 36px 155px',
  },
  leftText: {
    fontFamily: 'Inter',
    color: '#FFFFFF',
    fontSize: '40px',
    fontWeight: '1000',
    textAlign: 'left',
    lineHeight: '34px',
  },
  linkText: {
    color: '#E26063',
    textDecoration: 'none',
  },
  statBarPrograms: {
    borderRadius: '50px 0px 0px 50px',
    background: '#B74A4B',
    padding: '10px',
    width: '1px',
    height: '35px',
    float: 'right',
    marginTop: '-10px',
    marginRight: '-15px',
    boxShadow: 'inset 0 0 5px #DBA4A5',
  },
  statBarProjects: {
    borderRadius: '50px 0px 0px 50px',
    background: '#AE51CC',
    padding: '10px',
    width: '140px',
    height: '35px',
    float: 'right',
    marginTop: '-10px',
    marginRight: '-15px',
    boxShadow: 'inset 0 0 5px #D6A8E5',
  },
  statBarPublications: {
    borderRadius: '50px 0px 0px 50px',
    background: '#475F8A',
    padding: '10px',
    width: '190px',
    height: '35px',
    float: 'right',
    marginTop: '-10px',
    marginRight: '-15px',
    boxShadow: 'inset 0 0 5px #A3AFC4',
  },
  statBarDatasets: {
    borderRadius: '50px 0px 0px 50px',
    background: '#95ABFF',
    padding: '10px',
    width: '140px',
    height: '35px',
    float: 'right',
    marginTop: '-10px',
    marginRight: '-15px',
    boxShadow: 'inset 0 0 5px #CAD5FF',
  },
  statBarClinicalTrials: {
    borderRadius: '50px 0px 0px 50px',
    background: '#FCA001',
    padding: '10px',
    width: '80px',
    height: '35px',
    float: 'right',
    marginTop: '-10px',
    marginRight: '-15px',
    boxShadow: 'inset 0 0 5px #FDCF80',
  },
  statBarPatents: {
    borderRadius: '50px 0px 0px 50px',
    background: '#7B7781',
    padding: '10px',
    width: '30px',
    height: '35px',
    float: 'right',
    marginTop: '-10px',
    marginRight: '-15px',
    boxShadow: 'inset 0 0 5px #BDBBC0',
  },
});

export default withStyles(styles, { withTheme: true })(LandingStatsView);
