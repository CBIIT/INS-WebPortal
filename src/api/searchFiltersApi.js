import { handleResponse, handleError } from './apiUtils';
import env from '../utils/env';

const baseUrl = env.REACT_APP_REST_BACKEND_API;

export function getSearchFilters() {
  return fetch(`${baseUrl}filters`)
    .then(handleResponse)
    .catch(handleError);
}

export function getAdvancedSearchFilters() {
  return fetch(`${baseUrl}advancedFilters`)
    .then(handleResponse)
    .catch(handleError);
}

export default getSearchFilters;
