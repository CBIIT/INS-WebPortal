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
 * A function to call the resource search filters API with the given criteria.
 *
 * @param {Object} body JSON body for the filters API
 * @returns {Promise<JSON|Error>} Promise resolving to the filter results
 */
export function getResourcesSearchFilters(body) {
  return fetch(`${RESOURCES_API_URL}filters`, {
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

/**
 * A function to call the resource details API with the given resource ID.
 *
 * @param {string} uuid The unique identifier of the resource
 * @returns {Promise<JSON|Error>} Promise resolving to the resource details
 */
export async function getResourceById(uuid) {
  if (!uuid) {
    throw new Error('Resource ID is required');
  }

  return fetch(`${RESOURCES_API_URL}${uuid}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    cache: 'force-cache',
  })
    .then(handleResponse)
    .catch(handleError);
}
