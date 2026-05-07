import {
  getResourceById,
  getResourcesSearchFilters,
  getSearchFilters,
  searchDatasets,
  searchResources,
} from './searchApi';

jest.mock('../utils/env', () => ({
  __esModule: true,
  default: {
    REACT_APP_REST_BACKEND_API: 'http://api.example.com',
  },
}));

const mockJsonResponse = (data) => ({
  ok: true,
  json: jest.fn().mockResolvedValue(data),
});

const mockErrorResponse = ({ status, statusText = '', errorText = '' }) => ({
  ok: false,
  status,
  statusText,
  text: jest.fn().mockResolvedValue(errorText),
});

beforeEach(() => {
  jest.spyOn(console, 'error').mockImplementation(() => { });
  global.fetch = jest.fn();
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('searchDatasets', () => {
  it('posts the search body to the datasets search endpoint', async () => {
    const body = { query: 'cancer', pageInfo: { page: 1 } };
    const responseData = { results: [{ id: 'dataset-1' }] };

    global.fetch.mockResolvedValueOnce(mockJsonResponse(responseData));

    await expect(searchDatasets(body)).resolves.toEqual(responseData);

    expect(global.fetch).toHaveBeenCalledWith(
      'http://api.example.com/datasets/search',
      {
        method: 'POST',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
      },
    );
  });

  it('rejects with the server validation error when the request fails with 400', async () => {
    global.fetch.mockResolvedValueOnce(
      mockErrorResponse({
        status: 400,
        statusText: 'Bad Request',
        errorText: 'Invalid dataset search criteria',
      }),
    );

    await expect(searchDatasets({ query: '' })).rejects.toThrow(
      'Invalid dataset search criteria',
    );
  });
});

describe('getSearchFilters', () => {
  it('posts the filter body to the datasets filters endpoint', async () => {
    const body = { query: 'cancer', filters: { disease: ['Lung Cancer'] } };
    const responseData = { filters: ['disease', 'program'] };

    global.fetch.mockResolvedValueOnce(mockJsonResponse(responseData));

    await expect(getSearchFilters(body)).resolves.toEqual(responseData);

    expect(global.fetch).toHaveBeenCalledWith(
      'http://api.example.com/datasets/filters',
      {
        method: 'POST',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
      },
    );
  });

  it('rejects with a network error when the request fails with a non-400 status', async () => {
    global.fetch.mockResolvedValueOnce(
      mockErrorResponse({
        status: 500,
        statusText: 'Internal Server Error',
      }),
    );

    await expect(getSearchFilters({ query: 'cancer' })).rejects.toThrow(
      'Network response was not ok.',
    );
  });
});

describe('getResourcesSearchFilters', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('posts the filter body to the resources filters endpoint', async () => {
    const body = { query: 'genomics', filters: { access: ['Open'] } };
    const responseData = { filters: ['access', 'format'] };

    global.fetch.mockResolvedValueOnce(mockJsonResponse(responseData));

    await expect(getResourcesSearchFilters(body)).resolves.toEqual(responseData);

    expect(global.fetch).toHaveBeenCalledWith(
      'http://api.example.com/resources/filters',
      {
        method: 'POST',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
      },
    );
  });

  it('rejects with the server validation error when the request fails with 400', async () => {
    global.fetch.mockResolvedValueOnce(
      mockErrorResponse({
        status: 400,
        statusText: 'Bad Request',
        errorText: 'Invalid resource filter criteria',
      }),
    );

    await expect(getResourcesSearchFilters({ query: '' })).rejects.toThrow(
      'Invalid resource filter criteria',
    );
  });
});

describe('searchResources', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('posts the search body to the resources search endpoint', async () => {
    const body = { query: 'rna-seq', pageInfo: { page: 3 } };
    const responseData = { results: [{ id: 'resource-1' }] };

    global.fetch.mockResolvedValueOnce(mockJsonResponse(responseData));

    await expect(searchResources(body)).resolves.toEqual(responseData);

    expect(global.fetch).toHaveBeenCalledWith(
      'http://api.example.com/resources/search',
      {
        method: 'POST',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
      },
    );
  });

  it('rejects with a network error when the request fails with a non-400 status', async () => {
    global.fetch.mockResolvedValueOnce(
      mockErrorResponse({
        status: 503,
        statusText: 'Service Unavailable',
      }),
    );

    await expect(searchResources({ query: 'rna-seq' })).rejects.toThrow(
      'Network response was not ok.',
    );
  });
});

describe('getResourceById', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('fetches the resource details endpoint with the provided id', async () => {
    const resourceId = 'resource-123';
    const responseData = { uuid: resourceId, title: 'Example resource' };

    global.fetch.mockResolvedValueOnce(mockJsonResponse(responseData));

    await expect(getResourceById(resourceId)).resolves.toEqual(responseData);

    expect(global.fetch).toHaveBeenCalledWith(
      'http://api.example.com/resources/resource-123',
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        cache: 'force-cache',
      },
    );
  });

  it('rejects with a network error when the resource request fails with a non-400 status', async () => {
    global.fetch.mockResolvedValueOnce(
      mockErrorResponse({
        status: 404,
        statusText: 'Not Found',
      }),
    );

    await expect(getResourceById('resource-123')).rejects.toThrow(
      'Network response was not ok.',
    );
  });

  it('throws when the resource id is missing', async () => {
    await expect(getResourceById()).rejects.toThrow('Resource ID is required');
    expect(global.fetch).not.toHaveBeenCalled();
  });
});
