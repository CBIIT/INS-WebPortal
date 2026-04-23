import React from 'react';
import { render, screen } from '@testing-library/react';
import { useQuery } from '@apollo/client';
import DataSetDetailContainer from './Controller';
import migrateDatasetId from '../../utils/datasetUtils';

/** @param {{ to: string }} props */
function MockRedirect(props) {
  return <div data-testid="redirect">{props.to}</div>;
}

jest.mock('@apollo/client', () => ({
  useQuery: jest.fn(),
}));

jest.mock('@material-ui/core/CircularProgress', () => () => <div data-testid="loading" />);

jest.mock('react-router-dom', () => ({
  Redirect: MockRedirect,
}));

jest.mock('../error/Error', () => () => <div data-testid="error" />);

jest.mock('./dataSetDetailView', () => jest.fn(({ data, files }) => (
  <div data-testid="dataset-view" data-title={data?.dataset_title} data-file-count={files?.length || 0} />
)));

jest.mock('../../bento/datasetDetailData', () => ({
  getDataSetDetailDataQuery: 'GET_DATASET_DETAILS_QUERY',
  getDatasetFilesQuery: 'GET_DATASET_FILES_QUERY',
}));

jest.mock('../../utils/datasetUtils', () => jest.fn());

const mockUseQuery = useQuery;
const mockMigrateDatasetId = migrateDatasetId;

const baseMatch = { params: { id: 'incoming-id' } };

describe('DataSetDetailContainer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('redirects when incoming id is migrated', () => {
    mockMigrateDatasetId.mockReturnValue({ originalId: 'old-id', migratedId: 'new-id' });

    render(<DataSetDetailContainer match={baseMatch} />);

    expect(screen.getByTestId('redirect')).toHaveTextContent('/dataset/new-id');
    expect(mockUseQuery).not.toHaveBeenCalled();
  });

  it('shows loading when details query is loading', () => {
    mockMigrateDatasetId.mockReturnValue({ originalId: 'id', migratedId: 'id' });
    mockUseQuery
      .mockReturnValueOnce({ loading: true, error: null, data: null })
      .mockReturnValueOnce({ loading: false, error: null, data: { getDatasetFiles: [] } });

    render(<DataSetDetailContainer match={baseMatch} />);

    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });

  it('shows loading when files query is loading', () => {
    mockMigrateDatasetId.mockReturnValue({ originalId: 'id', migratedId: 'id' });
    mockUseQuery
      .mockReturnValueOnce({ loading: false, error: null, data: { datasetDetails: { dataset_title: 'T1' } } })
      .mockReturnValueOnce({ loading: true, error: null, data: null });

    render(<DataSetDetailContainer match={baseMatch} />);

    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });

  it('shows error when details query errors', () => {
    mockMigrateDatasetId.mockReturnValue({ originalId: 'id', migratedId: 'id' });
    mockUseQuery
      .mockReturnValueOnce({ loading: false, error: new Error('details failed'), data: null })
      .mockReturnValueOnce({ loading: false, error: null, data: { getDatasetFiles: [] } });

    render(<DataSetDetailContainer match={baseMatch} />);

    expect(screen.getByTestId('error')).toBeInTheDocument();
  });

  it('shows error when datasetDetails payload is missing', () => {
    mockMigrateDatasetId.mockReturnValue({ originalId: 'id', migratedId: 'id' });
    mockUseQuery
      .mockReturnValueOnce({ loading: false, error: null, data: {} })
      .mockReturnValueOnce({ loading: false, error: null, data: { getDatasetFiles: [] } });

    render(<DataSetDetailContainer match={baseMatch} />);

    expect(screen.getByTestId('error')).toBeInTheDocument();
  });

  it('renders view with empty files when files query errors', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
    mockMigrateDatasetId.mockReturnValue({ originalId: 'id', migratedId: 'id' });
    mockUseQuery
      .mockReturnValueOnce({
        loading: false,
        error: null,
        data: { datasetDetails: { dataset_title: 'Dataset X' } },
      })
      .mockReturnValueOnce({
        loading: false,
        error: new Error('files failed'),
        data: null,
      });

    render(<DataSetDetailContainer match={baseMatch} />);

    expect(screen.getByTestId('dataset-view')).toBeInTheDocument();
    expect(screen.getByTestId('dataset-view')).toHaveAttribute('data-file-count', '0');
    expect(consoleSpy).toHaveBeenCalled();

    consoleSpy.mockRestore();
  });

  it('renders view with files when files query succeeds', () => {
    mockMigrateDatasetId.mockReturnValue({ originalId: 'id', migratedId: 'id' });
    mockUseQuery
      .mockReturnValueOnce({
        loading: false,
        error: null,
        data: { datasetDetails: { dataset_title: 'Dataset Y' } },
      })
      .mockReturnValueOnce({
        loading: false,
        error: null,
        data: { getDatasetFiles: [{ file_id: 'f1' }, { file_id: 'f2' }] },
      });

    render(<DataSetDetailContainer match={baseMatch} />);

    expect(screen.getByTestId('dataset-view')).toBeInTheDocument();
    expect(screen.getByTestId('dataset-view')).toHaveAttribute('data-file-count', '2');
  });

  it('uses migrated ID in both GraphQL queries and sets skip when migrated id is empty', () => {
    mockMigrateDatasetId.mockReturnValue({ originalId: '', migratedId: '' });
    mockUseQuery
      .mockReturnValueOnce({ loading: false, error: null, data: null })
      .mockReturnValueOnce({ loading: false, error: null, data: null });

    render(<DataSetDetailContainer match={{ params: { id: '' } }} />);

    expect(mockUseQuery).toHaveBeenNthCalledWith(1, 'GET_DATASET_DETAILS_QUERY', {
      variables: { dataset_uuid: '' },
      skip: true,
    });
    expect(mockUseQuery).toHaveBeenNthCalledWith(2, 'GET_DATASET_FILES_QUERY', {
      variables: {
        dataset_uuid: '',
        accessTypes: ['Open'],
      },
      skip: true,
    });

    expect(screen.getByTestId('error')).toBeInTheDocument();
  });
});
