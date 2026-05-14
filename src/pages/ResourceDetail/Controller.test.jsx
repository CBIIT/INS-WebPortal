import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import ResourceController from './Controller';
import * as searchApi from '../../api/searchApi';

jest.mock('../error/Error', () => () => <div data-testid="error">Error occurred</div>);

jest.mock('./DetailView', () => jest.fn(({ data }) => (
  <div data-testid="detail-view" data-resource-name={data?.title} />
)));

jest.mock('../../api/searchApi');

const mockGetResourceById = searchApi.getResourceById;

const baseMatch = { params: { uuid: 'resource-123' } };

describe('ResourceController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows loading state initially', () => {
    mockGetResourceById.mockImplementation(
      () => new Promise((resolve) => {
        setTimeout(() => resolve({ data: { title: 'Test Resource' } }), 100);
      }),
    );

    render(<ResourceController match={baseMatch} />);

    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  it('renders detail view when resource data loads successfully', async () => {
    const mockData = { uuid: 'resource-123', title: 'Example Resource' };
    mockGetResourceById.mockResolvedValue({ data: mockData });

    render(<ResourceController match={baseMatch} />);

    await waitFor(() => {
      expect(screen.getByTestId('detail-view')).toBeInTheDocument();
    });

    expect(screen.getByTestId('detail-view')).toHaveAttribute(
      'data-resource-name',
      'Example Resource',
    );
  });

  it('shows error when API throws', async () => {
    mockGetResourceById.mockRejectedValue(new Error('API Error'));

    render(<ResourceController match={baseMatch} />);

    await waitFor(() => {
      expect(screen.getByTestId('error')).toBeInTheDocument();
    });

    expect(screen.queryByTestId('detail-view')).not.toBeInTheDocument();
  });

  it('shows error when response data is null', async () => {
    mockGetResourceById.mockResolvedValue(null);

    render(<ResourceController match={baseMatch} />);

    await waitFor(() => {
      expect(screen.getByTestId('error')).toBeInTheDocument();
    });
  });

  it('shows error when response.data is missing', async () => {
    mockGetResourceById.mockResolvedValue({});

    render(<ResourceController match={baseMatch} />);

    await waitFor(() => {
      expect(screen.getByTestId('error')).toBeInTheDocument();
    });
  });

  it('passes correct uuid from match params to API call', async () => {
    const mockData = { uuid: 'custom-uuid', title: 'Custom Resource' };
    mockGetResourceById.mockResolvedValue({ data: mockData });

    render(<ResourceController match={{ params: { uuid: 'custom-uuid' } }} />);

    await waitFor(() => {
      expect(screen.getByTestId('detail-view')).toBeInTheDocument();
    });

    expect(mockGetResourceById).toHaveBeenCalledWith('custom-uuid');
  });

  it('re-fetches data when uuid param changes', async () => {
    const mockData1 = { uuid: 'resource-1', title: 'Resource 1' };
    mockGetResourceById.mockResolvedValueOnce({ data: mockData1 });

    const { rerender } = render(<ResourceController match={{ params: { uuid: 'resource-1' } }} />);

    await waitFor(() => {
      expect(screen.getByTestId('detail-view')).toBeInTheDocument();
    });

    expect(mockGetResourceById).toHaveBeenCalledWith('resource-1');

    const mockData2 = { uuid: 'resource-2', title: 'Resource 2' };
    mockGetResourceById.mockResolvedValueOnce({ data: mockData2 });

    // Re-render with new uuid
    rerender(<ResourceController match={{ params: { uuid: 'resource-2' } }} />);

    await waitFor(() => {
      expect(mockGetResourceById).toHaveBeenCalledWith('resource-2');
    });

    expect(mockGetResourceById).toHaveBeenCalledTimes(2);
  });

  it('renders detail view with complex resource data', async () => {
    const mockData = {
      uuid: 'resource-advanced',
      title: 'Advanced Resource',
      resource_description: 'A detailed description',
      resource_tool_type: ['Tool Type 1'],
      resource_research_area: ['Research Area 1'],
      resource_access: 'Open',
      resource_doc: ['NCI Division 1'],
    };
    mockGetResourceById.mockResolvedValue({ data: mockData });

    render(<ResourceController match={{ params: { uuid: 'resource-advanced' } }} />);

    await waitFor(() => {
      expect(screen.getByTestId('detail-view')).toBeInTheDocument();
    });

    expect(screen.getByTestId('detail-view')).toHaveAttribute(
      'data-resource-name',
      'Advanced Resource',
    );
  });
});
