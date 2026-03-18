import env from '../utils/env';

const baseUrl = env.REACT_APP_REST_BACKEND_API;

export async function getSearchResult(body) {
  const response = await fetch(`${baseUrl}export`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    const errorText = await response.text();
    const message = `Export request failed with status ${response.status} ${response.statusText || ''}`.trim();
    throw new Error(errorText ? `${message}: ${errorText}` : message);
  }

  const blob = await response.blob();
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
  window.URL.revokeObjectURL(url);
}

export default getSearchResult;
