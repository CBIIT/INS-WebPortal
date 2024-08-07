/* eslint-disable */
import { connect } from 'react-redux';
import {
  pageSelect,
  sizeSelect,
} from '../../../redux/actions/searchActions';
import PageInfo from './PageInfo';

const ReduxPageInfo = (() => {
  const mapStateToProps = (state) => {
    const datasets = state.datasets || {};
    const searchCriteria = datasets.searchCriteria || {};

    return {
      viewType: searchCriteria.pageInfo || {}, 
    };
  };

  const mapDispatchToProps = {
    onPageSelect: pageSelect,
    onSizeSelect: sizeSelect,
  };

  return connect(mapStateToProps, mapDispatchToProps)(PageInfo);
})();

export default ReduxPageInfo;
