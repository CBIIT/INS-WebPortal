import { connect } from 'react-redux';
import SearchResult from './SearchResult';
import {
  changeSorting,
  changeSortingOrder,
} from '../../../redux/actions/searchActions';
// import { loadGlossaryTerms } from '../../../redux/actions/applicationActions';

const ReduxSearchResult = (() => {
  const mapStateToProps = (state) => {
    const datasets = state.datasets || {};
    const searchCriteria = datasets.searchCriteria || {};
    const application = state.application || {};

    return {
      resultList: datasets.searchResults || [],
      sort: searchCriteria.sort || 'defaultSort',
      search: searchCriteria,
      glossaryTerms: application.glossaryTerms || [],
    };
  };

  const mapDispatchToProps = {
    onChangeSorting: changeSorting,
    onChangeSortingOrder: changeSortingOrder,
    // onLoadGlossaryTerms: loadGlossaryTerms,
  };

  return connect(mapStateToProps, mapDispatchToProps)(SearchResult);
})();

export default ReduxSearchResult;
