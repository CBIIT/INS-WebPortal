import { connect } from 'react-redux';
import SearchResult from './SearchResult';
import {
  changeSorting, changeSortingOrder,
} from '../../../redux/actions/searchActions';
import { loadGlossaryTerms } from '../../../redux/actions/applicationActions';

const ReduxSearchResult = (() => {
  const mapStateToProps = (state) => ({
    // resultList: state.datasets.searchResults,
    // sort: state.datasets.searchCriteria.sort,
    // viewType: state.datasets.viewType,
    // glossaryTerms: state.application.glossaryTerms,
  });

  const mapDispatchToProps = {
    onChangeSorting: changeSorting,
    onChangeSortingOrder: changeSortingOrder,
    onLoadGlossaryTerms: {
      status: 'success',
      definitions: {
        Program: "A coherent assembly of plans, project activities, and supporting resources contained within an administrative framework, the purpose of which is to implement an organization's mission or some specific program-related aspect of that mission.",
        Project: 'Any specifically defined piece of work that is undertaken or attempted to meet the goals of a program and that involves one or more case studies. Also known as a Study or Trial. ',
      },
    },
  };

  return connect(mapStateToProps, mapDispatchToProps)(SearchResult);
})();

export default ReduxSearchResult;
