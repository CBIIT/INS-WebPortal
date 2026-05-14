import { combineReducers } from 'redux';
import participatingResources from './participatingResourcesReducer';
import datasets from './searchReducer';
import resources from './resourcesSearchReducer';
import application from './applicationReducer';

const rootReducer = combineReducers({
  participatingResources,
  datasets,
  resources,
  application,
});

export default rootReducer;
