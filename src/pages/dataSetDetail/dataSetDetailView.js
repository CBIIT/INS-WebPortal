import React from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Link,
  withStyles,
} from '@material-ui/core';
import { cn } from '@bento-core/util';
import icon from '../../assets/icons/dataset_icon.png';
import {
  externalLinkIcon,
} from '../../bento/datasetDetailData';

const DataSetDetailView = ({
  classes, data,
}) => (
  <Container className={classes.mainContainer}>
    <Grid container spacing={2} alignItems="center" justify="space-between" className={classes.nav}>
      <Grid item>
        <Link href="#datasets">
          Explore Dataset
          {' '}
          {' '}
          >
        </Link>
        {' '}
        {' '}
        {' '}
        {data.dataset_title || ''}
      </Grid>
    </Grid>
    <div className={classes.container}>
      <div className={classes.innerContainer}>
        <div className={classes.header}>
          <div className={classes.logo}>
            <img
              src={icon}
              alt="dataset header icon"
            />
          </div>
          <div className={classes.headerTitle}>
            <div className={classes.headerMainTitle} id="program_detail_title">
              <span>
                Dataset:
                {data.dataset_title || ''}
              </span>
            </div>
            <div className={cn(classes.headerMSubTitle, classes.headerSubTitleCate)}>
              <span id="program_detail_subtile">
                dbGaP:
                {' '}
                {data.dbGaP_phs || ''}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className={classes.studyContainer}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6" component="h2" className={classes.studyHeader}>
            Study Description
          </Typography>
          <Typography variant="body1" paragraph className={classes.studyContent}>
            {data.description || ''}
            {' '}
            <Link href="#datasets" color="primary">
              Read More
            </Link>
          </Typography>

        </Grid>
      </Grid>
    </div>
    <div className={classes.basicInformationContainer}>
      <Grid container spacing={4}>
        {/* Basic Information */}
        <Grid item xs={12} md={4} className={cn(classes.space, classes.borderRight)}>
          <Typography variant="h2" className={classes.title}>Basic Information</Typography>
          <div className={classes.subSection}>
            <Typography variant="body2" className={classes.subTitle}>
              <strong>Study Page </strong>
            </Typography>
            <Typography variant="body2" className={classes.text}>
              <Link href={data.dbGaP_URL} target="_blank">
                dbGaP:
                {data.dbGaP_phs || ''}
                <img
                  src={externalLinkIcon.src}
                  alt={externalLinkIcon.alt}
                  className={classes.externalLinkIcon}
                />
              </Link>

            </Typography>
            <Typography variant="body2" className={classes.subTitle}>
              <strong>NCI Division/Office/Center (DOC): </strong>
            </Typography>
            <Typography variant="body2" className={classes.text}>
              {data.dataset_doc || ''}
            </Typography>
            <Typography variant="body2" className={classes.subTitle}>
              <strong>Release Date: </strong>
            </Typography>
            <Typography variant="body2" className={classes.text}>
              {data.release_date || ''}
            </Typography>
            <Typography variant="body2" className={classes.subTitle}>
              <strong>Principal Investigator(s): </strong>
            </Typography>
            <Typography variant="body2" className={classes.text}>
              {data.PI_name || ''}
            </Typography>
            <Typography variant="body2" className={classes.subTitle}>
              <strong>Funding Source(s): </strong>
            </Typography>
            <Typography variant="body2" className={classes.text}>
              {data.funding_source || ''}
            </Typography>
            <Typography variant="body2" className={classes.subTitle}>
              <strong>Cited Publication PMID(s): </strong>
            </Typography>
            <Typography variant="body2" className={classes.text}>
              {data.dataset_pmid || ''}
            </Typography>
          </div>
        </Grid>
        <div className={classes.divder} />
        <Grid item xs={12} md={8} className={classes.space}>
          <Typography variant="h6" className={classes.title}>Data Details</Typography>
          <Grid container className={classes.subSection}>
            <Grid item xs={12} md={6}>
              <Typography variant="body2" className={classes.subTitle}>
                <strong>Study Type </strong>
              </Typography>
              <Typography variant="body2" className={classes.text}>
                {data.study_type || ''}
              </Typography>

              <Typography variant="body2" className={classes.subTitle}>
                <strong>Limitations for Reuse </strong>
              </Typography>
              <Typography variant="body2" className={classes.text}>
                {data.limitations_for_reuse || ''}
              </Typography>
              <Typography variant="body2" className={classes.subTitle}>
                <strong>Assay Method </strong>
              </Typography>
              <Typography variant="body2" className={classes.text}>
                {data.assay_method || ''}
              </Typography>
              <Typography variant="body2" className={classes.subTitle}>
                <strong>Participant Count; Sample Count </strong>
              </Typography>
              <Typography variant="body2" className={classes.text}>
                {data.participant_count || ''}
              </Typography>

            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body2" className={classes.subTitle}>
                <strong>Primary Disease </strong>
              </Typography>
              <Typography variant="body2" className={classes.text}>
                {data.primary_disease || ''}
              </Typography>
              <Typography variant="body2" className={classes.subTitle}>
                <strong>Related Genes </strong>
              </Typography>
              <Typography variant="body2" className={classes.text}>
                {data.related_genes || ''}
              </Typography>
              <Typography variant="body2" className={classes.subTitle}>
                <strong>Related Diseases </strong>
              </Typography>
              <Typography variant="body2" className={classes.text}>
                {data.related_diseases || ''}
              </Typography>
              <Typography variant="body2" className={classes.subTitle}>
                <strong>Related Terms </strong>
              </Typography>
              <Typography variant="body2" className={classes.text}>
                {data.related_terms || ''}
              </Typography>

              <Typography variant="body2" className={classes.subTitle}>
                <strong>Study Link(s) </strong>
              </Typography>
              {data.study_links && data.study_links.length > 0 ? (
                data.study_links.map((link, index) => (
                  <Typography variant="body2" className={classes.text} key={index}>
                    <Link href={link} target="_blank">
                      {link}
                    </Link>
                  </Typography>
                ))
              ) : (
                ''
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
    <div className={classes.additionalContainer}>
      <Grid container spacing={2}>
        <Grid item xs={12} className={classes.space}>
          <Typography variant="h6" className={classes.title}>Additional Details Coming Soon</Typography>
          <div className={classes.subSection}>
            <Typography variant="body2" className={classes.subTitle}>
              <strong>Participant/Sample Details </strong>
            </Typography>
            <Typography variant="body2" className={classes.text}>
              This information is coming soon.
            </Typography>

            <Typography variant="body2" className={classes.subTitle}>
              <strong>Data Details </strong>
            </Typography>
            <Typography variant="body2" className={classes.text}>
              This information is coming soon.
            </Typography>
            <Typography variant="body2" className={classes.subTitle}>
              <strong>Program(s) </strong>
            </Typography>
            <Typography variant="body2" className={classes.text}>
              This information is coming soon.
            </Typography>
          </div>
        </Grid>
      </Grid>
    </div>
  </Container>
);
const styles = (theme) => ({
  mainContainer: {
    paddingTop: '10px',
    background: '#FFFF',
  },
  externalLinkIcon: {
    width: '16px',
    verticalAlign: 'sub',
    marginLeft: '4px',
  },
  nav: {
    paddingLeft: '32px',
    paddingRight: '32px',
  },
  container: {
    paddingTop: '30px',
    fontFamily: theme.custom.fontFamily,
    paddingLeft: '32px',
    paddingRight: '32px',
    background: '#FFFF',
    paddingBottom: '16px',
  },
  innerContainer: {
    padding: '0 ',
    fontFamily: theme.custom.fontFamily,
    background: '#FFFFFF',
  },
  header: {
    paddingLeft: '21px',
    paddingRight: '35px',
    borderBottom: '#4B619A 10px solid',
    height: 'fit-content',
    margin: 'auto',
    display: 'inline-block',

  },
  headerTitle: {
    margin: 'auto',
    float: 'left',
    marginLeft: '95px',
    marginTop: '18px',
  },
  headerMainTitle: {
    '& > span': {
      fontWeight: '300',
      letterSpacing: '0.017em',
    },
    '& > span > span': {
      fontWeight: 'bold',
      letterSpacing: '0.025em',
    },
    fontFamily: 'Lato',
    letterSpacing: '0.025em',
    color: '#274FA5 ',
    fontSize: '26px',
    lineHeight: '24px',
    paddingLeft: '0px',
  },
  headerSubTitleCate: {
    color: '#00B0BD',
    fontWeight: '300',
    fontFamily: 'Poppins',
    textTransform: 'uppercase',
    letterSpacing: '0.023em',
    fontSize: '15px',
    overflow: 'hidden',
    lineHeight: '24px',
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
    marginTop: '9px',
    width: '107px',
    filter: 'drop-shadow(24px 22px 7px rgba(27,28,28,0.29))',
  },
  studyContainer: {
    marginTop: '30px',
    fontFamily: 'Nunito',
    fontSize: '15px',
    fontWeight: '700',
    lineHeight: ' 19px',
    textAlign: 'left',
    marginLeft: '32px',
    background: '#FFFF',
    paddingBottom: '50px',
    borderBottom: '3px solid #7D91C4',
    wordBreak: 'normal',
  },

  studyHeader: {
    fontFamily: 'Inter',
    fontSize: '19px',
    fontWeight: 400,
    lineHeight: '20px',
    textAlign: 'left',
    textTransform: 'uppercase',
    padding: '0 0 10px 0',
    color: '#3478A5',
    paddingLeft: '15px',
    paddingRight: '15px',

  },
  borderRight: {
    borderRight: '1px solid #B0D7E6',
  },
  studyContent: {
    paddingLeft: '15px',
    paddingRight: '15px',
  },

  basicInformationContainer: {
    marginTop: '40px',
    fontFamily: 'Nunito',
    fontSize: '15px',
    fontWeight: '700',
    lineHeight: ' 19px',
    textAlign: 'left',
    marginLeft: '32px',
    background: '#FFFF',
    paddingBottom: '20px',
    wordBreak: 'normal',
    borderBottom: '3px solid #7D91C4',

  },
  subTitle: {
    fontFamily: 'Inter',
    fontSize: '16px',
    fontWeight: 600,
    lineHeight: '20px',
    textAlign: 'left',
    color: '#1C58A1',
    paddingTop: '10px',

  },
  title: {
    // styleName: INS Text Library/H3;
    fontFamily: 'Inter',
    fontSize: '19px',
    fontWeight: 400,
    lineHeight: '20px',
    color: '#3478A5',
  },

  subSection: {
    padding: '25px 15px',
  },
  text: {
    padding: '0 10px 0 0',
    wordWrap: 'break-word',
  },
  additionalContainer: {
    marginTop: '40px',
    fontFamily: 'Nunito',
    fontSize: '15px',
    fontWeight: '700',
    lineHeight: ' 19px',
    textAlign: 'left',
    marginLeft: '32px',
    background: '#FFFF',
    paddingBottom: '60px',
    wordBreak: 'normal',
  },
  space: {
    padding: ' 0 32px !important',
    margin: '16px 0',
  },
});

export default withStyles(styles, { withTheme: true })(DataSetDetailView);
