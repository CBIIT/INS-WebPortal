import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SearchResult from './SearchResult';

// Mock react-router-dom hooks
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    search: '?search_text=test',
  }),
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

// Mock bootstrap Popover
jest.mock('bootstrap', () => ({
  Popover: jest.fn(),
}));

// Mock html-react-parser
jest.mock('html-react-parser', () => jest.fn((str) => str));

// Helper function to create a mock result with configurable fields
// Usage: createMockResult({ sample_count: 100, study_type: 'Clinical Trial' })
// Pass any field you want to override from the defaults
const createMockResult = (overrides = {}) => ({
  content: {
    dataset_title: 'Test Dataset',
    dataset_source_id: 'TEST-001',
    dataset_source_repo: 'Test Repository',
    dataset_source_url: 'https://example.com',
    primary_disease: 'Test Disease',
    sample_count: 150,
    description: 'This is a test description',
    PI_name: 'Test PI',
    dataset_pmid: '12345',
    funding_source: 'Test Funding',
    related_diseases: 'Related Disease 1',
    related_terms: 'Term 1',
    study_links: 'Link 1',
    related_genes: 'Gene 1',
    study_type: 'Type 1',
    assay_method: 'Method 1',
    limitations_for_reuse: 'Limitation 1',
    dataset_doc: 'Doc 1',
    ...overrides,
  },
});

// Default props for SearchResult component
const defaultProps = {
  resultList: [],
  sort: {
    name: 'Dataset',
    k: 'dataset_title_sort',
    v: 'asc',
  },
  search: {
    search_text: 'test',
    filters: {},
  },
  onChangeSorting: jest.fn(),
  onChangeSortingOrder: jest.fn(),
  glossaryTerms: [],
};

// Wrapper component to provide router context
const renderWithRouter = (component) => render(
  <BrowserRouter>
    {component}
  </BrowserRouter>,
);

describe('Basic Functionality', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should display no result message when resultList is empty', () => {
    const props = {
      ...defaultProps,
      resultList: [],
    };

    renderWithRouter(<SearchResult {...props} />);

    // Check for the no results message
    expect(
      screen.getByText(/No result found. Please refine your search./i),
    ).toBeInTheDocument();
  });

  it('should still render other dataset information when optional fields are not present', () => {
    const mockResultWithoutOptionalFields = createMockResult({
      sample_count: null,
      study_type: null,
    });
    const props = {
      ...defaultProps,
      resultList: [mockResultWithoutOptionalFields],
    };

    renderWithRouter(<SearchResult {...props} />);

    // Check that required elements are still rendered
    expect(screen.getByText('Test Dataset')).toBeInTheDocument();
    expect(screen.getByText(/Primary Disease:/i)).toBeInTheDocument();
    const primaryDiseaseElement = screen.getByText((_, element) => (
      element.className === 'itemSpan' && element.textContent.includes('Disease')
    ));
    expect(primaryDiseaseElement).toBeInTheDocument();
    expect(screen.getByText(/Description:/i)).toBeInTheDocument();

    // But optional fields should not be rendered
    expect(screen.queryByText(/Sample Count:/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Study Type:/i)).not.toBeInTheDocument();
  });
});

describe('Conditional Field Rendering', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // Common tests for fields that support conditional rendering
  describe.each([
    {
      fieldName: 'sample_count',
      fieldLabel: 'Sample Count',
      labelRegex: /Sample Count:/i,
      validValue: 100,
      isNumeric: true,
    },
    {
      fieldName: 'study_type',
      fieldLabel: 'Study Type',
      labelRegex: /Study Type:/i,
      validValue: 'Clinical Trial',
      isNumeric: false,
    },
  ])('$fieldLabel field', ({
    fieldName, fieldLabel, labelRegex, validValue, isNumeric,
  }) => {
    it(`should NOT display ${fieldLabel} when it is null`, () => {
      const mockResult = createMockResult({ [fieldName]: null });
      const props = {
        ...defaultProps,
        resultList: [mockResult],
      };

      renderWithRouter(<SearchResult {...props} />);

      expect(screen.queryByText(labelRegex)).not.toBeInTheDocument();
    });

    it(`should NOT display ${fieldLabel} when it is undefined`, () => {
      const mockResult = createMockResult({ [fieldName]: undefined });
      const props = {
        ...defaultProps,
        resultList: [mockResult],
      };

      renderWithRouter(<SearchResult {...props} />);

      expect(screen.queryByText(labelRegex)).not.toBeInTheDocument();
    });

    it(`should NOT display ${fieldLabel} when it is an empty string`, () => {
      const mockResult = createMockResult({ [fieldName]: '' });
      const props = {
        ...defaultProps,
        resultList: [mockResult],
      };

      renderWithRouter(<SearchResult {...props} />);

      expect(screen.queryByText(labelRegex)).not.toBeInTheDocument();
    });

    it(`should display ${fieldLabel} only for results that have valid values`, () => {
      const resultWithValue = createMockResult({ [fieldName]: validValue });
      const resultWithNull = createMockResult({ [fieldName]: null });
      const resultWithEmpty = createMockResult({ [fieldName]: '' });

      const props = {
        ...defaultProps,
        resultList: [resultWithValue, resultWithNull, resultWithEmpty],
      };

      renderWithRouter(<SearchResult {...props} />);

      // Should find exactly one label
      const labels = screen.queryAllByText(labelRegex);
      expect(labels).toHaveLength(1);

      // Should display the valid value
      expect(screen.getByText(validValue.toString())).toBeInTheDocument();
    });

    // Numeric-specific tests
    if (isNumeric) {
      it(`should display ${fieldLabel} when it has a valid numeric value`, () => {
        const mockResult = createMockResult({ [fieldName]: 150 });
        const props = {
          ...defaultProps,
          resultList: [mockResult],
        };

        renderWithRouter(<SearchResult {...props} />);

        expect(screen.getByText(labelRegex)).toBeInTheDocument();
        expect(screen.getByText('150')).toBeInTheDocument();
      });

      it(`should display ${fieldLabel} when it has a string numeric value`, () => {
        const mockResult = createMockResult({ [fieldName]: '200' });
        const props = {
          ...defaultProps,
          resultList: [mockResult],
        };

        renderWithRouter(<SearchResult {...props} />);

        expect(screen.getByText(labelRegex)).toBeInTheDocument();
        expect(screen.getByText('200')).toBeInTheDocument();
      });

      it(`should display ${fieldLabel} with value of 0`, () => {
        const mockResult = createMockResult({ [fieldName]: 0 });
        const props = {
          ...defaultProps,
          resultList: [mockResult],
        };

        renderWithRouter(<SearchResult {...props} />);

        expect(screen.getByText(labelRegex)).toBeInTheDocument();
        expect(screen.getByText('0')).toBeInTheDocument();
      });
    }
  });
});
