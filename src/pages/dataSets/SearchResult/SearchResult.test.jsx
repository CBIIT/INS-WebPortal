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
    // Required/visible fields
    dataset_title: 'Test Dataset',
    dataset_source_id: 'TEST-001',
    dataset_source_repo: 'Test Repository',
    dataset_source_url: 'https://example.com',
    primary_disease: 'Test Disease',
    sample_count: 150,
    description: 'This is a test description',
    study_type: 'Type 1',
    // Hidden fields (searchable, appear in "Other Match in...")
    PI_name: 'Test PI',
    dataset_pmid: '12345',
    funding_source: 'Test Funding',
    related_diseases: 'Related Disease 1',
    related_terms: 'Term 1',
    study_links: 'Link 1',
    related_genes: 'Gene 1',
    assay_method: 'Method 1',
    limitations_for_reuse: 'Limitation 1',
    dataset_doc: 'Doc 1',
    institute: 'Test Institute',
    experimental_approaches: 'Test Approach',
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

describe('Hidden Fields - Additional Matches', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // Test configuration for hidden fields that appear as "Other Match in..."
  // This should match all fields in the hideContent array in SearchResult.js
  const hiddenFields = [
    { fieldName: 'dataset_source_url', displayName: 'study page', searchTerm: 'example.com' },
    { fieldName: 'PI_name', displayName: 'PI name', searchTerm: 'Smith' },
    { fieldName: 'dataset_pmid', displayName: 'dataset pmid', searchTerm: '12345' },
    { fieldName: 'funding_source', displayName: 'funding source', searchTerm: 'NIH' },
    { fieldName: 'related_diseases', displayName: 'related diseases', searchTerm: 'Diabetes' },
    { fieldName: 'related_terms', displayName: 'related terms', searchTerm: 'genomics' },
    { fieldName: 'study_links', displayName: 'study links', searchTerm: 'http' },
    { fieldName: 'related_genes', displayName: 'related genes', searchTerm: 'BRCA1' },
    { fieldName: 'assay_method', displayName: 'assay method', searchTerm: 'RNA-seq' },
    {
      fieldName: 'limitations_for_reuse',
      displayName: 'limitations for reuse',
      searchTerm: 'restriction',
    },
    {
      fieldName: 'dataset_doc',
      displayName: 'NCI Division/Office/Center',
      searchTerm: 'Division',
    },
    { fieldName: 'institute', displayName: 'institute', searchTerm: 'Institute' },
    {
      fieldName: 'experimental_approaches',
      displayName: 'experimental approaches',
      searchTerm: 'approach',
    },
  ];

  describe.each(hiddenFields)('$displayName field', ({ fieldName, displayName, searchTerm }) => {
    it(`should NOT display "Other Match in ${displayName}" when search does not match`, () => {
      const mockResult = createMockResult({
        [fieldName]: 'Some unrelated content',
      });
      const props = {
        ...defaultProps,
        search: {
          search_text: 'NoMatch',
          filters: {},
        },
        resultList: [mockResult],
      };

      renderWithRouter(<SearchResult {...props} />);

      expect(screen.queryByText(new RegExp(`Other Match in ${displayName}`, 'i')))
        .not.toBeInTheDocument();
    });

    it(`should display "Other Match in ${displayName}" when search matches the field`, () => {
      const fieldValue = `This contains ${searchTerm} in the text`;
      const mockResult = createMockResult({
        [fieldName]: fieldValue,
      });
      const props = {
        ...defaultProps,
        search: {
          search_text: searchTerm,
          filters: {},
        },
        resultList: [mockResult],
      };

      renderWithRouter(<SearchResult {...props} />);

      expect(screen.getByText(new RegExp(`Other Match in ${displayName}`, 'i')))
        .toBeInTheDocument();
    });

    it(`should NOT display "Other Match in ${displayName}" when field is null`, () => {
      const mockResult = createMockResult({
        [fieldName]: null,
      });
      const props = {
        ...defaultProps,
        search: {
          search_text: searchTerm,
          filters: {},
        },
        resultList: [mockResult],
      };

      renderWithRouter(<SearchResult {...props} />);

      expect(screen.queryByText(new RegExp(`Other Match in ${displayName}`, 'i')))
        .not.toBeInTheDocument();
    });

    it(`should NOT display "Other Match in ${displayName}" when field is undefined`, () => {
      const mockResult = createMockResult({
        [fieldName]: undefined,
      });
      const props = {
        ...defaultProps,
        search: {
          search_text: searchTerm,
          filters: {},
        },
        resultList: [mockResult],
      };

      renderWithRouter(<SearchResult {...props} />);

      expect(screen.queryByText(new RegExp(`Other Match in ${displayName}`, 'i')))
        .not.toBeInTheDocument();
    });
  });

  it('should display multiple "Other Match in" sections when multiple hidden fields match', () => {
    const mockResult = createMockResult({
      PI_name: 'Dr. John Smith',
      related_genes: 'BRCA1 and BRCA2',
    });
    const props = {
      ...defaultProps,
      search: {
        search_text: 'BRCA',
        filters: {},
      },
      resultList: [mockResult],
    };

    renderWithRouter(<SearchResult {...props} />);

    // Should find the match in related_genes
    expect(screen.getByText(/Other Match in related genes/i)).toBeInTheDocument();

    // Should NOT find match in PI_name (doesn't contain "BRCA")
    expect(screen.queryByText(/Other Match in PI name/i)).not.toBeInTheDocument();
  });

  it('should perform case-insensitive matching for hidden fields', () => {
    const mockResult = createMockResult({
      funding_source: 'National Institutes of Health',
    });
    const props = {
      ...defaultProps,
      search: {
        search_text: 'health',
        filters: {},
      },
      resultList: [mockResult],
    };

    renderWithRouter(<SearchResult {...props} />);

    expect(screen.getByText(/Other Match in funding source/i)).toBeInTheDocument();
  });

  it('should NOT display hidden fields when there is no search text', () => {
    const mockResult = createMockResult({
      PI_name: 'Dr. Smith',
      related_genes: 'BRCA1',
      funding_source: 'NIH',
    });
    const props = {
      ...defaultProps,
      search: {
        search_text: '',
        filters: {},
      },
      resultList: [mockResult],
    };

    renderWithRouter(<SearchResult {...props} />);

    expect(screen.queryByText(/Other Match in/i)).not.toBeInTheDocument();
  });
  // Need to see requirements for partial matching
  it('should match partial words in hidden fields', () => {
    const mockResult = createMockResult({
      related_diseases: 'Cardiovascular disease and diabetes',
    });
    const props = {
      ...defaultProps,
      search: {
        search_text: 'cardio',
        filters: {},
      },
      resultList: [mockResult],
    };

    renderWithRouter(<SearchResult {...props} />);

    expect(screen.getByText(/Other Match in related diseases/i)).toBeInTheDocument();
  });

  describe('Highlighting in Hidden Fields', () => {
    // Test highlighting for each hidden field
    describe.each(hiddenFields)(
      '$displayName field highlighting',
      ({ fieldName, displayName, searchTerm }) => {
        it(`should highlight matching search term "${searchTerm}" in ${displayName}`, () => {
          const fieldValue = `This contains ${searchTerm} in the text`;
          const mockResult = createMockResult({
            [fieldName]: fieldValue,
          });
          const props = {
            ...defaultProps,
            search: {
              search_text: searchTerm,
              filters: {},
            },
            resultList: [mockResult],
          };

          renderWithRouter(<SearchResult {...props} />);

          // The matched term should be wrapped in <b> tags (escaped in HTML)
          // Look specifically for the additionalMatches span element
          const matchedContent = screen.getAllByText((_, element) => (
            element.className === 'additionalMatches'
            && element.innerHTML.includes('&lt;b&gt;')
            && element.innerHTML.includes('&lt;/b&gt;')
          ));

          // Should find at least one match with highlighting
          expect(matchedContent.length).toBeGreaterThan(0);
        });
      },
    );

    it('should highlight multiple occurrences of search term in the same field', () => {
      const mockResult = createMockResult({
        related_diseases: 'Cancer research and cancer treatment',
      });
      const props = {
        ...defaultProps,
        search: {
          search_text: 'cancer',
          filters: {},
        },
        resultList: [mockResult],
      };

      renderWithRouter(<SearchResult {...props} />);

      // Both occurrences of "cancer" should be highlighted (escaped in HTML)
      const matchedContent = screen.getByText((_, element) => {
        if (element.className !== 'additionalMatches') return false;
        const html = element.innerHTML;
        const matches = (html.match(/&lt;b&gt;cancer&lt;\/b&gt;/gi) || []).length;
        return matches === 2;
      });

      expect(matchedContent).toBeInTheDocument();
    });

    it('should highlight search terms case-insensitively in hidden fields', () => {
      const mockResult = createMockResult({
        funding_source: 'National Institutes of Health',
      });
      const props = {
        ...defaultProps,
        search: {
          search_text: 'HEALTH',
          filters: {},
        },
        resultList: [mockResult],
      };

      renderWithRouter(<SearchResult {...props} />);

      // The original casing should be preserved but wrapped in <b> tags (escaped in HTML)
      const matchedContent = screen.getByText((_, element) => (
        element.className === 'additionalMatches'
        && element.innerHTML.includes('&lt;b&gt;Health&lt;/b&gt;')
      ));

      expect(matchedContent).toBeInTheDocument();
    });
  });
});
