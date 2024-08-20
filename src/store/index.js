import { createStore, applyMiddleware, combineReducers } from 'redux';
import ReduxThunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import { sideBarReducerGenerator } from '@bento-core/facet-filter';
import { cartReducerGenerator } from '@bento-core/cart';
import { LocalFindReducerGenerator } from '@bento-core/local-find';
import { LoginReducerGenerator } from '@bento-core/authentication';
import layout from '../components/Layout/LayoutState';
import stats from '../components/Stats/StatsState';
import { getFromLocalStorage } from '../utils/localStorage';
import participatingResources from '../redux/reducers/participatingResourcesReducer';
import datasets from '../redux/reducers/searchReducer';
import documentSearch from '../redux/reducers/documentSearchReducer';
import application from '../redux/reducers/applicationReducer';
import initialState from '../redux/reducers/initialState';

const { localFind } = LocalFindReducerGenerator();
const { statusReducer } = sideBarReducerGenerator();
const { cartReducer } = cartReducerGenerator();
const { login } = LoginReducerGenerator(getFromLocalStorage);

const reducers = {
  localFind,
  cartReducer,
  statusReducer,
  login,
  layout,
  stats,
  participatingResources,
  datasets,
  documentSearch,
  application,
};
const loggerMiddleware = createLogger();

const store = createStore(
  combineReducers(reducers),
  initialState,
  composeWithDevTools(applyMiddleware(ReduxThunk, loggerMiddleware)),
);

store.injectReducer = (key, reducer) => {
  reducers[key] = reducer;
  store.replaceReducer(combineReducers(reducers));
};

export default store;
