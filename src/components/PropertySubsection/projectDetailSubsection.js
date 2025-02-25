// Component to display a property
import {
  Grid,
  withStyles,
} from '@material-ui/core';
import React from 'react';
import ReactHtmlParser from 'html-react-parser';
import {
  Anchor,
  prepareLinks,
} from '@bento-core/util';
import { externalLinkIcon } from '../../bento/projectDetailData';

const PropertyItem = ({
  label,
  value,
  link,
  labelLink,
  classes,
  index,
}) => {
  const defaultValue = '';
  let concatenatedLinks = '';
  if (link) {
    const names = value.split(';');
    const ids = link.split(';');
    const contentArray = [];

    for (let i = 0; i < ids.length; i += 1) {
      const url = `#/program/${ids[i]}`;

      const linkElement = `<a key="${i}" href="${url}" style="color: #571AFF;">${names[i]}</a>`;

      contentArray.push(linkElement);
    }

    concatenatedLinks = contentArray.join(';');
  }

  return (
    <>
      {label ? (
        <Grid item container>
          <Grid item xs={6}>
            <span className={classes.title} id={`project_detail_left_section_title_${label}`}>
              {labelLink ? <Anchor link={labelLink} text={label} classes={classes} /> : label}
            </span>
          </Grid>
          <Grid item xs={6} className={classes.content} id={`project_detail_left_section_description_${label}_${value}`}>
            {
              value
                || value === 0
                ? (
                  link
                    ? <>{ReactHtmlParser(concatenatedLinks)}</>
                    : value
                ) : defaultValue
            }
          </Grid>
        </Grid>
      ) : (
        <Grid item container>
          <Grid item xs={12} className={classes.content} id={`project_detail_left_section_description_${value}`}>
            {value || value === 0 ? (
              link ? (
                <>
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={classes.link}
                  >
                    {value}
                  </a>
                  <img
                    src={externalLinkIcon.src}
                    alt={externalLinkIcon.alt}
                    className={classes.externalLinkIcon}
                  />
                </>
              ) : value
            ) : defaultValue}
          </Grid>
        </Grid>
      )}
    </>
  );
};

// Component to display a subsection
const Subsection = ({ config, data, classes }) => {
  const properties = prepareLinks(config.properties, data);
  return (
    <Grid item container className={classes.subsection}>
      <Grid item container direction="column" className={classes.subsectionBody} xs={12}>
        <Grid item>
          <span className={classes.detailContainerHeader}>{config.sectionHeader}</span>
        </Grid>
        {
          config.sectionDesc
            ? (
              <Grid item container className={classes.descriptionPart}>
                <Grid item><span className={classes.description}>Description -</span></Grid>
                <Grid item><span>{config.sectionDesc}</span></Grid>
              </Grid>
            ) : ''
        }
        {properties.slice(0, 10).map((prop, index) => (
          <PropertyItem
            key={index}
            label={prop.label}
            value={data[prop.dataField]}
            classes={classes}
            link={prop.link}
            labelLink={prop.labelLink}
            index
          />
        ))}
      </Grid>
      <Grid item xs={3} />
    </Grid>
  );
};

const styles = (theme) => ({
  content: {
    fontFamily: 'Nunito',
    fontSize: '18px',
    fontWeight: '400',
    lineHeight: '25px',
    position: 'relative',
    top: '15px',
    marginBottom: '10px',
  },
  detailContainerHeader: {
    textTransform: 'uppercase',
    fontFamily: 'Inter',
    fontSize: '19px',
    fontWeight: '400',
    lineHeight: '20px',
    color: '#3478A5',
  },
  subsectionBody: {
    paddingBottom: '15px',
  },
  subsection: {
    '&:last-child $subsectionBody': {
      borderBottom: 'none',
    },
  },
  title: {
    color: '#1C58A1',
    fontFamily: 'Inter',
    fontSize: '16px',
    lineHeight: '20px',
    fontWeight: '600',
    position: 'relative',
    left: '10px',
    top: '15px',
    marginBottom: '10px',
  },
  descriptionPart: {
    paddingBottom: '26px',
  },
  description: {
    fontWeight: 'bold',
  },
  link: {
    fontWeight: '600',
    color: '#571AFF',
  },
  externalLinkIcon: {
    width: '16px',
    verticalAlign: 'sub',
    marginLeft: '4px',
  },
});

export default withStyles(styles, { withTheme: true })(Subsection);
