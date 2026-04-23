import { handleResponse, handleError } from './apiUtils';
import env from '../utils/env';

const DATASETS_API_URL = `${env.REACT_APP_REST_BACKEND_API}/datasets/`;

export function getSearchFilters(body) {
  return fetch(`${DATASETS_API_URL}filters`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  })
    .then(handleResponse)
    .catch(handleError);
}

export function getAdvancedSearchFilters() {
  return fetch(`${DATASETS_API_URL}advancedFilters`)
    .then(handleResponse)
    .catch(handleError);
}

export default getSearchFilters;
