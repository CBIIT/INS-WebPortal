/* eslint-disable max-len */
import React, { useEffect } from 'react';
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
import './landingStyles.css';

let forwardAnimationReady = true;
let backwardAnimationReady = false;

const LandingView = ({ classes, statsData }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);

  const [showHover, setHoverState] = React.useState(false);

  function activateHover() {
    if (forwardAnimationReady) {
      forwardAnimationReady = false;
      setTimeout(() => {
        backwardAnimationReady = true;
      }, 500);
      setHoverState(true);
    }
  }

  function deactivateHover() {
    if (backwardAnimationReady) {
      backwardAnimationReady = false;
      setTimeout(() => {
        forwardAnimationReady = true;
      }, 500);
      setHoverState(false);
    }
  }

  return (
    <>
      <div className={classes.disclaimer}>
        <p>
          This initial release of INS contains only a small subset of outputs.
        </p>
        <p>
          Please read our
          <Link to="/about" className={classes.aboutLink}>About page</Link>
          to learn about known data limitations.
        </p>
      </div>
      <div className={classes.page}>
        <div className={classes.container}>
          <Grid container spacing={16} direction="row">
            <div className={classes.heroImage} />
            <div className={classes.heroTextContainer}>
              <div className={classes.heroTextWrapper}>
                <div className={classes.headerTitle}>
                  {landingPageData.callToActionTitle}
                </div>
                <div className={classes.headerContent}>
                  As we work to improve this
                  <b>initial phase</b>
                  of the Index of NCI Studies (INS), please be aware that we currently gather outputs only from
                  <b>extramural grants</b>
                  to the
                  <b>Cancer Moonshot</b>
                  or
                  <b>Childhood Cancer Data Initiative</b>
                  (CCDI) programs. In addition, there may be some false positive connections between grants and outputs as we improve our automated collection and association processes. Read more on how we are tackling these challenges on the
                  <Link to="/about" className={classes.headerAboutLink}>About page</Link>
                  .
                </div>
                <div className={classes.headerButtonSection}>
                  <Link to={landingPageData.callToActionLink} className={classes.headerLinkButton}>
                    <Button className={classes.buttonText}>
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
            <div className="heroImageContainer">
              <div onMouseEnter={activateHover} onMouseLeave={deactivateHover} className={classes.hoverInteraction} />
              <img
                className={classes.bigImage}
                src={landingPageData.interactiveImg.img}
                alt={landingPageData.interactiveImg.alt}
                id="interactive_img"
              />
              <div className={classes.INSTextContainer}>
                <div className={classes.INSTitle}>
                  INS
                </div>
              </div>
              <div className={showHover ? 'NCICommunityBubbleContainerHover' : 'NCICommunityBubbleContainer'}>
                <img
                  className={classes.bubbleImage}
                  src={landingPageData.NCICommunityBubble.img}
                  alt={landingPageData.NCICommunityBubble.alt}
                  id="interactive_img"
                />
              </div>
              <div className={showHover ? 'NCICommunityImgContainerHover' : 'NCICommunityImgContainer'}>
                <img
                  className={classes.iconImage}
                  src={landingPageData.NCICommunityImg.img}
                  alt={landingPageData.NCICommunityImg.alt}
                  id="interactive_img"
                />
              </div>
              {showHover ? (
                <div className="NCICommunityLinkContainerHover">
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
              )
                : (
                  <div className="NCICommunityLinkContainer">
                    <div className={classes.headerLink}>
                      <div className={classes.iconTextWrapper}>
                        <div className={classes.iconTitle}>
                          {landingPageData.nciCommunityTitle}
                        </div>
                        <div className={classes.iconContent}>
                          {landingPageData.nciCommunityDescription}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              <div className={showHover ? 'AvailableOutputsBubbleContainerHover' : 'AvailableOutputsBubbleContainer'}>
                <img
                  className={classes.bubbleImage}
                  src={landingPageData.AvailableOutputsBubble.img}
                  alt={landingPageData.AvailableOutputsBubble.alt}
                  id="interactive_img"
                />
              </div>
              <div className={showHover ? 'AvailableOutputsImgContainerHover' : 'AvailableOutputsImgContainer'}>
                <img
                  className={classes.iconImage}
                  src={landingPageData.AvailableOutputsImg.img}
                  alt={landingPageData.AvailableOutputsImg.alt}
                  id="interactive_img"
                />
              </div>
              {showHover ? (
                <div className="AvailableOutputsLinkContainerHover">
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
              )
                : (
                  <div className="AvailableOutputsLinkContainer">
                    <div className={classes.headerLink}>
                      <div className={classes.iconTextWrapper}>
                        <div className={classes.iconTitle}>
                          {landingPageData.availableOutputsTitle}
                        </div>
                        <div className={classes.iconContent}>
                          {landingPageData.availableOutputsDescription}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              <div className={showHover ? 'UpdatedMetricsBubbleContainerHover' : 'UpdatedMetricsBubbleContainer'}>
                <img
                  className={classes.bubbleImage}
                  src={landingPageData.UpdatedMetricsBubble.img}
                  alt={landingPageData.UpdatedMetricsBubble.alt}
                  id="interactive_img"
                />
              </div>
              <div className={showHover ? 'UpdatedMetricsImgContainerHover' : 'UpdatedMetricsImgContainer'}>
                <img
                  className={classes.iconImage}
                  src={landingPageData.UpdatedMetricsImg.img}
                  alt={landingPageData.UpdatedMetricsImg.alt}
                  id="interactive_img"
                />
              </div>
              {showHover ? (
                <>
                  <div className="UpdatedMetricsLinkContainerHover">
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
                  <div className="arrowCommunityImgContainerHover">
                    <img
                      className={classes.iconImage}
                      src={landingPageData.arrowCommunityImg.img}
                      alt={landingPageData.arrowCommunityImg.alt}
                      id="interactive_img"
                    />
                  </div>
                  <div className="arrowOutputsImgContainerHover">
                    <img
                      className={classes.iconImage}
                      src={landingPageData.arrowOutputsImg.img}
                      alt={landingPageData.arrowOutputsImg.alt}
                      id="interactive_img"
                    />
                  </div>
                  <div className="arrowMetricsImgContainerHover">
                    <img
                      className={classes.iconImage}
                      src={landingPageData.arrowMetricsImg.img}
                      alt={landingPageData.arrowMetricsImg.alt}
                      id="interactive_img"
                    />
                  </div>
                </>
              )
                : (
                  <>
                    <div className="UpdatedMetricsLinkContainer">
                      <div className={classes.headerLink}>
                        <div className={classes.iconTextWrapper}>
                          <div className={classes.iconTitle}>
                            {landingPageData.updatedMetricsTitle}
                          </div>
                          <div className={classes.iconContent}>
                            {landingPageData.updatedMetricsDescription}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="arrowCommunityImgContainer">
                      <img
                        className={classes.iconImage}
                        src={landingPageData.arrowCommunityImg.img}
                        alt={landingPageData.arrowCommunityImg.alt}
                        id="interactive_img"
                      />
                    </div>
                    <div className="arrowOutputsImgContainer">
                      <img
                        className={classes.iconImage}
                        src={landingPageData.arrowOutputsImg.img}
                        alt={landingPageData.arrowOutputsImg.alt}
                        id="interactive_img"
                      />
                    </div>
                    <div className="arrowMetricsImgContainer">
                      <img
                        className={classes.iconImage}
                        src={landingPageData.arrowMetricsImg.img}
                        alt={landingPageData.arrowMetricsImg.alt}
                        id="interactive_img"
                      />
                    </div>
                  </>
                )}
            </div>
          </Grid>
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
                        <Button
                          to="#"
                          className={classes.yellowButtonSupport}
                          onClick={(e) => {
                            window.location.href = 'mailto:nciofficeofdatasharing@mail.nih.gov?Subject=Index%20of%20NCI%20Studies%20feedback';
                            e.preventDefault();
                          }}
                        >
                          {landingPageData.tile3.callToActionText}
                        </Button>
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
    </>
  );
};

const styles = () => ({
  disclaimer: {
    position: 'fixed',
    // top: '139px',
    top: '306px',
    left: '0px',
    height: '47px',
    backgroundColor: '#b31d3d',
    width: '100%',
    zIndex: '999',
    textAlign: 'center',
    color: 'white',
    fontSize: '14px',
    fontFamily: 'Nunito',
    fontWeight: '500',
    paddingTop: '8px',

    '& p': {
      margin: '0px',
      lineHeight: '16px',
    },
  },
  aboutLink: {
    fontWeight: '800',
    color: 'white',
    padding: '5px',
  },
  page: {
    // marginTop: '-47px',
    marginTop: '120px',
  },
  heroImage: {
    width: '100%',
    height: '567px',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% 100%',
    backgroundImage: `url(${landingPageData.landingPageHero.img})`,
  },
  texture: {
    backgroundSize: 'cover',
    background: '#9D0995',
    padding: '350px 0 80px 0',
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
    fontFamily: 'Inter',
    fontSize: '40px',
    fontWeight: '800',
    lineHeight: '34px',
    color: '#000000',
    letterSpacing: '-0px',
  },
  paddingLeft50: {
    paddingLeft: '50px',
  },
  headerContent: {
    color: '#000000',
    fontFamily: 'Nunito',
    fontSize: '16px',
    fontWeight: '500',
    lineHeight: '20px',
    marginTop: '40px',
    marginBottom: '26px',

    '& b': {
      margin: '0px 5px',
    },
  },
  headerAboutLink: {
    fontWeight: '800',
    color: 'inherit',
    padding: '5px 0px 5px 5px',
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
    width: '21px',
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
    fontSize: '26px',
    textTransform: 'capitalize',
    lineHeight: '30px',
    padding: '23px 110px 26px 30px',
    fontFamily: 'Inter',
  },
  landingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentLeft: {
    float: 'left',
    paddingRight: '15px',
  },
  about: {
    width: '300px',
    backgroundColor: 'white',
  },
  bubbleImage: {
    width: '170px',
    height: '170px',
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
    marginTop: '-375px',
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
    height: '76px',
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
    fontSize: '14px',
    fontFamily: 'Raleway',
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
    paddingTop: '10px',
    minHeight: '138px',
  },
  contentHeader: {
    color: '#20506A',
    fontFamily: 'Inter',
    fontSize: '26px',
    lineHeight: '30px',
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
    padding: '0 15px 6.8px 0px',
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
    width: '602px',
    background: '#fff',
    backgroundImage: `url(${landingPageData.tile4.img})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    marginTop: '5px',
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
  yellowButton: {
    height: '45px',
    background: '#DDA211',
    color: '#FFFFFF',
    fontFamily: 'Raleway',
    fontSize: '14px',
    fontWeight: '600',
    lineHeight: '25px',
    paddingLeft: '8px',
    textDecoration: 'none',
    letterSpacing: '1px',
  },
  yellowButtonSupport: {
    color: '#FFFFFF',
    fontFamily: 'Raleway',
    fontSize: '14px',
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
    fontFamily: 'Inter',
    fontSize: '26px',
    fontWeight: 'bold',
    lineHeight: '30px',
    padding: '15px 15px 15px 0px',
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
    width: '21px',
    marginTop: '12px',
    marginLeft: '28px',
  },
  mountainMeadowButton: {
    padding: '15px 5px 0 0',
    height: '9px',
    width: '71px',
    color: '#FFFFFF',
    fontFamily: 'Raleway',
    fontSize: '14px',
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
    width: '1200px',
    height: '1200px',
    margin: 'auto',
    right: 0,
    // top: '147px',
    top: '314px',
    left: 0,
    '@media (min-width: 900px)': {
      width: '906px',
    },
  },
  hoverInteraction: {
    width: '425px',
    height: '375px',
    backgroundColor: 'blue',
    position: 'relative',
    top: '230px',
    left: '227px',
    zIndex: '1',
    opacity: '0',
    '&:hover': {
      backgroundColor: 'red',
    },
  },
  heroTextWrapper: {
    width: '420px',
  },
  buttonText: {
    fontFamily: 'Lato',
    fontWeight: 'bold',
    fontSize: '16px',
    lineHeight: '26px',
    padding: '0px 0px 12px 0px',
    height: '40px',
    color: '#A90532',
  },
  iconTextWrapper: {
    width: '165px',
  },
  iconTitle: {
    fontFamily: 'Lato',
    fontSize: '20px',
    fontWeight: '1000',
    color: '#AEABAB',
    letterSpacing: '-0px',
    textAlign: 'center',
    lineHeight: '34px',
  },
  iconContent: {
    color: '#404040',
    fontFamily: 'Inter',
    fontSize: '14px',
    fontWeight: '300',
    lineHeight: '17px',
    marginTop: '5px',
    textAlign: 'center',
  },
  headerLinkButton: {
    borderBottom: '2px solid #A90532',
    textDecoration: 'none',
  },
  INSTextContainer: {
    marginTop: '-460px',
    marginLeft: '-35px',
  },
  INSTitle: {
    fontSize: '50px',
    color: '#AEABAB',
    fontFamily: 'Lato',
    fontWeight: '1000',
    letterSpacing: '-0px',
    textAlign: 'center',
  },
});
export default withStyles(styles, { withTheme: true })(LandingView);
