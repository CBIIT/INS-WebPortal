/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { useApolloClient } from '@apollo/client';
import { connect } from 'react-redux';
import { CircularProgress } from '@material-ui/core';
import { getFilters } from '@bento-core/facet-filter';
import DashTemplateView from './DashTemplateView';
import { DASHBOARD_QUERY_NEW } from '../../bento/dashboardTabData';

const getDashData = (states) => {
  const {
    filterState,
    localFindUpload,
    localFindAutocomplete,
  } = states;

  const client = useApolloClient();
  async function getData(activeFilters) {
    const result = await client.query({
      query: DASHBOARD_QUERY_NEW,
      variables: activeFilters,
    })
      .then((response) => response.data);
    return result;
  }

  const [dashData, setDashData] = useState(null);

  const activeFilters = {
    ...getFilters(filterState),
    program_names: [
      ...(localFindUpload || []).map((obj) => obj.subject_id),
      ...(localFindAutocomplete || []).map((obj) => obj.title),
    ],
  };

  useEffect(() => {
    const controller = new AbortController();

    getData(activeFilters).then((result) => {
      if (result.searchProjects) {
        setDashData(result.searchProjects);
      }
    });
    return () => controller.abort();
  }, [filterState, localFindUpload, localFindAutocomplete]);
  return { dashData, activeFilters };
};

const DashTemplateController = ((props) => {
  const { dashData, activeFilters } = getDashData(props);

  if (!dashData) {
    return (<CircularProgress />);
  }

  return (
    <DashTemplateView
      {...props}
      dashData={dashData}
      activeFilters={activeFilters}
    />
  );
});

const mapStateToProps = (state) => ({
  filterState: state.statusReducer.filterState,
  localFindUpload: state.localFind.upload,
  localFindAutocomplete: state.localFind.autocomplete,
});

export default connect(mapStateToProps, null)(DashTemplateController);
