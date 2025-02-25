import React, { useState } from 'react';
import {
  Container,
  Grid,
  Typography,
  Button,
  Link,
  withStyles,
} from '@material-ui/core';
import ReactHtmlParser from 'html-react-parser';
import { cn } from '@bento-core/util';
import icon from '../../assets/icons/Datasets.svg';
import {
  externalLinkIcon,
} from '../../bento/datasetDetailData';

const DataSetDetailView = ({
  classes, data,
}) => {
  const descMaxLength = 9999999;
  const [expanded, setExpanded] = useState(false);

  // Function to toggle "Read More" and "Read Less"
  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  // Truncate description to 948 characters if not expanded
  const truncatedDescription = data.description && data.description.length > descMaxLength
    ? `${data.description.substring(0, descMaxLength)}...`
    : data.description;

  // Utility to add space after semicolons
  const formatSemicolonSeparatedString = (str) => str.split(';').map((item) => item.trim()).join('; ');

  return (
    <Container className={classes.mainContainer}>
      <Grid container spacing={2} alignItems="center" justify="space-between" className={classes.nav}>
        <Grid item>
          <Link href="#datasets" className={classes.navLink}>
            Explore Datasets
          </Link>
          {'    '}
          {'>'}
          {'    '}
          {data.dataset_title || ''}
        </Grid>
      </Grid>
      <div className={classes.container}>
        <div className={classes.innerContainer}>
          <div className={classes.header}>
            <div className={classes.logo}>
              <img
                src={icon}
                alt="INS datasets logo"
              />
            </div>
            <div className={classes.headerTitle}>
              <div className={classes.headerMainTitle} id="program_detail_title">
                <span>
                  Dataset:
                  {' '}
                  {formatSemicolonSeparatedString(data.dataset_title || '')}
                </span>
              </div>
              <div className={cn(classes.headerMSubTitle,
                classes.headerSubTitleCate, classes.link)}
              >
                <Link href={data.dbGaP_URL} target="_blank" className={classes.link}>
                  dbGaP:
                  {' '}
                  {data.dbGaP_phs || ''}
                  <img
                    src={externalLinkIcon.src}
                    alt={externalLinkIcon.alt}
                    className={classes.externalLinkIcon}
                  />
                </Link>
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
              {expanded ? ReactHtmlParser(data.description) : ReactHtmlParser(truncatedDescription) || ''}
              {' '}
              {data.description && data.description.length > descMaxLength && (
                <Button onClick={toggleExpand} color="primary" className={classes.link}>
                  {expanded ? '' : 'Read More'}
                </Button>
              )}
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
                <Link href={data.dbGaP_URL} target="_blank" className={classes.link}>
                  dbGaP:
                  {' '}
                  {data.dbGaP_phs || ''}
                  <img
                    src={externalLinkIcon.src}
                    alt={externalLinkIcon.alt}
                    className={classes.externalLinkIcon}
                  />
                </Link>

              </Typography>
              <Typography variant="body2" className={classes.subTitle}>
                <strong>NCI Division/Office/Center  </strong>
              </Typography>
              <Typography variant="body2" className={classes.text}>
                {formatSemicolonSeparatedString(data.dataset_doc || '')}
              </Typography>
              <Typography variant="body2" className={classes.subTitle}>
                <strong>Release Date </strong>
              </Typography>
              <Typography variant="body2" className={classes.text}>
                {formatSemicolonSeparatedString(data.release_date || '')}
              </Typography>
              <Typography variant="body2" className={classes.subTitle}>
                <strong>Principal Investigator(s) </strong>
              </Typography>
              <Typography variant="body2" className={classes.text}>
                {formatSemicolonSeparatedString(data.PI_name || '')}
              </Typography>
              <Typography variant="body2" className={classes.subTitle}>
                <strong>Funding Source(s) </strong>
              </Typography>
              <Typography variant="body2" className={classes.text}>
                {formatSemicolonSeparatedString(data.funding_source || '')}
              </Typography>
              <Typography variant="body2" className={classes.subTitle}>
                <strong>Cited Publication PMID(s) </strong>
              </Typography>
              <Typography variant="body2" className={classes.text}>
                {data.dataset_pmid ? (
                  data.dataset_pmid.split(';').map((pmid, index) => {
                    const trimmedPmid = pmid.trim();

                    // Check if the value is not an empty string and is numeric
                    const isNumeric = trimmedPmid !== '' && !Number.isNaN(Number(trimmedPmid));

                    return (
                      <span key={index}>
                        {isNumeric ? (
                          <Link
                            href={`https://pubmed.ncbi.nlm.nih.gov/${trimmedPmid}/`}
                            target="_blank"
                            className={classes.link}
                          >
                            {trimmedPmid}
                            <img
                              src={externalLinkIcon.src}
                              alt={externalLinkIcon.alt}
                              className={classes.externalLinkIcon}
                            />
                          </Link>
                        ) : (
                          <span>{trimmedPmid}</span>
                        )}
                        {index < data.dataset_pmid.split(';').length - 1 && '; '}
                        {index < data.dataset_pmid.split(';').length - 1 && ' '}
                      </span>
                    );
                  })
                ) : (
                  ''
                )}
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
                  {formatSemicolonSeparatedString(data.study_type || '')}
                </Typography>

                <Typography variant="body2" className={classes.subTitle}>
                  <strong>Limitations for Reuse </strong>
                </Typography>
                <Typography variant="body2" className={classes.text}>
                  {formatSemicolonSeparatedString(data.limitations_for_reuse || '')}
                </Typography>
                <Typography variant="body2" className={classes.subTitle}>
                  <strong>Assay Method </strong>
                </Typography>
                <Typography variant="body2" className={classes.text}>
                  {formatSemicolonSeparatedString(data.assay_method || '')}
                </Typography>
                <Typography variant="body2" className={classes.subTitle}>
                  <strong>Participant Count</strong>
                </Typography>
                <Typography variant="body2" className={classes.text}>
                  {data.participant_count || ''}
                </Typography>
                <Typography variant="body2" className={classes.subTitle}>
                  <strong>Sample Count </strong>
                </Typography>
                <Typography variant="body2" className={classes.text}>
                  {data.sample_count || ''}
                </Typography>

              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="body2" className={classes.subTitle}>
                  <strong>Primary Disease </strong>
                </Typography>
                <Typography variant="body2" className={classes.text}>
                  {formatSemicolonSeparatedString(data.primary_disease || '')}
                </Typography>
                <Typography variant="body2" className={classes.subTitle}>
                  <strong>Related Genes </strong>
                </Typography>
                <Typography variant="body2" className={classes.text}>
                  {formatSemicolonSeparatedString(data.related_genes || '')}
                </Typography>
                <Typography variant="body2" className={classes.subTitle}>
                  <strong>Related Diseases </strong>
                </Typography>
                <Typography variant="body2" className={classes.text}>
                  {formatSemicolonSeparatedString(data.related_diseases || '')}
                </Typography>
                <Typography variant="body2" className={classes.subTitle}>
                  <strong>Related Terms </strong>
                </Typography>
                <Typography variant="body2" className={classes.text}>
                  {formatSemicolonSeparatedString(data.related_terms || '')}
                </Typography>

                <Typography variant="body2" className={classes.subTitle}>
                  <strong>Study Link(s) </strong>
                </Typography>
                {data.study_links && data.study_links.length > 0 ? (
                  data.study_links.split(';').map((link, index) => (
                    <Typography variant="body2" className={classes.text} key={index}>
                      <Link href={link} target="_blank" className={classes.link}>
                        {link}
                        <img
                          src={externalLinkIcon.src}
                          alt={externalLinkIcon.alt}
                          className={classes.externalLinkIcon}
                        />
                      </Link>
                    </Typography>
                  ))
                ) : (
                  <Typography variant="body2" className={classes.text}>
                    {' '}
                  </Typography>
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
};

const styles = (theme) => ({
  mainContainer: {
    paddingTop: '10px',
    background: '#FFFF',
    maxWidth: '100%',
  },
  externalLinkIcon: {
    width: '16px',
    verticalAlign: 'sub',
    marginLeft: '4px',
  },
  nav: {
    color: '#1B1B1B',
    fontFamily: 'Public Sans',
    paddingLeft: '32px',
    paddingRight: '32px',
    fontSize: '16px',
    fontWeight: '400',
    lineHeight: '26px',
    textAlign: 'left',
  },
  navLink: {
    color: '#005EA2',
    fontFamily: 'Public Sans',
    fontSize: '16px',
    fontWeight: '400',
    lineHeight: '26px',
    textDecoration: 'underline solid',
  },
  link: {
    color: '#571AFF',
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
    width: '100%',
  },
  headerTitle: {
    margin: 'auto',
    float: 'left',
    marginLeft: '95px',
    marginTop: '18px',
  },
  headerMainTitle: {
    '& > span': {
      fontWeight: '400',
      letterSpacing: '0.017em',
    },
    '& > span > span': {
      fontWeight: '600',
      letterSpacing: '0.025em',
    },
    fontFamily: 'Inter',
    letterSpacing: '0.025em',
    color: '#274FA5 ',
    fontSize: '26px',
    lineHeight: '30px',
    paddingLeft: '0px',
  },
  headerSubTitleCate: {
    color: '#5A656A',
    fontWeight: '400',
    fontFamily: 'Nunito',
    letterSpacing: '0.023em',
    fontSize: '16px',
    overflow: 'hidden',
    lineHeight: '25px',
    paddingLeft: '2px',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    paddingRight: '200px',
  },
  headerMSubTitle: {
    paddingBottom: '3px',
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
    minHeight: '25px',
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
