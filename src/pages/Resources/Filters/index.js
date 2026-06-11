import { connect } from 'react-redux';
import {
  loadSearchDataResources,
} from '../../../redux/actions/resourcesSearchActions';
import Filters from './Filters';

const ReduxFilters = (() => {
  const mapStateToProps = (state) => {
    const resources = state.resources || {};
    return {
      searchFilters: resources.resourcesList || [],
      sourceFilters: resources.searchSourceResults || [],
      selectedFilters: (resources.searchCriteria && resources.searchCriteria.filters) || [],
    };
  };
  const mapDispatchToProps = {
    onLoadSearchDataResources: loadSearchDataResources,
  };

  return connect(mapStateToProps, mapDispatchToProps)(Filters);
})();

export default ReduxFilters;
