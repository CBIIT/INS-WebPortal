import { handleResponse, handleError } from './apiUtils';
import env from '../utils/env';

const baseUrl = env.REACT_APP_REST_BACKEND_API;

export function getSearchFilters(body) {
  return fetch(`${baseUrl}filters`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  })
    .then(handleResponse)
    .catch(handleError);
}

export function getAdvancedSearchFilters() {
  return fetch(`${baseUrl}advancedFilters`)
    .then(handleResponse)
    .catch(handleError);
}

export default getSearchFilters;
