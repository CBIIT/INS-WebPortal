import React from 'react';
import {
  withStyles,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import baseImg from '../../../assets/landing/Base.png';
import './statsStyles.css';

const linkPage = '/programs';

const LandingStatsView = ({ classes, stats, statsData }) => {
  const statsBarColor = [
    'linear-gradient(to right, #c56e6e, #923b3c)',
    'linear-gradient(to right, #fabe5f, #EDA534)',
    'linear-gradient(to right, #6b7ea1, #384c6e)',
    'linear-gradient(to right, #aabbff, #7788cc)',
    'linear-gradient(to right, #be73d6, #8b40a3)',
  ];
  const statsStyle = stats.map((stat, index) => ({
    right: {
      right: `calc(${Math.log10(statsData[stat.statAPI]) * 63}px)`,
    },
    width: {
      width: `calc(${Math.log10(statsData[stat.statAPI]) * 63}px)`,
      background: statsBarColor[index],
    },
  }));

  return (
    <>
      <div className={classes.statsSectionCenter}>
        <div className={classes.leftBox}>
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
        </div>
        <div className="statsBox">
          {stats.length > 0 && (
            <div className={classes.box}>
              {
                stats.map((stat, index) => {
                  const dynamicMarginRight = statsStyle[index].right;
                  const dynamicWith = statsStyle[index].width;
                  return (
                    <div className={classes.statsGroup}>
                      <div className={classes.statsText}>
                        <div className="statsFadeIn ">
                          <div style={dynamicMarginRight} className={classes.statsSlideText}>
                            <div className={classes.statTitle} id={`title_${index + 1}`}>
                              {stat.statTitle}
                            </div>
                            <div className={classes.statCount} id={`count_${index + 1}`}>
                              {statsData[stat.statAPI]}
                            </div>
                          </div>
                        </div>
                        <div className={classes.statsSlideBg}>
                          <div className="statsSlide">
                            <div style={dynamicWith} id={`bar_${index + 1}`} className={classes.statsSlideBar} />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              }
            </div>
          )}
        </div>
      </div>
    </>
  );
};

const styles = () => ({
  statsSectionCenter: {
    height: '315px',
    zIndex: 2,
    background: '#403e41',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '-55px -52px',
    maxWidth: '1060px',
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
  box: {
    direction: 'ltr',
    display: 'block',
    height: '255px',
    paddingTop: '1px',
    marginRight: '10px',
  },
  statsText: {
    height: '43px',
    display: 'flex',
    lineHeight: '15px',
    float: 'right',
    marginTop: '15px',
  },
  statTitle: {
    display: 'inline-block',
    float: 'right',
    textAlign: 'right',
    color: '#CECECE',
    fontFamily: 'Nunito',
    fontWeight: 900,
    fontSize: '12px',
    textTransform: 'uppercase',
    padding: '3px 10px 0 3px',
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
    padding: '35px 24px 65px 70px',
  },
  leftText: {
    fontFamily: 'Inter',
    color: '#FFFFFF',
    fontSize: '40px',
    fontWeight: '800',
    textAlign: 'left',
    lineHeight: '40px',
  },
  linkText: {
    color: '#E26063',
    textDecoration: 'none',
  },
  leftBox: {
  },
  statsSlideBg: {
    width: '350px',
    background: 'linear-gradient(270deg, rgba(94, 94, 94, 1) 0%, rgba(65, 62, 65, 1) 100%)',
    height: '50px',
    marginRight: '-15px',
  },
  statsSlideBar: {
    borderRadius: '79px 0px 0px 79px',
    backgroundImage: 'linear-gradient(to right, #c56e6e, #923b3c)',
    padding: '10px',
    height: '50px',
    float: 'right',
    marginRight: '-15px',
  },
  statsSlideText: {
    position: 'absolute',
    zIndex: '999',
    marginTop: '18px',
  },
});

export default withStyles(styles, { withTheme: true })(LandingStatsView);
