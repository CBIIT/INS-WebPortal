import { handleResponse, handleError } from './apiUtils';
import env from '../utils/env';

const baseUrl = 'https://studycatalog-dev.cancer.gov/service/datasets';

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
