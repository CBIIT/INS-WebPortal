import getSearchResultUtil from './exportApi';

// Mock the env module
jest.mock('../utils/env', () => ({
  REACT_APP_REST_BACKEND_API: 'http://api.example.com',
}));

describe('getSearchResultUtil tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Mock window methods
    Object.defineProperty(window, 'URL', {
      value: {
        createObjectURL: jest.fn(() => 'blob:mock-url'),
        revokeObjectURL: jest.fn(),
      },
      writable: true,
    });
    // Mock document.createElement
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should fetch from the correct API endpoint', async () => {
    const mockBlob = new Blob(['test data'], { type: 'text/csv' });
    global.fetch.mockResolvedValueOnce({
      ok: true,
      blob: jest.fn().mockResolvedValueOnce(mockBlob),
    });

    const body = {
      search_text: 'cancer',
      filters: { disease: ['Lung Cancer'] },
      pageInfo: { total: 100 },
    };

    await getSearchResultUtil(body);

    expect(global.fetch).toHaveBeenCalledWith(
      'http://api.example.com/datasets/export',
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      }),
    );
  });

  it('should send correct request body with pageInfo.total', async () => {
    const mockBlob = new Blob(['test data'], { type: 'text/csv' });
    global.fetch.mockResolvedValueOnce({
      ok: true,
      blob: jest.fn().mockResolvedValueOnce(mockBlob),
    });

    const body = {
      search_text: 'cancer',
      filters: { disease: ['Lung Cancer'] },
      pageInfo: { page: 2, total: 500 },
    };

    await getSearchResultUtil(body);

    const callArgs = global.fetch.mock.calls[0][1];
    const requestBody = JSON.parse(callArgs.body);

    expect(requestBody).toEqual({
      search_text: 'cancer',
      filters: { disease: ['Lung Cancer'] },
      pageInfo: { page: 1, pageSize: 500 },
    });
  });

  it('should use default pageSize of 10000 when pageInfo.total is undefined', async () => {
    const mockBlob = new Blob(['test data'], { type: 'text/csv' });
    global.fetch.mockResolvedValueOnce({
      ok: true,
      blob: jest.fn().mockResolvedValueOnce(mockBlob),
    });

    const body = {
      search_text: 'cancer',
      filters: { disease: ['Lung Cancer'] },
      pageInfo: {},
    };

    await getSearchResultUtil(body);

    const callArgs = global.fetch.mock.calls[0][1];
    const requestBody = JSON.parse(callArgs.body);

    expect(requestBody.pageInfo.pageSize).toBe(10000);
  });

  it('should handle null body gracefully', async () => {
    const mockBlob = new Blob(['test data'], { type: 'text/csv' });
    global.fetch.mockResolvedValueOnce({
      ok: true,
      blob: jest.fn().mockResolvedValueOnce(mockBlob),
    });

    await getSearchResultUtil(null);

    const callArgs = global.fetch.mock.calls[0][1];
    const requestBody = JSON.parse(callArgs.body);

    expect(requestBody.pageInfo.pageSize).toBe(10000);
  });

  it('should handle undefined body gracefully', async () => {
    const mockBlob = new Blob(['test data'], { type: 'text/csv' });
    global.fetch.mockResolvedValueOnce({
      ok: true,
      blob: jest.fn().mockResolvedValueOnce(mockBlob),
    });

    await getSearchResultUtil(undefined);

    const callArgs = global.fetch.mock.calls[0][1];
    const requestBody = JSON.parse(callArgs.body);

    expect(requestBody.pageInfo.pageSize).toBe(10000);
  });

  it('should create a download link with the correct filename format', async () => {
    const mockBlob = new Blob(['test data'], { type: 'text/csv' });
    global.fetch.mockResolvedValueOnce({
      ok: true,
      blob: jest.fn().mockResolvedValueOnce(mockBlob),
    });

    const createElementSpy = jest.spyOn(document, 'createElement');
    const clickSpy = jest.fn();

    createElementSpy.mockReturnValueOnce({
      href: '',
      download: '',
      click: clickSpy,
    });

    await getSearchResultUtil({ pageInfo: { total: 100 } });

    const aElement = createElementSpy.mock.results[0].value;
    expect(aElement.download).toMatch(/^INS datasets download \d{4}-\d{2}-\d{2} \d{2}-\d{2}-\d{2}\.csv$/);
  });

  it('should set the download filename with proper date and time format', async () => {
    const mockBlob = new Blob(['test data'], { type: 'text/csv' });
    global.fetch.mockResolvedValueOnce({
      ok: true,
      blob: jest.fn().mockResolvedValueOnce(mockBlob),
    });

    const createElementSpy = jest.spyOn(document, 'createElement');
    const clickSpy = jest.fn();

    createElementSpy.mockReturnValueOnce({
      href: '',
      download: '',
      click: clickSpy,
    });

    // Mock Date to control the timestamp
    const mockDate = new Date('2026-03-20T14:30:45');
    jest.spyOn(global, 'Date').mockImplementation(() => mockDate);

    await getSearchResultUtil({ pageInfo: { total: 100 } });

    const aElement = createElementSpy.mock.results[0].value;
    expect(aElement.download).toBe('INS datasets download 2026-03-20 14-30-45.csv');
  });

  it('should trigger the click event to download the file', async () => {
    const mockBlob = new Blob(['test data'], { type: 'text/csv' });
    global.fetch.mockResolvedValueOnce({
      ok: true,
      blob: jest.fn().mockResolvedValueOnce(mockBlob),
    });

    const createElementSpy = jest.spyOn(document, 'createElement');
    const clickSpy = jest.fn();

    createElementSpy.mockReturnValueOnce({
      href: '',
      download: '',
      click: clickSpy,
    });

    await getSearchResultUtil({ pageInfo: { total: 100 } });

    expect(clickSpy).toHaveBeenCalled();
  });

  it('should revoke the object URL after download', async () => {
    const mockBlob = new Blob(['test data'], { type: 'text/csv' });
    global.fetch.mockResolvedValueOnce({
      ok: true,
      blob: jest.fn().mockResolvedValueOnce(mockBlob),
    });

    const createElementSpy = jest.spyOn(document, 'createElement');

    createElementSpy.mockReturnValueOnce({
      href: '',
      download: '',
      click: jest.fn(),
    });

    await getSearchResultUtil({ pageInfo: { total: 100 } });

    expect(window.URL.revokeObjectURL).toHaveBeenCalledWith('blob:mock-url');
  });

  it('should throw error with message when response is not ok', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
      status: 400,
      statusText: 'Bad Request',
      text: jest.fn().mockResolvedValueOnce('Invalid search criteria'),
    });

    const body = { search_text: 'test', pageInfo: { total: 100 } };

    await expect(getSearchResultUtil(body)).rejects.toThrow(
      'Export request failed with status 400 Bad Request: Invalid search criteria',
    );
  });

  it('should throw error with generic message when response error has no text', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error',
      text: jest.fn().mockResolvedValueOnce(''),
    });

    const body = { search_text: 'test', pageInfo: { total: 100 } };

    await expect(getSearchResultUtil(body)).rejects.toThrow(
      'Export request failed with status 500 Internal Server Error',
    );
  });

  it('should throw error when status is provided but statusText is empty', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
      status: 403,
      statusText: '',
      text: jest.fn().mockResolvedValueOnce('Forbidden'),
    });

    const body = { search_text: 'test', pageInfo: { total: 100 } };

    await expect(getSearchResultUtil(body)).rejects.toThrow(
      'Export request failed with status 403: Forbidden',
    );
  });

  it('should preserve search body fields while modifying pageInfo', async () => {
    const mockBlob = new Blob(['test data'], { type: 'text/csv' });
    global.fetch.mockResolvedValueOnce({
      ok: true,
      blob: jest.fn().mockResolvedValueOnce(mockBlob),
    });

    const body = {
      search_text: 'cancer',
      filters: { disease: ['Lung'], source: ['dbGaP'] },
      sort: { field: 'name', order: 'asc' },
      pageInfo: { page: 5, pageSize: 20, total: 1000 },
    };

    await getSearchResultUtil(body);

    const callArgs = global.fetch.mock.calls[0][1];
    const requestBody = JSON.parse(callArgs.body);

    expect(requestBody.search_text).toBe('cancer');
    expect(requestBody.filters).toEqual({ disease: ['Lung'], source: ['dbGaP'] });
    expect(requestBody.sort).toEqual({ field: 'name', order: 'asc' });
    expect(requestBody.pageInfo).toEqual({ page: 1, pageSize: 1000 });
  });

  it('should handle fetch network errors', async () => {
    const networkError = new Error('Network request failed');
    global.fetch.mockRejectedValueOnce(networkError);

    const body = { search_text: 'test', pageInfo: { total: 100 } };

    await expect(getSearchResultUtil(body)).rejects.toThrow('Network request failed');
  });

  it('should set blob as href on the anchor element', async () => {
    const mockBlob = new Blob(['test data'], { type: 'text/csv' });
    global.fetch.mockResolvedValueOnce({
      ok: true,
      blob: jest.fn().mockResolvedValueOnce(mockBlob),
    });

    const createElementSpy = jest.spyOn(document, 'createElement');
    createElementSpy.mockReturnValueOnce({
      href: '',
      download: '',
      click: jest.fn(),
    });

    await getSearchResultUtil({ pageInfo: { total: 100 } });

    const aElement = createElementSpy.mock.results[0].value;
    expect(aElement.href).toBe('blob:mock-url');
  });

  it('should handle zero as a valid pageInfo.total value', async () => {
    const mockBlob = new Blob(['test data'], { type: 'text/csv' });
    global.fetch.mockResolvedValueOnce({
      ok: true,
      blob: jest.fn().mockResolvedValueOnce(mockBlob),
    });

    const body = { pageInfo: { total: 0 } };

    await getSearchResultUtil(body);

    const callArgs = global.fetch.mock.calls[0][1];
    const requestBody = JSON.parse(callArgs.body);

    expect(requestBody.pageInfo.pageSize).toBe(0);
  });

  it('should handle large pageInfo.total values', async () => {
    const mockBlob = new Blob(['test data'], { type: 'text/csv' });
    global.fetch.mockResolvedValueOnce({
      ok: true,
      blob: jest.fn().mockResolvedValueOnce(mockBlob),
    });

    const body = { pageInfo: { total: 1000000 } };

    await getSearchResultUtil(body);

    const callArgs = global.fetch.mock.calls[0][1];
    const requestBody = JSON.parse(callArgs.body);

    expect(requestBody.pageInfo.pageSize).toBe(1000000);
  });
});
