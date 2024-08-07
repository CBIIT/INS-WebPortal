import { handleResponse, handleError } from './apiUtils';
import env from '../utils/env';

const baseUrl = `${env.REACT_APP_REST_BACKEND}documents`;

export function searchDocument(body) {
  return fetch(`${baseUrl}/search`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  }).then(handleResponse)
    .catch(handleError);
}

export default searchDocument;
