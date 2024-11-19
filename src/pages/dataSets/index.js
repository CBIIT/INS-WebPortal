import { connect } from 'react-redux';
import {
  loadFromUrlQuery, startFullTextSearch, bubbleSearchTextRemoveClick, bubbleResourcesRemoveClick,
} from '../../redux/actions/searchActions';
import SearchCatalogPage from './SearchCatalogPage';

const ReduxSearchCatalogPage = (() => {
  const mapStateToProps = (state) => ({
    searchCriteria: state.datasets.searchCriteria.search_text.replace(/[^a-zA-Z0-9]/g, ' '),
    searchKeyword: state.datasets.searchCriteria.search_text.replace(/[^a-zA-Z0-9]/g, ' '),
    resourceFilters: state.datasets.searchCriteria.filters,
  });

  const mapDispatchToProps = {
    onLoadFromUrlQuery: loadFromUrlQuery,
    onStartFullTextSearch: startFullTextSearch,
    onBubbleSearchTextRemoveClick: bubbleSearchTextRemoveClick,
    onBubbleResourcesRemoveClick: bubbleResourcesRemoveClick,
  };

  return connect(mapStateToProps, mapDispatchToProps)(SearchCatalogPage);
})();

export default ReduxSearchCatalogPage;
