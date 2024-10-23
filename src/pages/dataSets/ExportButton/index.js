import { connect } from 'react-redux';
import ExportButton from './ExportButton';

const ReduxExportButton = (() => {
  const mapStateToProps = (state) => {
    const datasets = state.datasets || {};
    return {
      searchCriteria: datasets.searchCriteria || '',
    };
  };

  const mapDispatchToProps = {};

  return connect(mapStateToProps, mapDispatchToProps)(ExportButton);
})();

export default ReduxExportButton;
