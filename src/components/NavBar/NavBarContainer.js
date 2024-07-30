import { compose, lifecycle } from 'recompose';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import NavBarView from './NavBarView';
import { toggleSidebar } from '../Layout/LayoutState';

export default compose(
  connect(
    (state) => ({
      isSidebarOpened: state.layout.isSidebarOpened,
      cartFieldIds: state.cartReducer.filesId,
    }),
    { toggleSidebar },
  ),
  lifecycle({
    componentDidMount() {
    },
    shouldComponentUpdate({ location: nextLocation }) {
      const pathName = useLocation().pathname;
      return (
        pathName !== nextLocation || false // if the path is same don't update
      );
    },
  }),
)(NavBarView);
