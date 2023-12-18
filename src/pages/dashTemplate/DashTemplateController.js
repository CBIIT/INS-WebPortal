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
    localFindUpload, localFindAutocomplete,
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
    subject_ids: [
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

  // --------------- Transform RCR data --------------
  const transformRCRData = (data) => {
    const publicationCountByRCRTransformedData = [];

    for (let i = 0; i < data.publicationCountByRCR.length; i += 1) {
      if (data.publicationCountByRCR[i].group !== 'N/A') {
        publicationCountByRCRTransformedData.push(data.publicationCountByRCR[i]);
      }
    }

    for (let j = 0; j < publicationCountByRCRTransformedData.length; j += 1) {
      if (publicationCountByRCRTransformedData[j].group === null) {
        publicationCountByRCRTransformedData[j].group = '0';
      }
    }

    publicationCountByRCRTransformedData.sort((a, b) => ((a.subjects < b.subjects) ? 1 : -1));

    return publicationCountByRCRTransformedData;
  };

  // --------------- Transform Donut data --------------
  const transformDonutData = (data) => {
    const transformedData = data;
    transformedData.publicationCountByRCRTransformed = transformRCRData(data);
    transformedData.projectCountByDOCSorted = data.projectCountByDOC.sort((a, b) => ((a.subjects < b.subjects) ? 1 : -1));
    transformedData.publicationCountByYearSorted = data.publicationCountByYear.sort((a, b) => ((a.subjects < b.subjects) ? 1 : -1));
    transformedData.projectCountByFiscalYearSorted = data.projectCountByFiscalYear.sort((a, b) => ((a.subjects < b.subjects) ? 1 : -1));

    for (let i = 0; i < transformedData.publicationCountByYearSorted.length; i += 1) {
      transformedData.publicationCountByYearSorted[i].group = new Date(parseInt(transformedData.publicationCountByYearSorted[i].group, 10)).getFullYear();
    }

    transformedData.projectCountByAwardAmountSorted = data.projectCountByAwardAmount.sort((a, b) => ((a.subjects < b.subjects) ? 1 : -1));
    transformedData.publicationCountByCitationSorted = data.publicationCountByCitation.sort((a, b) => ((a.subjects < b.subjects) ? 1 : -1));
    return transformedData;
  };

  if (dashData) {
    transformDonutData(dashData);
  }

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
