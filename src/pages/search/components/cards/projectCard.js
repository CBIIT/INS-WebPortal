import { Grid, withStyles } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import { prepareLinks } from 'bento-components';
import PropertyItem from '../propertyItem';

const ProjectCard = ({ data, classes, index }) => {
  const properties = [

    {
      label: 'Project ID',
      dataField: 'project_id',
      link: '/project/{project_id}',
    },
    {
      label: 'Program',
      dataField: 'program',
    },
    {
      label: 'Project Title',
      dataField: 'project_title',
    },
    {
      label: 'Principal Investigators',
      dataField: 'principal_investigators',
    },
    {
      label: 'Lead DOC',
      dataField: 'lead_doc',
    },
  ];

  const propertiesWithLinks = prepareLinks(properties, data);

  return (
    <>
      <Grid item container className={classes.card}>
        <Grid item xs={1} className={classes.indexContainer}>
          {index + 1}
        </Grid>
        <Grid item xs={11} className={classes.propertyContainer}>
          <div>
            <span className={classes.detailContainerHeader}>PROJECT</span>
            <span>
              <Link to={`/project/${data.project_id}`} className={classes.cardTitle}>
                {data.project_id}
              </Link>

            </span>
          </div>
          {propertiesWithLinks.map((prop) => (
            <PropertyItem
              label={prop.label}
              value={data[prop.dataField]}
              link={prop.link}
              // labelLink={prop.labelLink}
              // classes={classes}
              index
            />
          ))}
        </Grid>
      </Grid>
    </>
  );
};

const styles = () => ({
  cartIcon: {
    height: '22px',
    margin: '0px 0px 0px 6px',
  },
  indexContainer: {
    padding: '18px 0px 18px 18px',
    color: '#747474',
    fontFamily: 'Inter',
    fontSize: '13px',
  },
  propertyContainer: {
    padding: '16px 16px 16px 0px',
    borderBottom: '2px solid #E7EEF5',
  },
  cardTitle: {
    color: '#7747FF',
    textDecoration: 'none',
    fontSize: '16px',
    fontFamily: 'Nunito',
    paddingLeft: '9px',
    verticalAlign: 'middle',
  },
  content: {
    fontSize: '12px',
  },
  detailContainerHeader: {
    textTransform: 'uppercase',
    padding: '2px 8px',
    backgroundColor: '#C0E9D7',
    color: '#000000',
    fontFamily: 'Nunito',
    fontSize: '12px',
    fontWeight: '400',
    letterSpacing: '0.9px',
    verticalAlign: 'middle',
    borderRadius: '4px',
  },
});

export default withStyles(styles, { withTheme: true })(ProjectCard);
