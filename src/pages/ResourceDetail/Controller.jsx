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

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    (async () => {
      try {
        const resourceData = await getResourceById(uuid);
        setData(resourceData);
      } catch (error) {
        setData(null);
      } finally {
        setLoading(false);
      }
    })();
  }, [uuid]);

  if (loading) {
    return <CircularProgress />;
  }

  if (!data || !data.datasetDetails) {
    return <Error />;
  }

  return <DetailView data={data.datasetDetails} />;
};

export default ResourceController;
