import { connect } from 'react-redux';
import {
  loadFromUrlQuery, startFullTextSearch, bubbleSearchTextRemoveClick, bubbleResourcesRemoveClick,
} from '../../redux/actions/searchActions';
import ResourcesView from './ResourcesView';

const ReduxSearchCatalogPage = (() => {
  const mapStateToProps = (state) => ({
    searchCriteria: state.datasets.searchCriteria.search_text,
    searchKeyword: state.datasets.searchCriteria.search_text,
    resourceFilters: state.datasets.searchCriteria.filters,
  });

  const mapDispatchToProps = {
    onLoadFromUrlQuery: loadFromUrlQuery,
    onStartFullTextSearch: startFullTextSearch,
    onBubbleSearchTextRemoveClick: bubbleSearchTextRemoveClick,
    onBubbleResourcesRemoveClick: bubbleResourcesRemoveClick,
  };

  return connect(mapStateToProps, mapDispatchToProps)(ResourcesView);
})();

export default ReduxSearchCatalogPage;
