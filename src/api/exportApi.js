const baseUrl = 'http://localhost:3000/service/datasets';

export function getSearchResult(body) {
  fetch(`${baseUrl}/export`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  }).then((response) => {
    response.blob().then((blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Childhood_Cancer_Data_Catalog_Search_Results.csv';
      a.click();
    });
  });
}

export default getSearchResult;
