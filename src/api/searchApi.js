import { handleResponse, handleError } from './apiUtils';
import env from '../utils/env';

const DATASETS_API_URL = `${env.REACT_APP_REST_BACKEND_API}/datasets/`;
const RESOURCES_API_URL = `${env.REACT_APP_REST_BACKEND_API}/resources/`;

/**
 * A function to call the dataset search API with the given search criteria.
 *
 * @param {Object} body JSON body for the search API
 * @returns {Promise<JSON|Error>} Promise resolving to the search results
 */
export function searchDatasets(body) {
  return fetch(`${DATASETS_API_URL}search`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  })
    .then(handleResponse)
    .catch(handleError);
}

/**
 * A function to call the search filters API with the given criteria.
 *
 * @param {Object} body JSON body for the filters API
 * @returns {Promise<JSON|Error>} Promise resolving to the filter results
 */
export function getSearchFilters(body) {
  return fetch(`${DATASETS_API_URL}filters`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  })
    .then(handleResponse)
    .catch(handleError);
}

/**
 * A function to call the resource search API with the given search criteria.
 *
 * @param {Object} body JSON body for the search API
 * @returns {Promise<JSON|Error>} Promise resolving to the search results
 */
export async function searchResources(body) {
  return fetch(`${RESOURCES_API_URL}search`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  })
    .then(handleResponse)
    .catch(handleError);
}
