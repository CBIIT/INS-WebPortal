import { connect } from 'react-redux';
import {
  pageSelect,
  sizeSelect,
} from '../../../redux/actions/searchActions';
import PageInfo from './PageInfo';

const ReduxPageInfo = (() => {
  const mapDispatchToProps = {
    onPageSelect: pageSelect,
    onSizeSelect: sizeSelect,
  };

  return connect(null, mapDispatchToProps)(PageInfo);
})();

export default ReduxPageInfo;
