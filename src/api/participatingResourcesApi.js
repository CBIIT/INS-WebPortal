import { handleResponse, handleError } from './apiUtils';
import env from '../utils/env';

const DATASETS_API_URL = `${env.REACT_APP_REST_BACKEND_API}/datasets/`;

export function getLandingParticipatingResources() {
  return fetch(`${DATASETS_API_URL}landing`)
    .then(handleResponse)
    .catch(handleError);
}

export function getAllParticipatingResources() {
  return fetch(`${DATASETS_API_URL}filters`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  }).then(handleResponse)
    .catch(handleError);
}

export function getSearchFilters() {
  return fetch(`${DATASETS_API_URL}filters`)
    .then(handleResponse)
    .catch(handleError);
}

export function searchParticipatingResources(body) {
  return fetch(`${DATASETS_API_URL}search`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  }).then(handleResponse)
    .catch(handleError);
}

export function getDataresourceById(id) {
  return fetch(`${DATASETS_API_URL}${id}`)
    .then(handleResponse)
    .catch(handleError);
}

export function getDatasetsById(id) {
  return fetch(`${DATASETS_API_URL}${id}/datasets`)
    .then(handleResponse)
    .catch(handleError);
}

export default getLandingParticipatingResources;
