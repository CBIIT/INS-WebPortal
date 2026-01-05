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

  it('should display sample count when it has a valid numeric value', () => {
    const mockResultWithSampleCount = createMockResult({ sample_count: 150 });
    const props = {
      ...defaultProps,
      resultList: [mockResultWithSampleCount],
    };

    renderWithRouter(<SearchResult {...props} />);

    // Check that "Sample Count:" label is displayed
    expect(screen.getByText(/Sample Count:/i)).toBeInTheDocument();

    // Check that the sample count value is displayed
    expect(screen.getByText('150')).toBeInTheDocument();
  });

  it('should display sample count when it has a string numeric value', () => {
    const mockResultWithSampleCount = createMockResult({ sample_count: '200' });
    const props = {
      ...defaultProps,
      resultList: [mockResultWithSampleCount],
    };

    renderWithRouter(<SearchResult {...props} />);

    // Check that "Sample Count:" label is displayed
    expect(screen.getByText(/Sample Count:/i)).toBeInTheDocument();

    // Check that the sample count value is displayed
    expect(screen.getByText('200')).toBeInTheDocument();
  });

  it('should display sample count with value of 0', () => {
    const mockResultWithSampleCount = createMockResult({ sample_count: 0 });
    const props = {
      ...defaultProps,
      resultList: [mockResultWithSampleCount],
    };

    renderWithRouter(<SearchResult {...props} />);

    // Check that "Sample Count:" label is displayed
    expect(screen.getByText(/Sample Count:/i)).toBeInTheDocument();

    // Check that the sample count value is displayed
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('should still render other dataset information when sample count is not present', () => {
    const mockResultWithoutSampleCount = createMockResult({ sample_count: null });
    const props = {
      ...defaultProps,
      resultList: [mockResultWithoutSampleCount],
    };

    renderWithRouter(<SearchResult {...props} />);

    // Check that other elements are still rendered
    expect(screen.getByText('Test Dataset')).toBeInTheDocument();
    expect(screen.getByText(/Primary Disease:/i)).toBeInTheDocument();
    // Primary disease text may be highlighted (wrapped in <b> tags), so check it exists in the document
    const primaryDiseaseElement = screen.getByText((content, element) => (
      // Check if element contains the disease name (may have HTML tags)
      element.className === 'itemSpan' && element.textContent.includes('Disease')
    ));
    expect(primaryDiseaseElement).toBeInTheDocument();
    expect(screen.getByText(/Description:/i)).toBeInTheDocument();

    // But sample count should not be rendered
    expect(screen.queryByText(/Sample Count:/i)).not.toBeInTheDocument();
  });

  it('should display no result message when resultList is empty', () => {
    const props = {
      ...defaultProps,
      resultList: [],
    };

    renderWithRouter(<SearchResult {...props} />);

    // Check for the no results message
    expect(screen.getByText(/No result found. Please refine your search./i)).toBeInTheDocument();
  });

  it('should display study type when it has a valid value', () => {
    const mockResultWithStudyType = createMockResult({ study_type: 'Observational Study' });
    const props = {
      ...defaultProps,
      resultList: [mockResultWithStudyType],
    };

    renderWithRouter(<SearchResult {...props} />);

    // Check that "Study Type:" label is displayed
    expect(screen.getByText(/Study Type:/i)).toBeInTheDocument();

    // Check that the study type value is displayed
    expect(screen.getByText('Observational Study')).toBeInTheDocument();
  });

  it('should still render other dataset information when study type is not present', () => {
    const mockResultWithoutStudyType = createMockResult({ study_type: null });
    const props = {
      ...defaultProps,
      resultList: [mockResultWithoutStudyType],
    };

    renderWithRouter(<SearchResult {...props} />);

    // Check that other elements are still rendered
    expect(screen.getByText('Test Dataset')).toBeInTheDocument();
    expect(screen.getByText(/Primary Disease:/i)).toBeInTheDocument();
    expect(screen.getByText(/Description:/i)).toBeInTheDocument();

    // But study type should not be rendered
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
    },
    {
      fieldName: 'study_type',
      fieldLabel: 'Study Type',
      labelRegex: /Study Type:/i,
      validValue: 'Clinical Trial',
    },
  ])('$fieldLabel field', ({ fieldName, fieldLabel, labelRegex, validValue }) => {
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
  });
});
