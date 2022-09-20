/* eslint-disable max-len */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import StatsView from './StatsView';
import { fetchDataForStats } from './StatsState';

const Stats = () => {
  const data = useSelector((state) => {
    if (!state.stats.isFetched) {
      const dispatch = useDispatch();
      dispatch(fetchDataForStats());
    }

    return state.stats.data;
  });

  // const transformedCount = {};

  // if (data && data.length !== 0) {
  //   if (data.numberOfClinicalTrials >= 1000) {
  //     transformedCount.numberOfClinicalTrials = `${data.numberOfClinicalTrials.toString().slice(0, -3)}K`;
  //   } else {
  //     transformedCount.numberOfClinicalTrials = data.numberOfClinicalTrials.toString();
  //   }

  //   if (data.numberOfDatasets >= 1000) {
  //     transformedCount.numberOfDatasets = `${data.numberOfDatasets.toString().slice(0, -3)}K`;
  //   } else {
  //     transformedCount.numberOfDatasets = data.numberOfDatasets.toString();
  //   }

  //   if (data.numberOfPatents >= 1000) {
  //     transformedCount.numberOfPatents = `${data.numberOfPatents.toString().slice(0, -3)}K`;
  //   } else {
  //     transformedCount.numberOfPatents = data.numberOfPatents.toString();
  //   }

  //   if (data.numberOfPrograms >= 1000) {
  //     transformedCount.numberOfPrograms = `${data.numberOfPrograms.toString().slice(0, -3)}K`;
  //   } else {
  //     transformedCount.numberOfPrograms = data.numberOfPrograms.toString();
  //   }

  //   if (data.numberOfProjects >= 1000) {
  //     transformedCount.numberOfProjects = `${data.numberOfProjects.toString().slice(0, -3)}K`;
  //   } else {
  //     transformedCount.numberOfProjects = data.numberOfProjects.toString();
  //   }

  //   if (data.numberOfPublications >= 1000) {
  //     transformedCount.numberOfPublications = `${data.numberOfPublications.toString().slice(0, -3)}K`;
  //   } else {
  //     transformedCount.numberOfPublications = data.numberOfPublications.toString();
  //   }
  // }

  // eslint-disable-next-line max-len
  // return (!data || data.length === 0 ? (<CircularProgress />) : <StatsView data={transformedCount} />);
  return (!data || data.length === 0 ? (<CircularProgress />) : <StatsView data={data} />);
};

export default (Stats);
