import { handleResponse, handleError } from './apiUtils';

const baseUrl = 'https://datacatalog-dev.ccdi.cancer.gov/service/documents';

export function searchDocument(body) {
  return fetch(`${baseUrl}/search`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  }).then(handleResponse)
    .catch(handleError);
}

export default searchDocument;
