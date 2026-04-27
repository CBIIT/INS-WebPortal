import { combineReducers } from 'redux';
import participatingResources from './participatingResourcesReducer';
import datasets from './searchReducer';
import resources from './resourcesSearchReducer';
import documentSearch from './documentSearchReducer';
import application from './applicationReducer';

const rootReducer = combineReducers({
  participatingResources,
  datasets,
  resources,
  documentSearch,
  application,
});

export default rootReducer;
