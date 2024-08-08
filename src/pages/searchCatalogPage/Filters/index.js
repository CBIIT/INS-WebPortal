import { connect } from 'react-redux';
import {
  loadSearchDataResources,
} from '../../../redux/actions/searchActions';
import Filters from './Filters';

const ReduxFilters = (() => {
  const mapStateToProps = (state) => {
    const datasets = state.datasets || {};

    return {
      searchFilters: datasets.resourcesList || [],
      sourceFilters: datasets.searchSourceResults || [],
      selectedFilters: (datasets.searchCriteria && datasets.searchCriteria.resources_filter) || [],
    };
  };

  const mapDispatchToProps = {
    onLoadSearchDataResources: loadSearchDataResources,
  };

  return connect(mapStateToProps, mapDispatchToProps)(Filters);
})();

export default ReduxFilters;
