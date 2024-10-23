import env from '../utils/env';

const baseUrl = 'https://studycatalog-dev.cancer.gov/service/datasets';

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

      // Get the current date and timestamp
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0'); // Add leading zero if needed
      const day = String(now.getDate()).padStart(2, '0'); // Add leading zero if needed
      const date = `${year}-${month}-${day}`;

      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      const timestamp = `${hours}-${minutes}-${seconds}`;

      // Set the filename dynamically
      a.download = `INS datasets download ${date} ${timestamp}.csv`;
      a.click();
    });
  });
}

export default getSearchResult;
