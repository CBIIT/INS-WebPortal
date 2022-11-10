/* eslint-disable max-len */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import CaseDetailView from './caseDetailView';
import { Typography } from '../../components/Wrappers/Wrappers';
import { fetchDataForCaseDetailTabDataTable } from './store/caseDetailReducer';

class CaseDetailController extends Component {
  componentDidMount() {
    fetchDataForCaseDetailTabDataTable();
  }

  render() {
    const {
      isLoading, hasError, error, isFetched, data, match,
    } = this.props;

    console.log('caseIDField: ', match.params.id);

    if (hasError) {
      return (
        <Typography variant="headline" color="error" size="sm">
          {error && `An error has occurred in loading case detail component: ${error}`}
        </Typography>
      );
    }

    if (isLoading) {
      return <CircularProgress />;
    }

    if (isFetched) {
      return (
        <CaseDetailView data={data} />
      );
    }

    return (
      <Typography variant="headline" size="sm">
        {error && `An error has occurred in loading stats component: ${error}`}
      </Typography>
    );
  }
}

function mapStateToProps(state) {
  const {
    isLoading, isFetched, hasError, error, data,
  } = state.caseDetailTab;

  const { isSidebarOpened } = state.layout;
  return {
    isLoading,
    hasError,
    error,
    data,
    isFetched,
    isSidebarOpened,
  };
}

export default connect(mapStateToProps)(CaseDetailController);
