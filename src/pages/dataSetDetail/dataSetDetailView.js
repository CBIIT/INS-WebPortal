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
        Genome-wide Pleiotropy Scan across Multiple Cancers
      </Grid>
    </Grid>

    {/* Header */}

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
                Dataset: Genome-wide Pleiotropy Scan across Multiple Cancers
              </span>
            </div>
            <div className={cn(classes.headerMSubTitle, classes.headerSubTitleCate)}>
              <span id="program_detail_subtile">
                dbGaP: phs002809
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Study Description */}
    <div className={classes.studyContainer}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6" component="h2" className={classes.studyHeader}>
            Study Description
          </Typography>
          <Typography variant="body1" paragraph className={classes.studyContent}>
            A whole-exome sequencing
            (WES) study was conducted in
            3,233 cases diagnosed with multiple
            primary cancers and 3,229 matched
            cancer-free controls (90% non-Hispanic
            white, 3% African-American,
            3% East Asian, and 4% Latino)
            selected from individuals in the
            Kaiser Permanente Research Bank (KPRB)
            who were members of the Kaiser
            Permanente Northern California (KPNC) health plan...
            {' '}
            <Link href="#datasets" color="primary">
              Read More
            </Link>
          </Typography>

        </Grid>
      </Grid>
    </div>
    {/* Basic Information and Data Details */}
    <div className={classes.basicInformationContainer}>
      <Grid container spacing={4}>
        {/* Basic Information */}
        <Grid item xs={12} md={4} className={cn(classes.space, classes.borderRight)}>
          <Typography variant="h2" className={classes.title}>Basic Information</Typography>
          <div className={classes.subSection}>
            <Typography variant="body2" className={classes.subTitle}>
              <strong>Study Page: </strong>
            </Typography>
            <Typography variant="body2" className={classes.text}>
              <Link href="https://dbGaP link" target="_blank">
                dbGaP: phs002809
              </Link>
            </Typography>
            <Typography variant="body2" className={classes.subTitle}>
              <strong>NCI Division/Office/Center (DOC): </strong>
            </Typography>
            <Typography variant="body2" className={classes.text}>
              DCB
            </Typography>
            <Typography variant="body2" className={classes.subTitle}>
              <strong>Release Date: </strong>
            </Typography>
            <Typography variant="body2" className={classes.text}>
              10/3/2022
            </Typography>
            <Typography variant="body2" className={classes.subTitle}>
              <strong>Principal Investigator(s): </strong>
            </Typography>
            <Typography variant="body2" className={classes.text}>
              John Witte
            </Typography>
            <Typography variant="body2" className={classes.subTitle}>
              <strong>Funding Source(s): </strong>
            </Typography>
            <Typography variant="body2" className={classes.text}>
              CA201358
            </Typography>
            <Typography variant="body2" className={classes.subTitle}>
              <strong>Cited Publication PMID(s): </strong>
            </Typography>
            <Typography variant="body2" className={classes.text}>
              33087929; 36199081
            </Typography>
          </div>
        </Grid>
        <div className={classes.divder} />
        {/* Data Details */}
        <Grid item xs={12} md={8} className={classes.space}>
          <Typography variant="h6" className={classes.title}>Data Details</Typography>
          <Grid container className={classes.subSection}>
            <Grid item xs={12} md={6}>
              <Typography variant="body2" className={classes.subTitle}>
                <strong>Study Type </strong>
              </Typography>
              <Typography variant="body2" className={classes.text}>
                Case-Control; Exome Sequencing; Individual-Level Genomic Data; Prospective
              </Typography>

              <Typography variant="body2" className={classes.subTitle}>
                <strong>Limitations for Reuse </strong>
              </Typography>
              <Typography variant="body2" className={classes.text}>
                HMB-IRB-NPU
              </Typography>
              <Typography variant="body2" className={classes.subTitle}>
                <strong>Assay Method </strong>
              </Typography>
              <Typography variant="body2" className={classes.text}>
                WES
              </Typography>
              <Typography variant="body2" className={classes.subTitle}>
                <strong>Participant Count; Sample Count </strong>
              </Typography>
              <Typography variant="body2" className={classes.text}>
                5432; 5432
              </Typography>

            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body2" className={classes.subTitle}>
                <strong>Primary Disease </strong>
              </Typography>
              <Typography variant="body2" className={classes.text}>
                Neoplasms, Multiple Primary
              </Typography>
              <Typography variant="body2" className={classes.subTitle}>
                <strong>Related Genes </strong>
              </Typography>
              <Typography variant="body2" className={classes.text}>
                PHF19; TP53; EZH2; CDKN1B ;PBX1
              </Typography>
              <Typography variant="body2" className={classes.subTitle}>
                <strong>Related Terms </strong>
              </Typography>
              <Typography variant="body2" className={classes.text}>
                Liver Neoplasms; Brain Neoplasms; Brain Tumor
              </Typography>

              <Typography variant="body2" className={classes.subTitle}>
                <strong>Study Link(s) </strong>
              </Typography>
              <Typography variant="body2" className={classes.text}>
                <Link href="https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=GSE270231" target="_blank">
                  https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=GSE270231
                </Link>
              </Typography>
              <Typography variant="body2" className={classes.text}>
                <Link href="https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=GSE270231" target="_blank">
                  https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=GSE270231
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
    {/* Additional Details Coming Soon */}
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
    maxWidth: '1340px',
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
    maxWidth: '1340px',
    padding: '0 ',
    fontFamily: theme.custom.fontFamily,
    background: '#FFFFFF',
  },
  header: {
    paddingLeft: '21px',
    paddingRight: '35px',
    borderBottom: '#4B619A 10px solid',
    height: '80px',
    maxWidth: '1340px',
    margin: 'auto',
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
