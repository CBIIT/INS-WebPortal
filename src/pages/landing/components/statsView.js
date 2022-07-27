import React from 'react';
import classnames from 'classnames';
import {
  withStyles,
} from '@material-ui/core';

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
          <span className={classes.linkText}> here</span>
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
                    {statsData[stat.statAPI]}
                  </div>
                  <div className={classes.statTitle} id={`title_${index + 1}`}>
                    {stat.statTitle}
                  </div>
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
    height: '350px',
  },
  statsText: {
    height: '42px',
    display: 'flex',
    lineHeight: '10px',
  },
  statTitle: {
    display: 'inline-block',
    float: 'right',
    textAlign: 'right',
    color: 'white',
    fontFamily: 'Nunito',
    fontWeight: 900,
    fontSize: '11px',
    textTransform: 'uppercase',
  },
  statCount: {
    display: 'inline-block',
    color: 'white',
    textAlign: 'right',
    float: 'right',
    fontFamily: 'Oswald',
    fontSize: '24px',
    fontWeight: 600,
    marginRight: '16px',
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
    margin: '14px 48px',
  },
  leftGroup: {
    padding: '36px 400px 46px 98px',
  },
  leftText: {
    color: 'white',
    fontSize: '40px',
    fontWeight: 'bold',
    textAlign: 'left',
    lineHeight: '40px',
  },
  linkText: {
    color: '#E26063',
  },
});

export default withStyles(styles, { withTheme: true })(LandingStatsView);
