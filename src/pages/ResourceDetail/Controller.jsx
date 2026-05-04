import React, { useState, useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import DetailView from './DetailView';
import { getResourceById } from '../../api/searchApi';
import Error from '../error/Error';

/**
 * The Resource Detail page controller component.
 *
 * @param {{ match: { params: { uuid: string }} }} props - The component props.
 * @returns {React.ReactElement} The rendered component.
 */
const ResourceController = ({ match }) => {
  const { uuid } = match.params;

  const [resource, setResource] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    (async () => {
      try {
        const response = await getResourceById(uuid);
        setResource(response);
      } catch (error) {
        setResource(null);
      } finally {
        setLoading(false);
      }
    })();
  }, [uuid]);

  if (loading) {
    return <CircularProgress />;
  }

  if (!resource || !resource.data) {
    return <Error />;
  }

  return <DetailView data={resource.data} />;
};

export default ResourceController;
