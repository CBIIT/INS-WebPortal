// Component to display a property
import {
  Grid,
  withStyles,
} from '@material-ui/core';
import React from 'react';
import {
  Anchor,
  prepareLinks,
} from '@bento-core/util';
import { externalLinkIcon } from '../../bento/programDetailData';

const PropertyItem = ({
  label,
  value,
  link,
  labelLink,
  classes,
  index,
}) => {
  const defaultValue = '';
  return (
    <Grid item container>
      <Grid item xs={6}>
        <span className={classes.title} id={`program_detail_left_section_title_${label}`}>
          {labelLink ? <Anchor link={labelLink} text={label} classes={classes} /> : label}
        </span>
      </Grid>
      <Grid item xs={6} className={classes.content} id={`program_detail_left_section_description_${label}_${value}`}>
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
    fontSize: '12px',
  },
  detailContainerHeader: {
    textTransform: 'uppercase',
    fontFamily: 'Lato',
    fontSize: '17px',
    letterSpacing: '0.025em',
    color: '#0296C9',
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
    color: '#9d9d9c',
    fontFamily: theme.custom.fontFamilySans,
    fontSize: '12px',
    lineHeight: '12px',
    letterSpacing: '0.017em',
    fontWeight: '600',
    whiteSpace: 'nowrap',
  },
  descriptionPart: {
    paddingBottom: '26px',
  },
  description: {
    fontWeight: 'bold',
  },
  link: {
    textDecoration: 'none',
  },
  externalLinkIcon: {
    width: '16px',
    verticalAlign: 'sub',
    marginLeft: '4px',
  },
});

export default withStyles(styles, { withTheme: true })(Subsection);
