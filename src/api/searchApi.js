import { handleResponse, handleError } from './apiUtils';
import env from '../utils/env';

const baseUrl = 'https://studycatalog-dev.cancer.gov/service/datasets';

// export function searchCatalog(body) {
export function searchCatalog() {
  console.log('searchCatalog');
  const body = {
    search_text: 'the cancer',
    filters: {
      primary_disease: [
        'Carcinoma, Non-Small-Cell Lung',
        'Burkitt Lymphoma',
      ],
    },
    pageInfo: {
      page: 1,
      pageSize: 10,
    },
    sort: {
      name: 'Dataset',
      k: 'dataset_pmid.sort',
      v: 'asc',
    },
    viewType: 'card',
  };
  return fetch(`${baseUrl}/search`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  }).then(handleResponse)
    .catch(handleError);
}

export function getDatasetById(id) {
  return fetch(`${baseUrl}/${id}`)
    .then(handleResponse)
    .catch(handleError);
}

export default searchCatalog;
