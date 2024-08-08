/* eslint-disable  */
import { connect } from 'react-redux';
import {
  switchDataView,
} from '../../../redux/actions/searchActions';
import SwitchView from './SwitchView';

const ReduxSwitchView = (() => {
  const mapStateToProps = (state) => {
    const datasets = state.datasets || {};

    return {
      viewType: datasets.viewType || '', 
    };
  };

  const mapDispatchToProps = {
    onSwitchView: switchDataView,
  };

  return connect(mapStateToProps, mapDispatchToProps)(SwitchView);
})();

export default ReduxSwitchView;
