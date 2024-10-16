import React from 'react';
import { withStyles, CssBaseline } from '@material-ui/core';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { AuthenticationMiddlewareGenerator } from '@bento-core/authentication';
import aboutPageRoutes from '../../bento/aboutPagesRoutes';
import Header from '../Header/HeaderView';
import NavBar from '../NavBar/NavBarContainer';
import Footer from '../Footer/FooterView';
import Error from '../../pages/error/Error';
import Home from '../../pages/landing/landingController';
import About from '../../pages/about/aboutController';
import Disclaimer from '../Disclaimer';
import GlobalSearchController from '../../pages/search/searchViewController';
import ProgramDetail from '../../pages/programDetail/programDetailController';
import ProjectDetail from '../../pages/projectDetail/projectDetailController';
import { AUTH_MIDDLEWARE_CONFIG } from '../Auth/authMiddlewareConfig';
import DataSetDetailContainer from '../../pages/dataSetDetail/dataSetDetailController';
import DashTemplate from '../../pages/dashTemplate/DashTemplateController';
import SearchCatalogPage from '../../pages/searchCatalogPage';

const ScrollToTop = () => {
  window.scrollTo(0, 0);
  return null;
};

const Layout = ({ classes, isSidebarOpened }) => {
  const {
    MixedRoute, PrivateRoute,
  } = AuthenticationMiddlewareGenerator(AUTH_MIDDLEWARE_CONFIG);

  return (
    <>
      <CssBaseline />
      <HashRouter>
        <>
          <Header />
          <NavBar />
          <Disclaimer />
          <div
            className={classes.content}
          >
            <Route component={ScrollToTop} />
            <Switch>
              <MixedRoute exact path="/" component={Home} />
              <MixedRoute exact path="/home" component={Home} />
              <PrivateRoute path="/programs" access={['admin', 'member']} component={DashTemplate} />
              <PrivateRoute path="/datasets" access={['admin', 'member']} component={SearchCatalogPage} />
              <PrivateRoute path="/program/:id" access={['admin', 'member']} component={ProgramDetail} />
              <PrivateRoute path="/project/:id" access={['admin', 'member']} component={ProjectDetail} />
              <PrivateRoute path="/dataset/:id" access={['admin', 'member']} component={DataSetDetailContainer} />
              <Route exact path="/globalsearch" access={['admin', 'member', 'non-member']} component={GlobalSearchController} />
              <Route path="/globalsearch/:id" access={['admin', 'member', 'non-member']} component={GlobalSearchController} />
              {aboutPageRoutes.map(
                (aboutPageRoute, index) => (
                  <Route
                    key={index}
                    path={aboutPageRoute}
                    component={About}
                  />
                ),
              )}
              <Route component={Error} />
            </Switch>
            <Footer data={{ isSidebarOpened }} />
          </div>
        </>
      </HashRouter>
    </>
  );
};

const styles = (theme) => ({
  root: {
    display: 'flex',
    maxWidth: '100vw',
    overflowX: 'hidden',
  },
  content: {
    flexGrow: 1,
    width: 'calc(100%)',
    background: theme.custom.bodyBackGround,
  },
  '@global': {
    '*::-webkit-scrollbar': {
      width: '0.5em',
      height: '0.4em',
    },
    '*::-webkit-scrollbar-track': {
      '-webkit-box-shadow': 'inset 0 0 6px #ccc',
      borderRadius: '0px',
      backgroundColor: '#FFFFFF',
    },
    '*::-webkit-scrollbar-thumb': {
      backgroundColor: '#97b0c0',
      outline: '1px solid slategrey',
      borderRadius: '0px',
    },
  },
});

export default withStyles(styles)(Layout);
