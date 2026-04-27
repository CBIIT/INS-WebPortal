import { connect } from 'react-redux';
import {
  loadFromUrlQuery, startFullTextSearch, bubbleSearchTextRemoveClick, bubbleResourcesRemoveClick,
} from '../../redux/actions/resourcesSearchActions';
import ResourcesView from './ResourcesView';

const ReduxSearchCatalogPage = (() => {
  const mapStateToProps = (state) => {
    const resources = state.resources || {};
    const searchCriteria = resources.searchCriteria || {};

    return {
      searchCriteria: searchCriteria.search_text || '',
      searchKeyword: searchCriteria.search_text || '',
      resourceFilters: searchCriteria.filters || {},
    };
  };

  const mapDispatchToProps = {
    onLoadFromUrlQuery: loadFromUrlQuery,
    onStartFullTextSearch: startFullTextSearch,
    onBubbleSearchTextRemoveClick: bubbleSearchTextRemoveClick,
    onBubbleResourcesRemoveClick: bubbleResourcesRemoveClick,
  };

  return connect(mapStateToProps, mapDispatchToProps)(ResourcesView);
})();

export default ReduxSearchCatalogPage;
