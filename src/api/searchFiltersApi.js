import { handleResponse, handleError } from './apiUtils';

const baseUrl = 'http://localhost:3000/service/datasets';

export function getSearchFilters() {
  return fetch(`${baseUrl}/filters`)
    .then(handleResponse)
    .catch(handleError);
}

export function getAdvancedSearchFilters() {
  return fetch(`${baseUrl}/advancedFilters`)
    .then(handleResponse)
    .catch(handleError);
}

export default getSearchFilters;
