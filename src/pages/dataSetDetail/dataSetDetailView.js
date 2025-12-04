/* eslint-disable max-len */
import React, { useState, useRef, useEffect } from 'react';
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
  externalLinkIcon, descMaxLength, basicInformationFields, dataDetailsFields, additionalDetailsFields, dummyResourceLinks,
} from '../../bento/datasetDetailData';
import resourceLinkDownloadIcon from '../../assets/icons/resourceLinkDownload.svg';
import helpIcon from '../../assets/icons/help.svg';

const DataSetDetailView = ({
  classes, data,
}) => {
  const [expandedDescription, setExpandedDescription] = useState(false);
  const [expandedExperimental, setExpandedExperimental] = useState(false);
  const [logoMarginTop, setLogoMarginTop] = useState(-16);
  const titleRef = useRef(null);

  const toggleExpandDescription = () => {
    setExpandedDescription(!expandedDescription);
  };

  const toggleExpandExperimental = () => {
    setExpandedExperimental(!expandedExperimental);
  };

  useEffect(() => {
    if (titleRef.current) {
      const titleHeight = titleRef.current.offsetHeight;
      const lineHeight = 30; // Based on lineHeight of headerMainTitle
      const numberOfLines = Math.round(titleHeight / lineHeight);

      // Base margin is -16px, add 30px for each additional line
      const newMargin = -16 + (Math.max(0, numberOfLines - 1) * 30);
      setLogoMarginTop(newMargin);
    }
  }, [data.dataset_title]);

  // Helper function to strip HTML tags
  const stripHtmlTags = (html) => {
    if (!html) return '';
    const tmp = document.createElement('DIV');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  // Helper function to normalize plain text to HTML paragraph format
  const normalizeDescriptionContent = (content) => {
    if (!content) return '';

    // Check if content already contains HTML paragraph tags
    const hasHtmlParagraphs = /<p[\s>]/i.test(content);

    if (hasHtmlParagraphs) {
      // Content already has proper HTML structure
      return content;
    }

    // Plain text detected - wrap in <p> tag to match HTML spacing
    return `<p>${content}</p>`;
  };

  // Get plain text version of description for truncation
  const plainDescription = stripHtmlTags(data.description);
  const truncatedDescription = plainDescription && plainDescription.length > descMaxLength
    ? `${plainDescription.substring(0, descMaxLength)}...`
    : plainDescription;

  const formatSemicolonSeparatedString = (str) => str.split(';').map((item) => item.trim()).join('; ');

  // Helper function to format text using textFormat array
  const formatTextFromArray = (textFormatArray) => {
    if (!textFormatArray || !Array.isArray(textFormatArray)) return '';

    return textFormatArray
      .map((item) => {
        if (item.type === 'datafield') {
          return data[item.text] || '';
        }
        if (item.type === 'string') {
          return item.text;
        }
        return '';
      })
      .join('');
  };

  return (
    <Container className={classes.mainContainer}>
      <div className={classes.contentContainer}>
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
              <div className={classes.logo} style={{ marginTop: `${logoMarginTop}px` }}>
                <img
                  src={icon}
                  alt="INS datasets logo"
                />
              </div>
              <div className={classes.headerTitle}>
                <div className={classes.headerMainTitle} id="dataset_detail_title" ref={titleRef}>
                  <span className={classes.datasetLabel}>Dataset:</span>
                  <span className={classes.datasetTitle}>
                    {formatSemicolonSeparatedString(data.dataset_title || '')}
                  </span>
                </div>
              </div>
            </div>
            <div className={classes.headerResourceContainer}>
              <span className={classes.subTitle}>Source Repository: </span>
              <span className={classes.repositoryName}>{data.dataset_source_repo || ''}</span>
              {data.dataset_source_url && (
                <Link href={data.dataset_source_url} target="_blank" className={cn(classes.subTitle, classes.externalResource)}>
                  View Dataset in External Resource
                  <img
                    src={externalLinkIcon.src}
                    alt={externalLinkIcon.alt}
                    className={classes.externalLinkIcon}
                  />
                </Link>
              )}
            </div>
            {dummyResourceLinks && (
              <div className={classes.headerResourceContainer}>
                <span className={classes.subTitle}>Download resource links: </span>
                <div className={classes.resourceLinksWrapper}>
                  {dummyResourceLinks.map((link) => (
                    <Link href={link.url} target="_blank" key={`resource-link-${link.name}`} className={classes.resourceLink}>
                      <span className={classes.resourceLinkText}>
                        {link.name}
                        <img
                          src={resourceLinkDownloadIcon}
                          alt="resource link download icon"
                          className={classes.resourceLinkIcon}
                        />
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className={classes.detailsContainer}>
          <div className={classes.contentSection}>
            <Typography variant="h6" component="h2" className={classes.studyHeader}>
              Study Description
            </Typography>
            <div className={classes.text}>
              {expandedDescription ? (
                <>
                  {ReactHtmlParser(normalizeDescriptionContent(data.description))}
                  {plainDescription && plainDescription.length > descMaxLength && (
                    <>
                      {' '}
                      <span
                        onClick={toggleExpandDescription}
                        onKeyDown={(e) => e.key === 'Enter' && toggleExpandDescription()}
                        role="button"
                        tabIndex={0}
                        className={classes.readMoreLink}
                      >
                        Show Less
                      </span>
                    </>
                  )}
                </>
              ) : (
                <p>
                  {truncatedDescription}
                  {plainDescription && plainDescription.length > descMaxLength && (
                    <>
                      {' '}
                      <span
                        onClick={toggleExpandDescription}
                        onKeyDown={(e) => e.key === 'Enter' && toggleExpandDescription()}
                        role="button"
                        tabIndex={0}
                        className={classes.readMoreLink}
                      >
                        Read More
                      </span>
                    </>
                  )}
                </p>
              )}
            </div>
            {true
            && (
            <>
              <Typography variant="h6" component="h2" className={classes.studyHeader} style={{ marginTop: '40px' }}>
                Experimental Approaches
              </Typography>
              <div className={classes.text}>
                {expandedExperimental ? (
                  <>
                    {ReactHtmlParser(normalizeDescriptionContent(data.description))}
                    {plainDescription && plainDescription.length > descMaxLength && (
                      <>
                        {' '}
                        <span
                          onClick={toggleExpandExperimental}
                          onKeyDown={(e) => e.key === 'Enter' && toggleExpandExperimental()}
                          role="button"
                          tabIndex={0}
                          className={classes.readMoreLink}
                        >
                          Show Less
                        </span>
                      </>
                    )}
                  </>
                ) : (
                  <p>
                    {truncatedDescription}
                    {plainDescription && plainDescription.length > descMaxLength && (
                      <>
                        {' '}
                        <span
                          onClick={toggleExpandExperimental}
                          onKeyDown={(e) => e.key === 'Enter' && toggleExpandExperimental()}
                          role="button"
                          tabIndex={0}
                          className={classes.readMoreLink}
                        >
                          Read More
                        </span>
                      </>
                    )}
                  </p>
                )}
              </div>
            </>
            )}
          </div>
          <div className={classes.contentSection}>
            <Typography variant="h6" component="h2" className={classes.studyHeader}>
              Basic Information
            </Typography>
            <Grid container spacing={4} className={classes.detailsGrid}>
              {basicInformationFields
                .filter((field) => !field.dynamic || (field.dynamic && data[field.datafield]))
                .map((field) => (
                  <Grid item xs={12} md={4} key={field.datafield}>
                    <div className={classes.subSection}>
                      <Typography variant="body2" className={classes.subTitle}>
                        {field.label}
                        {field.tooltip && (
                          <div className="tooltip-icon">
                            <img src={helpIcon} alt="tooltipIcon" />
                            <div className="tooltip-text-first">
                              <span className={classes.tooltipFont}>
                                {field.tooltip}
                              </span>
                            </div>
                          </div>
                        )}
                      </Typography>
                      <Typography variant="body2" className={classes.text}>
                        {field.isPMID && data[field.datafield] ? (
                          data[field.datafield].split(';').map((pmid, index) => {
                            const trimmedPmid = pmid.trim();
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
                                {index < data[field.datafield].split(';').length - 1 && '; '}
                                {index < data[field.datafield].split(';').length - 1 && ' '}
                              </span>
                            );
                          })
                        ) : field.isLink ? (
                          <Link href={data[field.datafield]} target="_blank" className={classes.link}>
                            {field.textFormat
                              ? formatTextFromArray(field.textFormat)
                              : field.linkTextField
                                ? (field.formatSemicolon ? formatSemicolonSeparatedString(data[field.linkTextField] || '') : data[field.linkTextField])
                                : (field.formatSemicolon ? formatSemicolonSeparatedString(data[field.datafield] || '') : data[field.datafield] || '')}
                            <img
                              src={externalLinkIcon.src}
                              alt={externalLinkIcon.alt}
                              className={classes.externalLinkIcon}
                            />
                          </Link>
                        ) : (
                          field.formatSemicolon
                            ? formatSemicolonSeparatedString(data[field.datafield] || '')
                            : data[field.datafield] || ''
                        )}
                      </Typography>
                    </div>
                  </Grid>
                ))}
            </Grid>
          </div>
          <div className={classes.contentSection}>
            <Typography variant="h6" component="h2" className={classes.studyHeader}>
              Data Details
            </Typography>
            <Grid container spacing={4} className={classes.detailsGrid}>
              {dataDetailsFields
                .filter((field) => {
                  if (field.isPaired) {
                    // Show if at least ONE paired field has a value
                    return data[field.datafield] || data[field.pairedField];
                  }
                  if (!field.dynamic) return true;
                  return data[field.datafield];
                })
                .map((field) => (
                  <Grid item xs={12} md={4} key={field.datafield}>
                    <div className={classes.subSection}>
                      <Typography variant="body2" className={classes.subTitle}>
                        {field.label}
                        {field.tooltip && (
                          <div className="tooltip-icon">
                            <img src={helpIcon} alt="tooltipIcon" />
                            <div className="tooltip-text-first">
                              <span className={classes.tooltipFont}>
                                {field.tooltip}
                              </span>
                            </div>
                          </div>
                        )}
                      </Typography>
                      <Typography variant="body2" className={classes.text}>
                        {field.isPaired ? (
                          // Render paired values (e.g., "min - max"), showing partial values if one is missing
                          `${data[field.datafield] || ''} - ${data[field.pairedField] || ''}`
                        ) : field.isMultiLink && data[field.datafield] ? (
                          // Render multiple links separated by semicolons
                          data[field.datafield].split(';').map((link, index) => (
                            <Typography variant="body2" className={classes.text} key={index}>
                              <Link
                                href={link.trim().startsWith('http') ? link.trim() : `https://${link.trim()}`}
                                target="_blank"
                                className={classes.link}
                              >
                                {link.trim()}
                                <img
                                  src={externalLinkIcon.src}
                                  alt={externalLinkIcon.alt}
                                  className={classes.externalLinkIcon}
                                />
                              </Link>
                            </Typography>
                          ))
                        ) : (
                          field.formatSemicolon
                            ? formatSemicolonSeparatedString(data[field.datafield] || '')
                            : data[field.datafield] || ''
                        )}
                      </Typography>
                    </div>
                  </Grid>
                ))}
            </Grid>
          </div>
          <div className={classes.contentSection}>
            <Typography variant="h6" component="h2" className={classes.studyHeader}>
              Additional Details Coming Soon
            </Typography>
            <Grid container spacing={4} className={classes.detailsGrid}>
              {additionalDetailsFields.map((field) => (
                <Grid item xs={12} md={4} key={field.label}>
                  <div className={classes.subSection}>
                    <Typography variant="body2" className={classes.subTitle}>
                      {field.label}
                    </Typography>
                    <Typography variant="body2" className={classes.text}>
                      {field.text}
                    </Typography>
                  </div>
                </Grid>
              ))}
            </Grid>
          </div>
        </div>
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
  contentContainer: {
    maxWidth: '1400px',
    margin: '0 auto',
  },
  externalLinkIcon: {
    width: '13px',
    marginLeft: '4px',
  },
  nav: {
    color: '#1B1B1B',
    fontFamily: 'Inter',
    paddingLeft: '32px',
    paddingRight: '32px',
    fontSize: '16px',
    fontWeight: '400',
    lineHeight: '26px',
    textAlign: 'left',
  },
  navLink: {
    color: '#005EA2',
    fontFamily: 'Inter',
    fontSize: '16px',
    fontWeight: '400',
    lineHeight: '26px',
    textDecoration: 'underline solid',
  },
  link: {
    color: '#571AFF',
  },
  readMoreLink: {
    color: '#571AFF',
    fontSize: '15px',
    fontWeight: 700,
    lineHeight: '19px',
    cursor: 'pointer',
    textTransform: 'uppercase',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  container: {
    paddingTop: '30px',
    fontFamily: theme.custom.fontFamily,
    paddingLeft: '32px',
    paddingRight: '32px',
    background: '#FFFF',
  },
  innerContainer: {
    padding: '0 ',
    fontFamily: theme.custom.fontFamily,
    background: '#FFFFFF',
  },
  header: {
    paddingLeft: '10px',
    paddingRight: '35px',
    borderBottom: '#4B619A 10px solid',
    height: 'fit-content',
    margin: 'auto',
    display: 'inline-block',
    width: '100%',
  },
  headerTitle: {
    margin: 'auto',
    marginLeft: '100px',
    marginTop: '18px',
  },
  headerMainTitle: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '10px',
    fontFamily: 'Inter',
    color: '#274FA5 ',
    fontSize: '26px',
    lineHeight: '30px',
    paddingBottom: '2px',
    letterSpacing: '0',
  },
  datasetLabel: {
    fontWeight: '400',
    flexShrink: 0,
  },
  datasetTitle: {
    fontWeight: '600',
    flex: 1,
    wordBreak: 'break-word',
  },
  logo: {
    position: 'absolute',
    float: 'left',
    width: '107px',
    filter: 'drop-shadow(10px 12px 8px rgba(27,28,28,0.29))',
  },
  headerResourceContainer: {
    width: '100%',
    background: '#E8F2F7',
    padding: '15px 110px',
    borderBottom: '1px solid #7D91C4',
  },
  repositoryName: {
    fontFamily: 'Inter',
    fontSize: '18px',
    fontWeight: '400',
    color: '#285C9B',
  },
  externalResource: {
    marginLeft: '50px',
    cursor: 'pointer',
  },
  resourceLinksWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '5px 11px',
  },
  resourceLink: {
    background: '#FFFFFF',
    border: '1px solid #4B619A',
    borderRadius: '20px',
    padding: '0px 10px',
    width: 'fit-content',
    height: '24px',
  },
  resourceLinkText: {
    fontFamily: 'Poppins',
    fontSize: '13px',
    fontWeight: '600',
    lineHeight: '19.31px',
    color: '#4B619A',
  },
  resourceLinkIcon: {
    width: '12px',
    height: '11px',
    marginLeft: '6px',
    verticalAlign: 'middle',
  },
  detailsContainer: {
    // Everything pushed in 32px to align with header sections
    padding: '0px 32px',
  },
  contentSection: {
    padding: '30px 110px',
    borderBottom: '1px solid #7D91C4',
    '&:last-child': {
      borderBottom: 'none',
      paddingBottom: '85px',
    },
  },
  detailsGrid: {
    marginTop: '12px',
  },
  studyHeader: {
    fontFamily: 'Inter',
    fontSize: '19px',
    fontWeight: 400,
    lineHeight: '20px',
    textTransform: 'uppercase',
    color: '#3478A5',
  },
  subTitle: {
    fontFamily: 'Inter',
    fontSize: '16px',
    fontWeight: 700,
    lineHeight: '20px',
    textAlign: 'left',
    color: '#285C9B',
  },
  subSection: {
    padding: '0px',
  },
  text: {
    fontFamily: 'Nunito',
    fontSize: '18px',
    fontWeight: '400',
    wordWrap: 'break-word',
    lineHeight: '25px',
  },
  tooltipIcon: {
    position: 'relative',
    display: 'inline-block',
    '&:hover $tooltipTextFirst': {
      visibility: 'visible',
      opacity: 1,
    },
    '&:focus $tooltipTextFirst': {
      visibility: 'visible',
      opacity: 1,
    },
    '&:active $tooltipTextFirst': {
      visibility: 'visible',
      opacity: 1,
    },
  },
  tooltipTextFirst: {
    visibility: 'hidden',
    position: 'absolute',
    padding: '12px',
    zIndex: 1,
    bottom: '125%',
    left: '-200px',
    marginLeft: '133px',
    transition: 'opacity 0.3s',
    width: '400px',
    background: '#FFFFFF',
    border: '1px solid #9C0592',
    '&::after': {
      content: "''",
      position: 'absolute',
      top: '100%',
      left: '50%',
      marginLeft: '-130px',
      borderWidth: '5px',
      borderStyle: 'solid',
      borderColor: 'black transparent transparent transparent',
    },
  },
  tooltipFont: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: '14px',
    fontWeight: '500',
    color: 'rgba(0, 0, 0, 0.87)',
  },
});

export default withStyles(styles, { withTheme: true })(DataSetDetailView);
