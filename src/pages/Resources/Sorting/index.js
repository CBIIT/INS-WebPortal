import { connect } from 'react-redux';
import {
  changeSorting, changeSortingOrder,
} from '../../../redux/actions/resourcesSearchActions';
import Sorting from './Sorting';

const ReduxSorting = (() => {
  const mapStateToProps = (state) => {
    const resources = state.resources || {};
    const searchCriteria = resources.searchCriteria || {};
    return {
      sort: searchCriteria.sort || { name: 'Dataset', k: 'dataset_title_sort', v: 'asc' },
    };
  };

  const mapDispatchToProps = {
    onChangeSorting: changeSorting,
    onChangeSortingOrder: changeSortingOrder,
  };

  return connect(mapStateToProps, mapDispatchToProps)(Sorting);
})();

export default ReduxSorting;
