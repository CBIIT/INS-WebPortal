import { connect } from 'react-redux';
import {
  loadSearchDataResources,
} from '../../../redux/actions/searchActions';
import Filters from './Filters';

const ReduxFilters = (() => {
  const mapStateToProps = (state) => ({
    searchFilters: state.datasets ? state.datasets.resourcesList : '',
    sourceFilters: state.datasets ? state.datasets.searchSourceResults : '',
    selectedFilters: state.datasets ? state.datasets.searchCriteria.resources_filter : '',
  });

  const mapDispatchToProps = {
    onLoadSearchDataResources: loadSearchDataResources,
  };

  return connect(mapStateToProps, mapDispatchToProps)(Filters);
})();

export default ReduxFilters;
