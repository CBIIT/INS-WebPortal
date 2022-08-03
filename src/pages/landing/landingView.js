import React from 'react';
import {
  Grid,
  withStyles,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import StatsView from './components/statsView';
import { Button } from '../../components/Wrappers/Wrappers';
import { landingPageData } from '../../bento/landingPageData';
import icon from '../../assets/landing/LP_ReadMore.svg';
import iconAbout from '../../assets/landing/LP_About_Fullarticle.Arrow.svg';

const LandingView = ({ classes, statsData }) => (
  <div className={classes.page}>
    <div className={classes.container}>
      <div className={classes.hero}>
        <Grid container spacing={16} direction="row">
          <div className={classes.heroImage} />
          <div className={classes.heroTextContainer}>
            <div className={classes.heroTextWrapper}>
              <div className={classes.headerTitle}>
                {landingPageData.callToActionTitle}
              </div>
              <div className={classes.headerContent}>
                {landingPageData.callToActionDescription}
              </div>
              <div className={classes.headerButtonSection}>
                <Link to={landingPageData.callToActionLink} className={classes.headerLink}>
                  <Button className={classes.buttonText} color="red">
                    {landingPageData.callToActionButtonText}
                    <img
                      src={landingPageData.heroExploreButtonArrow.img}
                      className={classes.smallImage}
                      alt={landingPageData.heroExploreButtonArrow.alt}
                      id="buttonArrow"
                    />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          <div className={classes.heroImageContainer}>
            <img
              className={classes.bigImage}
              src={landingPageData.interactiveImg.img}
              alt={landingPageData.interactiveImg.alt}
              id="interactive_img"
            />
            <div className={classes.NCICommunityImgContainer}>
              <img
                className={classes.iconImage}
                src={landingPageData.NCICommunityImg.img}
                alt={landingPageData.NCICommunityImg.alt}
                id="interactive_img"
              />
            </div>
            <div className={classes.NCICommunityLinkContainer}>
              <Link to={landingPageData.nciCommunityLink} className={classes.headerLink}>
                <div className={classes.iconTextWrapper}>
                  <div className={classes.iconTitle}>
                    {landingPageData.nciCommunityTitle}
                  </div>
                  <div className={classes.iconContent}>
                    {landingPageData.nciCommunityDescription}
                  </div>
                </div>
              </Link>
            </div>
            <div className={classes.AvailableOutputsImgContainer}>
              <img
                className={classes.iconImage}
                src={landingPageData.AvailableOutputsImg.img}
                alt={landingPageData.AvailableOutputsImg.alt}
                id="interactive_img"
              />
            </div>
            <div className={classes.AvailableOutputsLinkContainer}>
              <Link to={landingPageData.availableOutputsLink} className={classes.headerLink}>
                <div className={classes.iconTextWrapper}>
                  <div className={classes.iconTitle}>
                    {landingPageData.availableOutputsTitle}
                  </div>
                  <div className={classes.iconContent}>
                    {landingPageData.availableOutputsDescription}
                  </div>
                </div>
              </Link>
            </div>
            <div className={classes.UpdatedMetricsImgContainer}>
              <img
                className={classes.iconImage}
                src={landingPageData.UpdatedMetricsImg.img}
                alt={landingPageData.UpdatedMetricsImg.alt}
                id="interactive_img"
              />
            </div>
            <div className={classes.UpdatedMetricsLinkContainer}>
              <Link to={landingPageData.updatedMetricsLink} className={classes.headerLink}>
                <div className={classes.iconTextWrapper}>
                  <div className={classes.iconTitle}>
                    {landingPageData.updatedMetricsTitle}
                  </div>
                  <div className={classes.iconContent}>
                    {landingPageData.updatedMetricsDescription}
                  </div>
                </div>
              </Link>
            </div>
            <div className={classes.arrowCommunityImgContainer}>
              <img
                className={classes.iconImage}
                src={landingPageData.arrowCommunityImg.img}
                alt={landingPageData.arrowCommunityImg.alt}
                id="interactive_img"
              />
            </div>
            <div className={classes.arrowOutputsImgContainer}>
              <img
                className={classes.iconImage}
                src={landingPageData.arrowOutputsImg.img}
                alt={landingPageData.arrowOutputsImg.alt}
                id="interactive_img"
              />
            </div>
            <div className={classes.arrowMetricsImgContainer}>
              <img
                className={classes.iconImage}
                src={landingPageData.arrowMetricsImg.img}
                alt={landingPageData.arrowMetricsImg.alt}
                id="interactive_img"
              />
            </div>
          </div>
        </Grid>
      </div>
    </div>
    <div className={classes.whiteSection} />
    <StatsView stats={landingPageData.landingPageStatsBar} statsData={statsData} />
    <div className={classes.container}>
      <div className={classes.texture}>
        <Grid container spacing={16} direction="row" className={classes.landingContainer}>
          <div className={classes.contentLeft}>
            <div className={classes.about}>
              <div className={classes.aboutImageSection}>
                <img
                  src={landingPageData.tile1.img}
                  className={classes.aboutImage}
                  alt={landingPageData.tile1.alt}
                  id="tile1_image"
                />
              </div>
              <div className={classes.DCWords} id="tile1_title">
                {landingPageData.tile1.titleText}
              </div>
              <div className={classes.aboutContent} id="tile1_description">
                {landingPageData.tile1.descriptionText}
              </div>
              <div className={classes.aboutButtonSection}>
                <div className={classes.aboutButtonLeft}>
                  <img src={iconAbout} className={classes.iconAbout} alt="CTDC about icon" />
                </div>
                <div className={classes.aboutButtonRight} id="tile1_button">
                  <Link
                    to={landingPageData.tile1.callToActionLink}
                    className={classes.aboutButton}
                  >
                    {landingPageData.tile1.callToActionText}
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className={classes.contentRight}>
            <div className={classes.contentRightTop}>
              <div className={classes.program}>
                <div className={classes.programImg}>
                  <img
                    className={classes.image}
                    src={landingPageData.tile2.img}
                    alt={landingPageData.tile2.alt}
                    id="tile2_image"
                  />
                </div>
                <div className={classes.content}>
                  <div className={classes.contentHeader} id="tile2_title">
                    {landingPageData.tile2.titleText}
                  </div>
                  <div className={classes.contentContainer} id="tile2_description">
                    {landingPageData.tile2.descriptionText}
                  </div>
                </div>
                <div className={classes.yellowButton}>
                  <div className={classes.yellowButtonLeft}>
                    <img className={classes.icon} src={icon} alt="CTDC about " />
                    {' '}
                  </div>
                  <div className={classes.yellowButtonRight} id="tile2_button">
                    <Link
                      to={landingPageData.tile2.callToActionLink}
                      className={classes.yellowButton}
                    >
                      {landingPageData.tile2.callToActionText}
                    </Link>
                  </div>
                </div>
              </div>
              <div className={classes.studies}>
                <div className={classes.programImg}>
                  <img
                    className={classes.image}
                    src={landingPageData.tile3.img}
                    alt={landingPageData.tile3.src}
                    id="tile3_image"
                  />
                </div>
                <div className={classes.content}>
                  <div className={classes.contentHeader} id="tile3_title">
                    {landingPageData.tile3.titleText}
                  </div>
                  <div className={classes.contentContainer} id="tile3_description">
                    {landingPageData.tile3.descriptionText}
                  </div>
                </div>
                <div className={classes.yellowButton}>
                  <div className={classes.yellowButtonLeft}>
                    <img className={classes.icon} src={icon} alt="CTDC about " />
                    {' '}
                  </div>
                  <div className={classes.yellowButtonRight} id="tile3_button">
                    <Link
                      to={landingPageData.tile3.callToActionLink}
                      className={classes.yellowButton}
                    >
                      {landingPageData.tile3.callToActionText}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className={classes.contentRightBottom}>
              <div className={classes.cases} id="tile4_image">
                <div className={classes.mountainMeadowContentHeader} id="tile4_title">
                  {landingPageData.tile4.titleText}
                </div>
                <div className={classes.mountainMeadowContent} id="tile4_description">
                  {landingPageData.tile4.descriptionText}
                </div>
                <div className={classes.mountainMeadowButtonSection}>
                  <div className={classes.yellowButtonLeft}>
                    <img className={classes.mountainMeadowIcon} src={icon} alt="CTDC about " />
                    {' '}
                  </div>
                  <div className={classes.yellowButtonRight} id="tile4_button">
                    <Link
                      to={landingPageData.tile4.callToActionLink}
                      className={classes.mountainMeadowButton}
                    >
                      {landingPageData.tile4.callToActionText}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Grid>
      </div>
    </div>
  </div>
);
const styles = () => ({
  page: {
    marginTop: '-47px',
  },
  heroImage: {
    width: '100%',
    height: '420px',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% 100%',
    backgroundImage: `url(${landingPageData.landingPageHero.img})`,
  },
  texture: {
    backgroundSize: 'cover',
    background: '#9D0995',
    padding: '320px 0 80px 0',
  },
  container: {
    fontFamily: 'Raleway, sans-serif',
    margin: '0 auto',
  },
  whiteSection: {
    height: '8px',
    background: 'white',
  },
  redButton: {
    height: '13px',
    color: '#FFFFFF',
    fontFamily: 'Raleway',
    fontSize: '16px',
    fontWeight: 'bold',
    lineHeight: '47px',
    textAlign: 'center',
    textDecoration: 'none',
    textTransform: 'uppercase',
    letterSpacing: '0.8px',
  },
  headerTitle: {
    paddingTop: '94px',
    fontFamily: 'Inter, Raleway, sans-serif',
    fontSize: '38px',
    fontWeight: '1000',
    lineHeight: '35px',
    color: 'black',
    letterSpacing: '-0px',
  },
  paddingLeft50: {
    paddingLeft: '50px',
  },
  headerContent: {
    color: '#000000',
    fontFamily: 'Lato, Raleway',
    fontSize: '16px',
    fontWeight: '500',
    lineHeight: '27px',
    marginTop: '16px',
    marginBottom: '26px',
  },
  headerLink: {
    textDecoration: 'none',
  },
  iconAbout: {
    height: '17px',
    width: '9px',
    marginTop: '15px',
    marginLeft: '20px',
  },
  icon: {
    width: '20px',
    marginTop: '13px',
    marginLeft: '23px',
  },
  aboutImage: {
    width: '297px',
    height: '249px',
    padding: '14px',
  },
  aboutImageSection: {
    height: '249px',
  },
  DCWords: {
    height: '200px',
    background: '#380157',
    color: '#FFFFFF',
    fontSize: '36px',
    fontWeight: 'lighter',
    textTransform: 'capitalize',
    lineHeight: '36px',
    padding: '10px 75px 26px 26px',
    fontFamily: 'Lato',
  },
  landingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentLeft: {
    float: 'left',
    paddingRight: '10px',
  },
  about: {
    width: '300px',
    backgroundColor: 'white',
  },
  iconImage: {
    width: '45px',
    height: '45px',
  },
  smallImage: {
    width: '12px',
    height: '12px',
    marginLeft: '30px',
  },
  image: {
    width: '293px',
    height: '249px',
  },
  bigImage: {
    width: '842px',
    height: '843px',
  },
  aboutContent: {
    background: '#bdc4cd',
    minHeight: '372px',
    width: '300px',
    padding: '30px 30px 32px 30px',
    color: '#000000',
    fontFamily: 'Nunito',
    fontSize: '16px',
    fontWeight: '500',
    lineHeight: '22px',
  },
  aboutButtonSection: {
    background: '#bdc4cd',
    height: '71px',
  },
  imgIconAbout: {
    width: '49px',
  },
  aboutButtonLeft: {
    float: 'left',
    background: '#380157',
    height: '45px',
    width: '48px',
  },
  aboutButtonRight: {
    background: '#574586',
    float: 'left',
    height: '45px',
    width: '132px',
  },
  aboutButton: {
    color: '#ffffff',
    textDecoration: 'none',
    textTransform: 'uppercase',
    fontSize: '12px',
    fontWeight: '600',
    lineHeight: '45px',
    paddingLeft: '20px',
    boxShadow: 'none',
    letterSpacing: '1px',
  },
  content: {
    width: '100%',
    height: '155px',
    overflowY: 'auto',
    background: '#fff',
    paddingLeft: '30px',
    paddingTop: '5px',
    minHeight: '138px',
  },
  contentHeader: {
    color: '#20506A',
    fontFamily: 'Lato',
    fontSize: '28px',
    fontWeight: 'bold',
    lineHeight: '27px',
    padding: '10px 0',
  },
  contentContainer: {
    width: '215px',
    color: '#010101',
    fontFamily: 'Nunito',
    fontSize: '16px',
    lineHeight: '22px',
    paddingLeft: '2px',
    paddingBottom: '10px',
  },
  program: {
    float: 'left',
    padding: '0 10px 6.8px 0px',
  },
  programImg: {
    background: '#fff',
    height: '249px',
  },
  studies: {
    float: 'left',
  },
  contentRightBottom: {
    float: 'left',
    width: '597px',
    background: '#fff',
    backgroundImage: `url(${landingPageData.tile4.img})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
  cases: {
    height: '436px',
    paddingLeft: '340px',
    paddingTop: '70px',
  },
  mountainMeadowButtonSection: {
    height: '46px',
    width: '176px',
    backgroundColor: '#DDA211',
    marginTop: '20px',

  },
  blueButton: {
    height: '45px',
    background: '#0077E3',
    color: '#FFFFFF',
    fontFamily: 'Raleway',
    fontSize: '12px',
    fontWeight: '600',
    lineHeight: '25px',
    paddingLeft: '8px',
    textDecoration: 'none',
    letterSpacing: '1px',
  },
  blueButtonLeft: {
    float: 'left',
  },
  blueButtonRight: {
    float: 'left',
    lineHeight: '44px',
    marginLeft: '8px',
    fontFamily: 'Lato',
    fontSize: '14px',
    color: '#fff',
    textTransform: 'uppercase',
  },
  yellowButton: {
    height: '45px',
    background: '#DDA211',
    color: '#FFFFFF',
    fontFamily: 'Raleway',
    fontSize: '12px',
    fontWeight: '600',
    lineHeight: '25px',
    paddingLeft: '8px',
    textDecoration: 'none',
    letterSpacing: '1px',
  },
  yellowButtonLeft: {
    float: 'left',
  },
  yellowButtonRight: {
    float: 'left',
    lineHeight: '44px',
    marginLeft: '8px',
    fontFamily: 'Lato',
    fontSize: '14px',
    color: '#fff',
    textTransform: 'uppercase',
  },
  mountainMeadowContentHeader: {
    color: '#FEFEFE',
    fontFamily: 'Lato',
    fontSize: '28px',
    fontWeight: 'bold',
    lineHeight: '32px',
    padding: '15px 0',
  },
  mountainMeadowContent: {
    height: '143px',
    width: '230px',
    color: '#FEFEFE',
    fontFamily: 'Nunito',
    fontSize: '15px',
    lineHeight: '22px',
  },
  mountainMeadowIcon: {
    width: '20px',
    marginTop: '12px',
    marginLeft: '28px',
  },
  mountainMeadowButton: {
    padding: '15px 5px 0 0',
    height: '9px',
    width: '71px',
    color: '#FFFFFF',
    fontFamily: 'Raleway',
    fontSize: '12px',
    fontWeight: '600',
    lineHeight: '19.31px',
    textDecoration: 'none',
    marginLeft: '8px',
    letterSpacing: '1px',
    '&:hover': {
      color: '#ffffff',
    },
  },
  paddingBottom50: {
    paddingBottom: '50px',
  },
  paddingTop30: {
    paddingTop: '30px',
  },
  animationContainer: {
    position: 'relative',
    left: '33%',
  },

  paddingLeft2: {
    paddingLeft: '2px',
  },
  heroTextContainer: {
    position: 'absolute',
    width: '400px',
    margin: 'auto',
    left: '12px',
    right: 0,
    '@media (min-width: 900px)': {
      width: '906px',
    },
  },
  heroImageContainer: {
    position: 'absolute',
    width: '1200px',
    height: '1200px',
    margin: 'auto',
    left: '700px',
    top: '-75px',
    right: 0,
    '@media (min-width: 900px)': {
      width: '906px',
    },
  },
  NCICommunityImgContainer: {
    position: 'absolute',
    width: '10px',
    height: '10px',
    margin: 'auto',
    left: '285px',
    top: '405px',
    right: 0,
    '@media (min-width: 900px)': {
      width: '906px',
    },
  },
  NCICommunityLinkContainer: {
    position: 'absolute',
    width: '10px',
    height: '10px',
    margin: 'auto',
    left: '120px',
    top: '225px',
    right: 0,
    '@media (min-width: 900px)': {
      width: '906px',
    },
  },
  AvailableOutputsImgContainer: {
    position: 'absolute',
    width: '10px',
    height: '10px',
    margin: 'auto',
    left: '465px',
    top: '290px',
    right: 0,
    '@media (min-width: 900px)': {
      width: '906px',
    },
  },
  AvailableOutputsLinkContainer: {
    position: 'absolute',
    width: '10px',
    height: '10px',
    margin: 'auto',
    left: '565px',
    top: '205px',
    right: 0,
    '@media (min-width: 900px)': {
      width: '906px',
    },
  },
  UpdatedMetricsImgContainer: {
    position: 'absolute',
    width: '10px',
    height: '10px',
    margin: 'auto',
    left: '480px',
    top: '510px',
    right: 0,
    '@media (min-width: 900px)': {
      width: '906px',
    },
  },
  UpdatedMetricsLinkContainer: {
    position: 'absolute',
    width: '10px',
    height: '10px',
    margin: 'auto',
    left: '625px',
    top: '515px',
    right: 0,
    '@media (min-width: 900px)': {
      width: '906px',
    },
  },
  arrowCommunityImgContainer: {
    position: 'absolute',
    width: '10px',
    height: '10px',
    margin: 'auto',
    left: '280px',
    top: '230px',
    right: 0,
    '@media (min-width: 900px)': {
      width: '906px',
    },
  },
  arrowOutputsImgContainer: {
    position: 'absolute',
    width: '10px',
    height: '10px',
    margin: 'auto',
    left: '510px',
    top: '210px',
    right: 0,
    '@media (min-width: 900px)': {
      width: '906px',
    },
  },
  arrowMetricsImgContainer: {
    position: 'absolute',
    width: '10px',
    height: '10px',
    margin: 'auto',
    left: '580px',
    top: '500px',
    right: 0,
    '@media (min-width: 900px)': {
      width: '906px',
    },
  },
  heroTextWrapper: {
    width: '360px',
  },
  buttonText: {
    padding: '0px 30px 12px 0px',
    height: '40px',
  },
  iconTextWrapper: {
    width: '165px',
  },
  iconTitle: {
    fontFamily: 'Inter, Raleway, sans-serif',
    fontSize: '20px',
    fontWeight: '900',
    color: '#C0BEBD',
    letterSpacing: '-0px',
    textAlign: 'center',
  },
  iconContent: {
    color: '#C0BEBD',
    fontFamily: 'Lato, Raleway',
    fontSize: '16px',
    fontWeight: '300',
    lineHeight: '15px',
    marginTop: '5px',
    textAlign: 'center',
  },
});
export default withStyles(styles, { withTheme: true })(LandingView);
