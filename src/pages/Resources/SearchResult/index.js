import { connect } from 'react-redux';
import SearchResult from './SearchResult';
import {
  changeSorting,
  changeSortingOrder,
} from '../../../redux/actions/resourcesSearchActions';

const ReduxSearchResult = (() => {
  const mapStateToProps = (state) => {
    const resources = state.resources || {};
    const searchCriteria = resources.searchCriteria || {};
    const application = state.application || {};

    return {
      resultList: resources.searchResults || [],
      sort: searchCriteria.sort || 'defaultSort',
      search: searchCriteria,
      glossaryTerms: application.glossaryTerms || [],
    };
  };

  const mapDispatchToProps = {
    onChangeSorting: changeSorting,
    onChangeSortingOrder: changeSortingOrder,
  };

  return connect(mapStateToProps, mapDispatchToProps)(SearchResult);
})();

export default ReduxSearchResult;
