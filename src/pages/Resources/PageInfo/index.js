import { connect } from 'react-redux';
import {
  pageSelect, sizeSelect,
} from '../../../redux/actions/resourcesSearchActions';
import PageInfo from './PageInfo';

const ReduxPageInfo = (() => {
  const mapStateToProps = (state) => {
    const resources = state.resources || {};
    const searchCriteria = resources.searchCriteria || {};
    return {
      pageInfo: searchCriteria.pageInfo || { page: 1, pageSize: 10 },
    };
  };

  const mapDispatchToProps = {
    onPageSelect: pageSelect,
    onSizeSelect: sizeSelect,
  };

  return connect(mapStateToProps, mapDispatchToProps)(PageInfo);
})();

export default ReduxPageInfo;
