import React from 'react';
import { Link } from 'react-router-dom';
import {
  Grid, Paper, Typography, withStyles,
} from '@material-ui/core';
import bg from '../../assets/error/background.png';
import heroBg from '../../assets/error/404_bubbles.png';

const Error = ({ classes }) => (
  <div className={classes.container}>
    <Grid container className={classes.container2}>
      <Grid item xs={12} className={classes.heroImage} />
      <Grid item xs={12} className={classes.errorTextRow}>
        Sorry, page not found
      </Grid>
      <Grid item xs={12} className={classes.errorText}>
        The page you are looking for does not exist or another error has occurred.
      </Grid>
      <Grid item xs={12} className={classes.errorAction}>
        <Link className={classes.link} to="/">BACK HOME</Link>
        <div className={classes.polygen} />
      </Grid>
    </Grid>
  </div>
);

const styles = (theme) => ({
  container: {
    display: 'flex',
    marginTop: '-49px',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    left: 0,
    borderTop: '4px solid #417d96',
    backgroundRepeat: 'round',
    background: `url(${bg})`,
  },
  heroImage: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '180px',
    background: `url(${heroBg})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'bottom center',
    marginLeft: '25px',
  },
  errorTextRow: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '40px',
    color: '#000000',
    fontFamily: 'Inter',
    fontSize: '40px',
    fontWeight: '800',
    lineHeight: '34px',
    marginTop: '18px',
  },
  errorText: {
    fontFamily: 'Nunito',
    fontWeight: '600',
    fontSize: 17,
    textAlign: 'center',
    height: '20px',
    color: '#000000',
    letterSpacing: '0',
    lineHeight: '20px',
    marginTop: '20px',
  },
  link: {
    padding: '9px 49px 9px 29px',
    textDecoration: 'none',
    border: '1px solid #A4A0AB',
    backgroundColor: '#A4A0AB',
    color: '#ffffff',
    fontFamily: 'Lato',
    fontSize: '16px',
    fontWeight: 'bold',
    lineHeight: '26.41px',
  },
  errorAction: {
    marginTop: '25px',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '50px',
  },
  polygen: {
    backgroundColor: '#ffffff',
    clipPath: 'polygon(50% 0, 100% 100%, 0 100%)',
    width: '11px',
    height: '11px',
    transform: 'rotate(90deg)',
    position: 'absolute',
    top: '18px',
    right: 'calc(50% - 65px)',
  },
  container2: {
    maxWidth: '1200px',
    padding: '109px 0',
  },
});

export default withStyles(styles, { withTheme: true })(Error);
