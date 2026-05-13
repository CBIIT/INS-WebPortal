import React, {
  useState, useRef, useEffect, useMemo,
} from 'react';
import {
  Link,
  Container,
  Grid,
  Typography,
  withStyles,
} from '@material-ui/core';
import ReactHtmlParser from 'html-react-parser';
import { cn } from '@bento-core/util';
import { Link as RouterLink } from 'react-router-dom';
import icon from '../../assets/icons/Datasets.svg';
import {
  externalLinkIconBlue,
  descMaxLength,
  resourceCategoriesFields,
  resourceInformationFields,
} from '../../bento/resourceDetailData';
import helpIcon from '../../assets/icons/help.svg';

const BASE_LOGO_MARGIN = -16;

/**
 * A utility function to normalize description content by checking if it contains HTML tags
 * and wrapping plain text in a <p> tag for consistent spacing
 *
 * @param {string} content The description content to normalize.
 * @returns {string} The normalized description content with appropriate HTML tags for spacing.
 */
const normalizeDescriptionContent = (content) => {
  if (!content || typeof content !== 'string') {
    return '';
  }

  // Check if content already contains HTML paragraph tags
  const hasHtmlParagraphs = /<p[\s>]/i.test(content);
  if (hasHtmlParagraphs) {
    return content;
  }

  // Plain text detected - wrap in <p> tag to match HTML spacing
  return `<p>${content}</p>`;
};

/**
 * A utility function to determine if a field value should be considered empty
 *
 * @param {unknown} value The field value to determine if it's empty
 * @param {typeof resourceInformationFields[number]} field The field definition
 */
const fieldIsEmpty = (value, field) => {
  if (field.isArray) {
    return !Array.isArray(value) || value.length === 0;
  }

  return value == null || value === '';
};

/**
 * A utility function to strip HTML tags from a string
 *
 * @param {unknown} html The HTML string to strip tags from
 * @returns {string} The plain text content without HTML tags
 */
const stripHtmlTags = (html) => {
  if (!html || typeof html !== 'string') {
    return '';
  }

  const tmp = document.createElement('DIV');
  tmp.innerHTML = html;

  return tmp.textContent || tmp.innerText || '';
};

const ResourceDetailView = ({ classes, data }) => {
  const [expandedDescription, setExpandedDescription] = useState(false);
  const [logoMarginTop, setLogoMarginTop] = useState(BASE_LOGO_MARGIN);
  const titleRef = useRef(null);

  const [exceedsMax, description] = useMemo(() => {
    // No description is available or description is empty after stripping HTML tags
    if (!data || !data.resource_full_description) {
      return [false, ''];
    }
    const strippedDescription = stripHtmlTags(data.resource_full_description);
    if (!strippedDescription.trim()) {
      return [false, ''];
    }

    // Description is expanded or does not exceed max length, show formatted description
    const exceedsMaxLength = strippedDescription.length > descMaxLength;
    if (!exceedsMaxLength || expandedDescription) {
      return [exceedsMaxLength, normalizeDescriptionContent(data.resource_full_description)];
    }

    // Description exceeds max length and is not expanded, show truncated description
    const truncatedDescription = strippedDescription.slice(0, descMaxLength);
    return [true, `${truncatedDescription}...`];
  }, [expandedDescription, data.resource_full_description]);

  const toggleExpandDescription = () => {
    setExpandedDescription(!expandedDescription);
  };

  useEffect(() => {
    if (!titleRef.current) {
      return;
    }

    const titleHeight = titleRef.current.offsetHeight;

    // Compute lineHeight from actual CSS instead of hardcoding
    const computedStyle = window.getComputedStyle(titleRef.current);
    const lineHeightStr = computedStyle.lineHeight;
    const lineHeight = parseFloat(lineHeightStr);

    const numberOfLines = Math.round(titleHeight / lineHeight);

    // Base margin, add lineHeight px for each additional line
    const newMargin = BASE_LOGO_MARGIN + (Math.max(0, numberOfLines - 1) * lineHeight);
    setLogoMarginTop(newMargin);
  }, [data.resource_title]);

  return (
    <Container className={classes.mainContainer}>
      <div className={classes.contentContainer}>
        <Grid container spacing={2} alignItems="center" justifyContent="space-between" className={classes.nav}>
          <Grid item>
            <Link to="/resources" className={classes.navLink} component={RouterLink}>
              Explore Resources
            </Link>
            {' > '}
            {data.resource_title || ''}
          </Grid>
        </Grid>
        <div className={classes.container}>
          <div className={classes.innerContainer}>
            <div className={classes.header}>
              <div className={classes.logo} style={{ marginTop: `${logoMarginTop}px` }}>
                <img src={icon} alt="INS resources logo" />
              </div>
              <div className={classes.headerTitle}>
                <div className={classes.headerMainTitle} data-testid="resource-detail-title" ref={titleRef}>
                  <span className={classes.datasetLabel}>Resource:</span>
                  <Typography component="h1" className={classes.datasetTitle}>
                    {data.resource_title}
                  </Typography>
                </div>
              </div>
            </div>
            <div className={classes.headerResourceContainer}>
              {data.resource_source_url && (
                <Link href={data.resource_source_url} target="_blank" rel="noopener noreferrer" className={cn(classes.subTitle, classes.externalResource)}>
                  Visit Resource
                  <img
                    src={externalLinkIconBlue.src}
                    alt={externalLinkIconBlue.alt}
                    className={classes.externalLinkIcon}
                  />
                </Link>
              )}
            </div>
          </div>
        </div>
        <div className={classes.detailsContainer}>
          {description && (
            <div className={classes.contentSection} data-testid="resource-description-section">
              <Typography variant="h6" component="h2" className={classes.studyHeader} style={{ marginBottom: exceedsMax && !expandedDescription ? '18px' : undefined }}>
                Description
              </Typography>
              <div className={classes.text} data-testid="description-text">
                {ReactHtmlParser(description)}
                {exceedsMax && (
                <>
                  {' '}
                  <span
                    onClick={toggleExpandDescription}
                    onKeyDown={(e) => e.key === 'Enter' && toggleExpandDescription()}
                    role="button"
                    tabIndex={0}
                    className={classes.readMoreLink}
                    data-testid="description-toggle-expansion"
                  >
                    {expandedDescription ? 'Show Less' : 'Read More'}
                  </span>
                </>
                )}
              </div>
            </div>
          )}
          {resourceInformationFields.some((field) => !fieldIsEmpty(data[field.datafield], field))
            && (
            <div className={classes.contentSection} data-testid="data-details-section">
              <Typography variant="h6" component="h2" className={classes.studyHeader}>
                Resource Information
              </Typography>
              <Grid container spacing={4} className={classes.detailsGrid}>
                {resourceInformationFields
                  .filter((field) => !fieldIsEmpty(data[field.datafield], field))
                  .map((field) => (
                    <Grid item xs={12} md={4} key={field.datafield} data-testid={`data-detail-${field.datafield}`}>
                      <div className={classes.subSection}>
                        <Typography variant="body2" component="span" className={classes.subTitle}>
                          {field.label}
                          {field.tooltip && (
                          <span className="tooltip-icon">
                            <img src={helpIcon} alt="tooltipIcon" />
                            <span className="tooltip-text-first">
                              <span className={classes.tooltipFont}>
                                {field.tooltip}
                              </span>
                            </span>
                          </span>
                          )}
                        </Typography>
                        <Typography variant="body2" component="div" className={classes.text}>
                          {/* TODO: THE ARRAY FIELDS MUST BE SORTED */}
                          {field.isArray ? data[field.datafield].join('; ') : data[field.datafield] || ''}
                        </Typography>
                      </div>
                    </Grid>
                  ))}
              </Grid>
            </div>
            )}
          {resourceCategoriesFields.some((field) => !fieldIsEmpty(data[field.datafield], field))
            && (
              <div className={classes.contentSection} data-testid="basic-information-section">
                <Typography variant="h6" component="h2" className={classes.studyHeader}>
                  Resource Categories
                </Typography>
                <Grid container spacing={4} className={classes.detailsGrid}>
                  {resourceCategoriesFields
                    .filter((field) => !fieldIsEmpty(data[field.datafield], field))
                    .map((field) => (
                      <Grid item xs={12} md={4} key={field.datafield} data-testid={`basic-info-${field.datafield}`}>
                        <div className={classes.subSection}>
                          <Typography variant="body2" component="span" className={classes.subTitle}>
                            {field.label}
                            {field.tooltip && (
                              <span className="tooltip-icon">
                                <img src={helpIcon} alt="tooltipIcon" />
                                <span className="tooltip-text-first">
                                  <span className={classes.tooltipFont}>
                                    {field.tooltip}
                                  </span>
                                </span>
                              </span>
                            )}
                          </Typography>
                          <Typography variant="body2" component="div" className={classes.text}>
                            {/* TODO: THE ARRAY FIELDS MUST BE SORTED */}
                            {field.isArray ? data[field.datafield].join('; ') : data[field.datafield] || ''}
                          </Typography>
                        </div>
                      </Grid>
                    ))}
                </Grid>
              </div>
            )}
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
    fontFamily: 'inherit',
    fontSize: 'inherit',
    lineHeight: 'inherit',
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
    padding: '15px 62px',
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

export default withStyles(styles, { withTheme: true })(ResourceDetailView);
