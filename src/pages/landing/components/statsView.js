import React from 'react';
import {
  withStyles,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import baseImg from '../../../assets/landing/Base.png';
import './statsStyles.css';

const linkPage = '/programs';

const LandingStatsView = ({ classes, stats, statsData }) => {
  const stat1 = {
    borderRadius: '79px 0px 0px 79px',
    backgroundImage: 'linear-gradient(to right, #c56e6e, #923b3c)',
    padding: '10px',
    width: `calc(${Math.log10(statsData.numberOfPrograms) * 63}px)`,
    height: '50px',
    float: 'right',
    marginTop: '7px',
    marginRight: '-15px',
  };

  const stat2 = {
    borderRadius: '79px 0px 0px 79px',
    backgroundImage: 'linear-gradient(to right, #be73d6, #8b40a3)',
    padding: '10px',
    width: `calc(${Math.log10(statsData.numberOfDatasets) * 63}px)`,
    height: '50px',
    float: 'right',
    marginTop: '21px',
    marginRight: '-15px',
  };

  const stat3 = {
    borderRadius: '79px 0px 0px 79px',
    backgroundImage: 'linear-gradient(to right, #6b7ea1, #384c6e)',
    padding: '10px',
    width: `calc(${Math.log10(statsData.numberOfProjects) * 63}px)`,
    height: '50px',
    float: 'right',
    marginTop: '35px',
    marginRight: '-15px',
  };

  const stat4 = {
    borderRadius: '79px 0px 0px 79px',
    backgroundImage: 'linear-gradient(to right, #aabbff, #7788cc)',
    padding: '10px',
    width: `calc(${Math.log10(statsData.numberOfGrants) * 63}px)`,
    height: '50px',
    float: 'right',
    marginTop: '49px',
    marginRight: '-15px',
  };

  const stat5 = {
    borderRadius: '79px 0px 0px 79px',
    backgroundImage: 'linear-gradient(to right, #fabe5f, #EDA534)',
    padding: '10px',
    width: `calc(${Math.log10(statsData.numberOfPublications) * 63}px)`,
    height: '50px',
    float: 'right',
    marginTop: '63px',
    marginRight: '-15px',
  };

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
                stats.map((stat, index) => (
                  <div className={classes.statsGroup}>
                    <div className={classes.statsText}>
                      <div className="statsFadeIn">
                        <div className={stat.statTitle === 'Programs' ? classes.statTitle1 : stat.statTitle === 'Projects' ? classes.statTitle3 : stat.statTitle === 'Grants' ? classes.statTitle4 : stat.statTitle === 'Datasets' ? classes.statTitle2 : classes.statTitle5} id={`title_${index + 1}`}>
                          {stat.statTitle}
                        </div>
                        <div className={stat.statTitle === 'Programs' ? classes.statCount1 : stat.statTitle === 'Projects' ? classes.statCount3 : stat.statTitle === 'Grants' ? classes.statCount4 : stat.statTitle === 'Datasets' ? classes.statCount2 : classes.statCount5} id={`count_${index + 1}`}>
                          {statsData[stat.statAPI]}
                        </div>
                      </div>
                      <div className="statsSlide">
                        <div style={stat.statTitle === 'Programs' ? stat1 : stat.statTitle === 'Projects' ? stat3 : stat.statTitle === 'Grants' ? stat4 : stat.statTitle === 'Datasets' ? stat2 : stat5} id={`bar_${index + 1}`} />
                      </div>
                    </div>
                  </div>
                ))
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
    paddingTop: '5px',
    marginRight: '10px',
  },
  statsText: {
    height: '43px',
    display: 'flex',
    lineHeight: '15px',
    float: 'right',
  },
  statTitle1: {
    display: 'inline-block',
    float: 'right',
    textAlign: 'right',
    color: '#CECECE',
    fontFamily: 'Nunito',
    fontWeight: 900,
    fontSize: '12px',
    textTransform: 'uppercase',
    paddingRight: '10px',
    marginTop: '23px',
  },
  statTitle2: {
    display: 'inline-block',
    float: 'right',
    textAlign: 'right',
    color: '#CECECE',
    fontFamily: 'Nunito',
    fontWeight: 900,
    fontSize: '12px',
    textTransform: 'uppercase',
    paddingRight: '10px',
    marginTop: '38px',
  },
  statTitle3: {
    display: 'inline-block',
    float: 'right',
    textAlign: 'right',
    color: '#CECECE',
    fontFamily: 'Nunito',
    fontWeight: 900,
    fontSize: '12px',
    textTransform: 'uppercase',
    paddingRight: '10px',
    marginTop: '55px',
  },
  statTitle4: {
    display: 'inline-block',
    float: 'right',
    textAlign: 'right',
    color: '#CECECE',
    fontFamily: 'Nunito',
    fontWeight: 900,
    fontSize: '12px',
    textTransform: 'uppercase',
    paddingRight: '10px',
    marginTop: '72px',
  },
  statTitle5: {
    display: 'inline-block',
    float: 'right',
    textAlign: 'right',
    color: '#CECECE',
    fontFamily: 'Nunito',
    fontWeight: 900,
    fontSize: '12px',
    textTransform: 'uppercase',
    paddingRight: '10px',
    marginTop: '89px',
  },
  statCount1: {
    display: 'inline-block',
    color: '#FFFFFF',
    textAlign: 'right',
    float: 'right',
    fontFamily: 'Oswald',
    fontSize: '24px',
    fontWeight: 600,
    marginRight: '5px',
    marginTop: '19px',
  },
  statCount2: {
    display: 'inline-block',
    color: '#FFFFFF',
    textAlign: 'right',
    float: 'right',
    fontFamily: 'Oswald',
    fontSize: '24px',
    fontWeight: 600,
    marginRight: '5px',
    marginTop: '36px',
  },
  statCount3: {
    display: 'inline-block',
    color: '#FFFFFF',
    textAlign: 'right',
    float: 'right',
    fontFamily: 'Oswald',
    fontSize: '24px',
    fontWeight: 600,
    marginRight: '5px',
    marginTop: '53px',
  },
  statCount4: {
    display: 'inline-block',
    color: '#FFFFFF',
    textAlign: 'right',
    float: 'right',
    fontFamily: 'Oswald',
    fontSize: '24px',
    fontWeight: 600,
    marginRight: '5px',
    marginTop: '70px',
    marginLeft: '-25px',
  },
  statCount5: {
    display: 'inline-block',
    color: '#FFFFFF',
    textAlign: 'right',
    float: 'right',
    fontFamily: 'Oswald',
    fontSize: '24px',
    fontWeight: 600,
    marginRight: '5px',
    marginTop: '87px',
    marginLeft: '-25px',
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
});

export default withStyles(styles, { withTheme: true })(LandingStatsView);
