import { handleResponse, handleError } from './apiUtils';

const baseUrl = 'https://datacatalog-dev.ccdi.cancer.gov/service/datasets';

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
