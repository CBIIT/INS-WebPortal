import { compose, lifecycle } from 'recompose';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import NavBar from './CustomizedNavBar';
import { toggleSidebar } from '../Layout/LayoutState';

export default compose(
  withRouter,
  connect(
    (state) => ({
      isSidebarOpened: state.layout.isSidebarOpened,
      cartFieldIds: state.cart.fileIds,
    }),
    { toggleSidebar },
  ),
  lifecycle({
    componentDidMount() {
    },
    shouldComponentUpdate({ location: nextLocation }) {
      const pathName = this.props.location.pathname;
      return (
        pathName !== nextLocation || false // if the path is same don't update
      );
    },
  }),
)(NavBar);
