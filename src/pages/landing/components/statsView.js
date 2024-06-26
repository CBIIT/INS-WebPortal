import React from 'react';
import {
  withStyles,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import baseImg from '../../../assets/landing/Base.png';
import './statsStyles.css';

const linkPage = '/explore';

const LandingStatsView = ({ classes, stats, statsData }) => {
  const statBarPrograms = {
    borderRadius: '79px 0px 0px 79px',
    backgroundImage: 'linear-gradient(to right, #c56e6e, #923b3c)',
    padding: '10px',
    width: `calc(${Math.log10(statsData.numberOfPrograms) * 48}px)`,
    height: '63px',
    float: 'right',
    marginTop: '7px',
    marginRight: '-15px',
  };

  const statBarProjects = {
    borderRadius: '79px 0px 0px 79px',
    backgroundImage: 'linear-gradient(to right, #be73d6, #8b40a3)',
    padding: '10px',
    width: `calc(${Math.log10(statsData.numberOfProjects) * 48}px)`,
    height: '63px',
    float: 'right',
    marginTop: '34px',
    marginRight: '-15px',
  };

  const statBarGrants = {
    borderRadius: '79px 0px 0px 79px',
    backgroundImage: 'linear-gradient(to right, #6b7ea1, #384c6e)',
    padding: '10px',
    width: `calc(${Math.log10(statsData.numberOfGrants) * 48}px)`,
    height: '63px',
    float: 'right',
    marginTop: '61px',
    marginRight: '-15px',
  };

  const statBarPublications = {
    borderRadius: '79px 0px 0px 79px',
    backgroundImage: 'linear-gradient(to right, #aabbff, #7788cc)',
    padding: '10px',
    width: `calc(${Math.log10(statsData.numberOfPublications) * 48}px)`,
    height: '63px',
    float: 'right',
    marginTop: '89px',
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
                        <div className={stat.statTitle === 'Programs' ? classes.statTitlePrograms : stat.statTitle === 'Projects' ? classes.statTitleProjects : stat.statTitle === 'Grants' ? classes.statTitleGrants : classes.statTitlePublications} id={`title_${index + 1}`}>
                          {stat.statTitle}
                        </div>
                        <div className={stat.statTitle === 'Programs' ? classes.statCountPrograms : stat.statTitle === 'Projects' ? classes.statCountProjects : stat.statTitle === 'Grants' ? classes.statCountGrants : classes.statCountPublications} id={`count_${index + 1}`}>
                          {statsData[stat.statAPI]}
                        </div>
                      </div>
                      <div className="statsSlide">
                        <div style={stat.statTitle === 'Programs' ? statBarPrograms : stat.statTitle === 'Projects' ? statBarProjects : stat.statTitle === 'Grants' ? statBarGrants : statBarPublications} id={`bar_${index + 1}`} />
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
    background: '#403e41',
    backgroundImage: `url(${baseImg})`,
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
    paddingTop: '20px',
    marginRight: '10px',
  },
  statsText: {
    height: '43px',
    display: 'flex',
    lineHeight: '15px',
    float: 'right',
  },
  statTitlePrograms: {
    display: 'inline-block',
    float: 'right',
    textAlign: 'right',
    color: '#CECECE',
    fontFamily: 'Nunito',
    fontWeight: 900,
    fontSize: '18px',
    textTransform: 'uppercase',
    paddingRight: '10px',
    marginTop: '32px',
  },
  statTitleProjects: {
    display: 'inline-block',
    float: 'right',
    textAlign: 'right',
    color: '#CECECE',
    fontFamily: 'Nunito',
    fontWeight: 900,
    fontSize: '18px',
    textTransform: 'uppercase',
    paddingRight: '10px',
    marginTop: '59px',
  },
  statTitleGrants: {
    display: 'inline-block',
    float: 'right',
    textAlign: 'right',
    color: '#CECECE',
    fontFamily: 'Nunito',
    fontWeight: 900,
    fontSize: '18px',
    textTransform: 'uppercase',
    paddingRight: '10px',
    marginTop: '86px',
  },
  statTitlePublications: {
    display: 'inline-block',
    float: 'right',
    textAlign: 'right',
    color: '#CECECE',
    fontFamily: 'Nunito',
    fontWeight: 900,
    fontSize: '18px',
    textTransform: 'uppercase',
    paddingRight: '10px',
    marginTop: '114px',
  },
  statCountPrograms: {
    display: 'inline-block',
    color: '#FFFFFF',
    textAlign: 'right',
    float: 'right',
    fontFamily: 'Oswald',
    fontSize: '38px',
    fontWeight: 600,
    marginRight: '5px',
    marginTop: '32px',
  },
  statCountProjects: {
    display: 'inline-block',
    color: '#FFFFFF',
    textAlign: 'right',
    float: 'right',
    fontFamily: 'Oswald',
    fontSize: '38px',
    fontWeight: 600,
    marginRight: '5px',
    marginTop: '59px',
  },
  statCountGrants: {
    display: 'inline-block',
    color: '#FFFFFF',
    textAlign: 'right',
    float: 'right',
    fontFamily: 'Oswald',
    fontSize: '38px',
    fontWeight: 600,
    marginRight: '5px',
    marginTop: '86px',
  },
  statCountPublications: {
    display: 'inline-block',
    color: '#FFFFFF',
    textAlign: 'right',
    float: 'right',
    fontFamily: 'Oswald',
    fontSize: '38px',
    fontWeight: 600,
    marginRight: '5px',
    marginTop: '114px',
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
    padding: '17px 15px 81px 70px',
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
    width: '1915px',
    marginRight: '80px',
  },
});

export default withStyles(styles, { withTheme: true })(LandingStatsView);
