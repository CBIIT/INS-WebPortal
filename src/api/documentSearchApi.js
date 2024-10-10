import { handleResponse, handleError } from './apiUtils';
import env from '../utils/env';

const baseUrl = 'https://studycatalog-dev.cancer.gov/service/datasets';

export function searchDocument(body) {
  return fetch(`${baseUrl}/search`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  }).then(handleResponse)
    .catch(handleError);
}

export default searchDocument;
