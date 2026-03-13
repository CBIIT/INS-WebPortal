import React from 'react';
import {
  render,
  screen,
  fireEvent,
  act,
} from '@testing-library/react';
import ExportButton from './ExportButton';
import * as exportApi from '../../../api/exportApi';

// Mock the export API
jest.mock('../../../api/exportApi', () => ({
  getSearchResult: jest.fn(),
}));

// Mock the CSS import
jest.mock('./ExportButton.css', () => ({}));

// Mock the SVG import
jest.mock('./export.svg', () => 'export-icon.svg');

const defaultSearchCriteria = {
  search_text: '',
  filters: {
    primary_disease: [],
    dataset_source_repo: [],
  },
  pageInfo: {
    page: 1,
    pageSize: 10,
  },
  sort: {
    name: 'Dataset',
    k: 'dataset_title_sort',
    v: 'asc',
  },
};

// Helper to flush promises
const flushPromises = () => new Promise((resolve) => setImmediate(resolve));

describe('ExportButton', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render the export button', () => {
      render(<ExportButton searchCriteria={defaultSearchCriteria} />);

      expect(screen.getByRole('button')).toBeInTheDocument();
      expect(screen.getByText('Export')).toBeInTheDocument();
    });

    it('should render the export icon', () => {
      render(<ExportButton searchCriteria={defaultSearchCriteria} />);

      const icon = screen.getByAltText('export-icon');
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute('src', 'export-icon.svg');
    });

    it('should have the correct button class', () => {
      render(<ExportButton searchCriteria={defaultSearchCriteria} />);

      const button = screen.getByRole('button');
      expect(button).toHaveClass('buttonStyle');
    });

    it('should not be disabled by default', () => {
      render(<ExportButton searchCriteria={defaultSearchCriteria} />);

      const button = screen.getByRole('button');
      expect(button).not.toBeDisabled();
    });
  });

  describe('Export Functionality', () => {
    it('should call exportApi.getSearchResult when clicked', () => {
      exportApi.getSearchResult.mockResolvedValueOnce();

      render(<ExportButton searchCriteria={defaultSearchCriteria} />);

      const button = screen.getByRole('button');
      fireEvent.click(button);

      expect(exportApi.getSearchResult).toHaveBeenCalledWith(defaultSearchCriteria);
    });

    it('should pass searchCriteria with filters to the API', () => {
      const searchCriteriaWithFilters = {
        ...defaultSearchCriteria,
        search_text: 'cancer',
        filters: {
          primary_disease: ['Breast Cancer'],
          dataset_source_repo: ['dbGaP'],
        },
      };

      exportApi.getSearchResult.mockResolvedValueOnce();

      render(<ExportButton searchCriteria={searchCriteriaWithFilters} />);

      const button = screen.getByRole('button');
      fireEvent.click(button);

      expect(exportApi.getSearchResult).toHaveBeenCalledWith(searchCriteriaWithFilters);
    });
  });

  describe('Loading State', () => {
    it('should disable the button while export is in progress', () => {
      exportApi.getSearchResult.mockImplementationOnce(
        () => new Promise(() => {}),
      );

      render(<ExportButton searchCriteria={defaultSearchCriteria} />);

      const button = screen.getByRole('button');
      fireEvent.click(button);

      // Button should be disabled while waiting
      expect(button).toBeDisabled();
    });

    it('should prevent multiple clicks while export is in progress', () => {
      exportApi.getSearchResult.mockImplementationOnce(
        () => new Promise(() => {}),
      );

      render(<ExportButton searchCriteria={defaultSearchCriteria} />);

      const button = screen.getByRole('button');

      // First click
      fireEvent.click(button);
      expect(exportApi.getSearchResult).toHaveBeenCalledTimes(1);

      // Second click while disabled
      fireEvent.click(button);
      expect(exportApi.getSearchResult).toHaveBeenCalledTimes(1);

      // Third click while disabled
      fireEvent.click(button);
      expect(exportApi.getSearchResult).toHaveBeenCalledTimes(1);
    });

    it('should re-enable button after export completes successfully', async () => {
      exportApi.getSearchResult.mockResolvedValueOnce();

      render(<ExportButton searchCriteria={defaultSearchCriteria} />);

      const button = screen.getByRole('button');

      await act(async () => {
        fireEvent.click(button);
        await flushPromises();
      });

      expect(button).not.toBeDisabled();
    });

    it('should re-enable button even if export fails', async () => {
      exportApi.getSearchResult.mockImplementationOnce(
        () => Promise.reject(new Error('Export failed')),
      );

      render(<ExportButton searchCriteria={defaultSearchCriteria} />);

      const button = screen.getByRole('button');

      await act(async () => {
        fireEvent.click(button);
        // Allow promise rejection to be handled
        await flushPromises();
      });

      expect(button).not.toBeDisabled();
    });

    it('should allow clicking again after previous export completes', async () => {
      exportApi.getSearchResult.mockResolvedValue();

      render(<ExportButton searchCriteria={defaultSearchCriteria} />);

      const button = screen.getByRole('button');

      // First export
      await act(async () => {
        fireEvent.click(button);
        await flushPromises();
      });

      expect(button).not.toBeDisabled();

      // Second export should work
      await act(async () => {
        fireEvent.click(button);
      });

      expect(exportApi.getSearchResult).toHaveBeenCalledTimes(2);
    });
  });
});
