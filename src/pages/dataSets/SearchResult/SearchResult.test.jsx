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
// With highlights: createMockResult({
//   primary_disease: 'Breast Cancer',
//   highlight: { 'primary_disease.search': ['Breast <b>Cancer</b>'] }
// })
// Note: highlight keys follow the pattern 'fieldName.search' and map to arrays of
// HTML-highlighted strings as returned by the search backend
const createMockResult = (overrides = {}) => {
  const { highlight, ...contentOverrides } = overrides;
  return {
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
      ...contentOverrides,
    },
    highlight: highlight || {},
  };
};

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
    const primaryDiseaseElement = screen.getByTestId('primary-disease');
    expect(primaryDiseaseElement).toBeInTheDocument();
    expect(screen.getByText(/Description:/i)).toBeInTheDocument();

    // But optional fields should not be rendered
    expect(screen.queryByText(/Sample Count:/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Study Type:/i)).not.toBeInTheDocument();
  });

  it('should handle null description by converting it to empty string', () => {
    const mockResultWithNullDescription = createMockResult({
      description: null,
    });
    const props = {
      ...defaultProps,
      resultList: [mockResultWithNullDescription],
    };

    renderWithRouter(<SearchResult {...props} />);

    // Should still render the card without crashing
    expect(screen.getByText('Test Dataset')).toBeInTheDocument();
    expect(screen.getByText(/Primary Disease:/i)).toBeInTheDocument();

    // Description label should not appear when description is empty
    expect(screen.queryByText(/Description:/i)).not.toBeInTheDocument();
  });

  it('should handle null primary_disease without crashing', () => {
    const mockResult = createMockResult({
      primary_disease: null,
    });
    const props = {
      ...defaultProps,
      search: {
        search_text: 'test',
        filters: {},
      },
      resultList: [mockResult],
    };

    renderWithRouter(<SearchResult {...props} />);

    // Should still render the card
    expect(screen.getByText('Test Dataset')).toBeInTheDocument();
    // Primary disease section should still be there (empty value)
    expect(screen.getByText(/Primary Disease:/i)).toBeInTheDocument();
  });

  it('should handle empty primary_disease without crashing', () => {
    const mockResult = createMockResult({
      primary_disease: '',
    });
    const props = {
      ...defaultProps,
      search: {
        search_text: 'test',
        filters: {},
      },
      resultList: [mockResult],
    };

    renderWithRouter(<SearchResult {...props} />);

    // Should still render the card
    expect(screen.getByText('Test Dataset')).toBeInTheDocument();
  });

  it('should handle null dataset_source_repo without crashing', () => {
    const mockResult = createMockResult({
      dataset_source_repo: null,
    });
    const props = {
      ...defaultProps,
      search: {
        search_text: 'test',
        filters: {},
      },
      resultList: [mockResult],
    };

    renderWithRouter(<SearchResult {...props} />);

    // Should still render the card
    expect(screen.getByText('Test Dataset')).toBeInTheDocument();
  });

  it('should handle empty dataset_source_repo without crashing', () => {
    const mockResult = createMockResult({
      dataset_source_repo: '',
    });
    const props = {
      ...defaultProps,
      search: {
        search_text: 'test',
        filters: {},
      },
      resultList: [mockResult],
    };

    renderWithRouter(<SearchResult {...props} />);

    // Should still render the card
    expect(screen.getByText('Test Dataset')).toBeInTheDocument();
  });

  it('should truncate description to 500 characters when no highlight from backend', () => {
    // Create a description longer than 500 characters
    const longDescription = 'A'.repeat(600);
    const mockResult = createMockResult({
      description: longDescription,
      // No highlight object = no match, should truncate
    });
    const props = {
      ...defaultProps,
      search: {
        search_text: 'nomatch',
        filters: {},
      },
      resultList: [mockResult],
    };

    renderWithRouter(<SearchResult {...props} />);

    // Find the description element
    const descriptionElement = screen.getByTestId('description');

    // Should be truncated to 500 chars + "..."
    expect(descriptionElement.textContent).toHaveLength(503); // 500 + "..."
    expect(descriptionElement.textContent).toMatch(/\.\.\.$/);
  });

  it('should NOT truncate description when backend provides highlight', () => {
    // Create a description longer than 500 characters
    const longDescription = `${'A'.repeat(400)} cancer ${'B'.repeat(200)}`;
    const highlightedDescription = `${'A'.repeat(400)} <b>cancer</b> ${'B'.repeat(200)}`;
    const mockResult = createMockResult({
      description: longDescription,
      highlight: {
        'description.search': [highlightedDescription],
      },
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

    // Find the description element
    const descriptionElement = screen.getByTestId('description');

    // Should NOT be truncated because backend provided highlight
    expect(descriptionElement.textContent).toContain('cancer');
    expect(descriptionElement.textContent.length).toBeGreaterThan(600);
    expect(descriptionElement.textContent).not.toMatch(/\.\.\.$/);
  });

  it('should remove HTML tags except bold tags from highlighted description', () => {
    const descWithHTML = '<p>Study with <a href="http://example.com">link</a> and content</p>';
    const highlightedDesc = '<p>Study with <a href="http://example.com">link</a> and <b>content</b></p>';
    const mockResult = createMockResult({
      description: descWithHTML,
      highlight: {
        'description.search': [highlightedDesc],
      },
    });
    const props = {
      ...defaultProps,
      resultList: [mockResult],
    };

    renderWithRouter(<SearchResult {...props} />);

    const descriptionElement = screen.getByTestId('description');

    // Verify dangerous HTML tags (<p>, <a>) are removed
    expect(descriptionElement.textContent).not.toContain('<p>');
    expect(descriptionElement.textContent).not.toContain('<a');

    // Verify <b> tag is preserved (HTML-escaped because html-react-parser is mocked)
    // In production, html-react-parser would convert this to an actual <b> DOM element
    expect(descriptionElement.innerHTML).toContain('Study with link and &lt;b&gt;content&lt;/b&gt;');

    // Verify the text content includes the highlighted term
    expect(descriptionElement.textContent).toContain('content');
  });

  describe('Search Filters', () => {
    it('should NOT highlight primary_disease filter values in results', () => {
      const mockResult = createMockResult({
        primary_disease: 'Breast Cancer',
      });
      const props = {
        ...defaultProps,
        search: {
          search_text: '',
          filters: {
            primary_disease: ['Cancer'],
          },
        },
        resultList: [mockResult],
      };

      renderWithRouter(<SearchResult {...props} />);

      // "Cancer" should NOT be highlighted because it's only in filters, not in search_text
      // Filters are for filtering results, not for highlighting
      const matchedContent = screen.getByTestId('primary-disease');
      expect(matchedContent.innerHTML).not.toContain('&lt;b&gt;Cancer&lt;/b&gt;');
      // But the plain text should still be there
      expect(matchedContent.textContent).toContain('Cancer');
    });

    it('should NOT highlight dataset_source_repo filter values in results', () => {
      const mockResult = createMockResult({
        dataset_source_repo: 'National Cancer Institute',
      });
      const props = {
        ...defaultProps,
        search: {
          search_text: '',
          filters: {
            dataset_source_repo: ['Cancer'],
          },
        },
        resultList: [mockResult],
      };

      renderWithRouter(<SearchResult {...props} />);

      // "Cancer" should NOT be highlighted because it's only in filters, not in search_text
      const matchedContent = screen.getByTestId('dataset-source-repo');
      expect(matchedContent.innerHTML).not.toContain('&lt;b&gt;Cancer&lt;/b&gt;');
      // But the plain text should still be there
      expect(matchedContent.textContent).toContain('Cancer');
    });

    it('should exclude dataset_source_repo filters from hidden field matches', () => {
      const mockResult = createMockResult({
        PI_name: 'Repository Researcher',
        dataset_source_repo: 'Repository',
      });
      const props = {
        ...defaultProps,
        search: {
          search_text: '',
          filters: {
            dataset_source_repo: ['Repository'],
          },
        },
        resultList: [mockResult],
      };

      renderWithRouter(<SearchResult {...props} />);

      // "Repository" is in dataset_source_repo filter
      // So it should NOT appear as "Other Match in PI name" even though PI_name contains it
      expect(screen.queryByText(/Other Match in PI name/i)).not.toBeInTheDocument();
    });

    it('should NOT highlight filter values when both primary_disease and dataset_source_repo filters are present', () => {
      const mockResult = createMockResult({
        primary_disease: 'Breast Cancer Research',
        dataset_source_repo: 'National Cancer Institute',
      });
      const props = {
        ...defaultProps,
        search: {
          search_text: '',
          filters: {
            primary_disease: ['Breast'],
            dataset_source_repo: ['National'],
          },
        },
        resultList: [mockResult],
      };

      renderWithRouter(<SearchResult {...props} />);

      // Neither "Breast" nor "National" should be highlighted (filters don't highlight)
      const primaryDiseaseMatch = screen.getByTestId('primary-disease');
      expect(primaryDiseaseMatch.innerHTML).not.toContain('&lt;b&gt;Breast&lt;/b&gt;');
      expect(primaryDiseaseMatch.textContent).toContain('Breast');

      const dataRepoMatch = screen.getByTestId('dataset-source-repo');
      expect(dataRepoMatch.innerHTML).not.toContain('&lt;b&gt;National&lt;/b&gt;');
      expect(dataRepoMatch.textContent).toContain('National');
    });

    it('should handle empty filters array', () => {
      const mockResult = createMockResult({
        primary_disease: 'Cancer',
      });
      const props = {
        ...defaultProps,
        search: {
          search_text: 'Cancer',
          filters: {
            primary_disease: [],
            dataset_source_repo: [],
          },
        },
        resultList: [mockResult],
      };

      renderWithRouter(<SearchResult {...props} />);

      // Should still work with search_text
      expect(screen.getByText('Test Dataset')).toBeInTheDocument();
    });

    it('should handle filters that are not arrays', () => {
      const mockResult = createMockResult({
        primary_disease: 'Cancer',
      });
      const props = {
        ...defaultProps,
        search: {
          search_text: 'Cancer',
          filters: {
            primary_disease: 'not-an-array',
          },
        },
        resultList: [mockResult],
      };

      renderWithRouter(<SearchResult {...props} />);

      // Should not crash
      expect(screen.getByText('Test Dataset')).toBeInTheDocument();
    });

    it('should handle missing filters (undefined)', () => {
      const mockResult = createMockResult({
        primary_disease: 'Cancer',
        highlight: {
          'primary_disease.search': ['<b>Cancer</b>'],
        },
      });
      const props = {
        ...defaultProps,
        search: {
          search_text: 'Cancer',
          // filters is undefined (not present)
        },
        resultList: [mockResult],
      };

      renderWithRouter(<SearchResult {...props} />);

      // Should not crash and should still highlight search_text terms
      const matchedContent = screen.getByTestId('primary-disease');
      expect(matchedContent.innerHTML).toContain('&lt;b&gt;Cancer&lt;/b&gt;');
    });

    it('should handle null filters', () => {
      const mockResult = createMockResult({
        primary_disease: 'Cancer',
      });
      const props = {
        ...defaultProps,
        search: {
          search_text: 'Cancer',
          filters: null,
        },
        resultList: [mockResult],
      };

      renderWithRouter(<SearchResult {...props} />);

      // Should not crash
      expect(screen.getByText('Test Dataset')).toBeInTheDocument();
    });

    it('should highlight search_text terms but NOT filter values when both are present', () => {
      const mockResult = createMockResult({
        dataset_source_repo: 'dbGaP Repository',
        description: 'Cancer study data available through dbGaP',
        highlight: {
          'description.search': ['<b>Cancer</b> study data available through dbGaP'],
        },
      });
      const props = {
        ...defaultProps,
        search: {
          search_text: 'Cancer',
          filters: {
            dataset_source_repo: ['dbGaP'],
          },
        },
        resultList: [mockResult],
      };

      renderWithRouter(<SearchResult {...props} />);

      // "Cancer" should be highlighted (it's in search_text)
      const descriptionElement = screen.getByTestId('description');
      expect(descriptionElement.innerHTML).toContain('&lt;b&gt;Cancer&lt;/b&gt;');

      // But "dbGaP" should NOT be highlighted (it's only in filters)
      const dataRepoElement = screen.getByTestId('dataset-source-repo');
      expect(dataRepoElement.innerHTML).not.toContain('&lt;b&gt;dbGaP&lt;/b&gt;');
      expect(dataRepoElement.textContent).toContain('dbGaP');
    });
  });
});

describe('Conditional Field Rendering', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // NUMERIC FIELDS: Conditional fields with numeric values
  const numericFields = [
    {
      fieldName: 'sample_count',
      fieldLabel: 'Sample Count',
      labelRegex: /Sample Count:/i,
      validValue: 100,
    },
  ];

  // STRING FIELDS: Conditional fields with string values
  const stringFields = [
    {
      fieldName: 'study_type',
      fieldLabel: 'Study Type',
      labelRegex: /Study Type:/i,
      validValue: 'Clinical Trial',
    },
  ];

  // COMMON BEHAVIOR: Tests for all conditional fields (numeric + string)
  describe.each([...numericFields, ...stringFields])('Conditional Fields - Common Behavior', ({
    fieldName,
    fieldLabel,
    labelRegex,
    validValue,
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
  });

  // NUMERIC-SPECIFIC BEHAVIOR: Tests unique to numeric fields
  describe.each(numericFields)('Numeric Fields - Numeric-Specific Behavior', ({
    fieldName,
    fieldLabel,
    labelRegex,
  }) => {
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

  describe.each(hiddenFields)('Hidden Field Rendering Tests', ({ fieldName, displayName, searchTerm }) => {
    it(`should NOT display "Other Match in ${displayName}" when backend does not provide highlight`, () => {
      const mockResult = createMockResult({
        [fieldName]: 'Some unrelated content',
        // No highlight object = no match from backend
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

    it(`should display "Other Match in ${displayName}" when backend provides highlight`, () => {
      const fieldValue = `This contains ${searchTerm} in the text`;
      const highlightedValue = `This contains <b>${searchTerm}</b> in the text`;
      const mockResult = createMockResult({
        [fieldName]: fieldValue,
        highlight: {
          [`${fieldName}.search`]: [highlightedValue],
        },
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
      // Verify the highlighted value is shown
      const matchElement = screen.getByTestId('additional-match');
      expect(matchElement.textContent).toContain(searchTerm);
    });

    it(`should NOT display "Other Match in ${displayName}" when field is null`, () => {
      const mockResult = createMockResult({
        [fieldName]: null,
        // No highlight for null field
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
        // No highlight for undefined field
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

  it('should display multiple "Other Match in" sections when backend highlights multiple hidden fields', () => {
    const mockResult = createMockResult({
      PI_name: 'Dr. John Smith',
      related_genes: 'BRCA1 and BRCA2',
      funding_source: 'National Cancer Institute',
      highlight: {
        'related_genes.search': ['<b>BRCA1</b> and <b>BRCA2</b>'],
        'funding_source.search': ['National <b>Cancer</b> Institute'],
      },
    });
    const props = {
      ...defaultProps,
      search: {
        search_text: 'BRCA Cancer',
        filters: {},
      },
      resultList: [mockResult],
    };

    renderWithRouter(<SearchResult {...props} />);

    // Should find matches in both fields that backend highlighted
    expect(screen.getByText(/Other Match in related genes/i)).toBeInTheDocument();
    expect(screen.getByText(/Other Match in funding source/i)).toBeInTheDocument();

    // Should NOT find match in PI_name (backend didn't highlight it)
    expect(screen.queryByText(/Other Match in PI name/i)).not.toBeInTheDocument();
  });

  it('should perform case-insensitive matching for hidden fields', () => {
    const mockResult = createMockResult({
      funding_source: 'National Institutes of Health',
      highlight: {
        'funding_source.search': ['National Institutes of <b>Health</b>'],
      },
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
      highlight: {
        'related_diseases.search': ['<b>Cardiovascular</b> disease and diabetes'],
      },
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

  describe('Highlighting', () => {
    describe('Always Visible Fields', () => {
      it('should highlight matching search term in primary_disease', () => {
        const mockResult = createMockResult({
          primary_disease: 'Breast Cancer',
          highlight: {
            'primary_disease.search': ['Breast <b>Cancer</b>'],
          },
        });
        const props = {
          ...defaultProps,
          search: {
            search_text: 'Cancer',
            filters: {},
          },
          resultList: [mockResult],
        };

        renderWithRouter(<SearchResult {...props} />);

        // Find the primary disease span with highlighting
        const matchedContent = screen.getByTestId('primary-disease');
        expect(matchedContent.textContent).toContain('Cancer');
        expect(matchedContent.innerHTML).toContain('&lt;b&gt;Cancer&lt;/b&gt;');
      });

      it('should highlight matching search term in dataset_source_repo', () => {
        const mockResult = createMockResult({
          dataset_source_repo: 'National Cancer Institute Repository',
          highlight: {
            'dataset_source_repo.search': ['National Cancer <b>Institute</b> Repository'],
          },
        });
        const props = {
          ...defaultProps,
          search: {
            search_text: 'Institute',
            filters: {},
          },
          resultList: [mockResult],
        };

        renderWithRouter(<SearchResult {...props} />);

        // Find the data repo span with highlighting
        const matchedContent = screen.getByTestId('dataset-source-repo');
        expect(matchedContent.textContent).toContain('Institute');
        expect(matchedContent.innerHTML).toContain('&lt;b&gt;Institute&lt;/b&gt;');
      });

      it('should highlight matching search term in description', () => {
        const mockResult = createMockResult({
          description: 'This study focuses on genomic research',
          highlight: {
            'description.search': ['This study focuses on <b>genomic</b> research'],
          },
        });
        const props = {
          ...defaultProps,
          search: {
            search_text: 'genomic',
            filters: {},
          },
          resultList: [mockResult],
        };

        renderWithRouter(<SearchResult {...props} />);

        // Find the description span with highlighting
        const matchedContent = screen.getByTestId('description');
        expect(matchedContent.textContent).toContain('genomic');
        expect(matchedContent.innerHTML).toContain('&lt;b&gt;genomic&lt;/b&gt;');
      });
    });

    describe('Conditionally Visible Fields', () => {
      it('should highlight matching search term in study_type when displayed', () => {
        const mockResult = createMockResult({
          study_type: 'Clinical Trial Study',
          highlight: {
            'study_type.search': ['Clinical <b>Trial</b> Study'],
          },
        });
        const props = {
          ...defaultProps,
          search: {
            search_text: 'Trial',
            filters: {},
          },
          resultList: [mockResult],
        };

        renderWithRouter(<SearchResult {...props} />);

        // Find the study type span with highlighting
        const matchedContent = screen.getByTestId('study-type');
        expect(matchedContent.textContent).toContain('Trial');
        expect(matchedContent.innerHTML).toContain('&lt;b&gt;Trial&lt;/b&gt;');
      });
    });

    describe('Hidden Fields', () => {
      // Test highlighting for each hidden field
      describe.each(hiddenFields)(
        'Hidden Field Highlighting Tests',
        ({ fieldName, displayName, searchTerm }) => {
          it(`should highlight matching search term "${searchTerm}" in ${displayName}`, () => {
            const fieldValue = `This contains ${searchTerm} in the text`;
            const highlightedValue = `This contains <b>${searchTerm}</b> in the text`;
            const mockResult = createMockResult({
              [fieldName]: fieldValue,
              highlight: {
                [`${fieldName}.search`]: [highlightedValue],
              },
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
            const matchedContent = screen.getAllByTestId('additional-match');

            // Should find at least one match with highlighting
            expect(matchedContent.length).toBeGreaterThan(0);
            expect(matchedContent[0].innerHTML).toContain('&lt;b&gt;');
            expect(matchedContent[0].innerHTML).toContain('&lt;/b&gt;');
          });
        },
      );
    });

    describe('Edge Cases', () => {
      it('should highlight multiple occurrences of search term in the same field', () => {
        const mockResult = createMockResult({
          description: 'Cancer research and cancer treatment for cancer patients',
          highlight: {
            'description.search': ['<b>Cancer</b> research and <b>cancer</b> treatment for <b>cancer</b> patients'],
          },
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

        // All three occurrences of "cancer" should be highlighted (escaped in HTML)
        const matchedContent = screen.getByText((_, element) => {
          if (element.className !== 'textSpan') return false;
          const html = element.innerHTML;
          const matches = (html.match(/&lt;b&gt;cancer&lt;\/b&gt;/gi) || []).length;
          return matches === 3;
        });

        expect(matchedContent).toBeInTheDocument();
      });

      it('should highlight search terms case-insensitively', () => {
        const mockResult = createMockResult({
          primary_disease: 'Breast Cancer',
          highlight: {
            'primary_disease.search': ['Breast <b>Cancer</b>'],
          },
        });
        const props = {
          ...defaultProps,
          search: {
            search_text: 'CANCER',
            filters: {},
          },
          resultList: [mockResult],
        };

        renderWithRouter(<SearchResult {...props} />);

        // The original casing should be preserved but wrapped in <b> tags (escaped in HTML)
        const matchedContent = screen.getByTestId('primary-disease');
        expect(matchedContent.innerHTML).toContain('&lt;b&gt;Cancer&lt;/b&gt;');
      });

      it('should highlight whole word when partial word is searched (backend behavior)', () => {
        const mockResult = createMockResult({
          description: 'Cardiovascular research study',
          highlight: {
            'description.search': ['<b>Cardiovascular</b> research study'],
          },
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

        // Backend highlights entire word "Cardiovascular" when searching for partial match "cardio"
        const matchedContent = screen.getByTestId('description');
        expect(matchedContent.innerHTML).toContain('&lt;b&gt;Cardiovascular&lt;/b&gt;');
      });
    });
  });
});

describe('Backend Highlighting - Visible Fields', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should display highlighted primary_disease when backend provides highlight', () => {
    const mockResult = createMockResult({
      primary_disease: 'Breast Cancer',
      highlight: {
        'primary_disease.search': ['Breast <b>Cancer</b>'],
      },
    });
    const props = {
      ...defaultProps,
      resultList: [mockResult],
    };

    renderWithRouter(<SearchResult {...props} />);

    const primaryDisease = screen.getByTestId('primary-disease');
    expect(primaryDisease.innerHTML).toContain('Breast &lt;b&gt;Cancer&lt;/b&gt;');
  });

  it('should fallback to content when no highlight provided for primary_disease', () => {
    const mockResult = createMockResult({
      primary_disease: 'Breast Cancer',
      // No highlight object
    });
    const props = {
      ...defaultProps,
      resultList: [mockResult],
    };

    renderWithRouter(<SearchResult {...props} />);

    const primaryDisease = screen.getByTestId('primary-disease');
    expect(primaryDisease.textContent).toBe('Breast Cancer');
  });

  it('should display highlighted dataset_source_repo when backend provides highlight', () => {
    const mockResult = createMockResult({
      dataset_source_repo: 'National Cancer Institute',
      highlight: {
        'dataset_source_repo.search': ['National <b>Cancer</b> Institute'],
      },
    });
    const props = {
      ...defaultProps,
      resultList: [mockResult],
    };

    renderWithRouter(<SearchResult {...props} />);

    const repoElement = screen.getByTestId('dataset-source-repo');
    expect(repoElement.innerHTML).toContain('National &lt;b&gt;Cancer&lt;/b&gt; Institute');
  });

  it('should display highlighted study_type when backend provides highlight', () => {
    const mockResult = createMockResult({
      study_type: 'Clinical Trial Study',
      highlight: {
        'study_type.search': ['<b>Clinical</b> Trial Study'],
      },
    });
    const props = {
      ...defaultProps,
      resultList: [mockResult],
    };

    renderWithRouter(<SearchResult {...props} />);

    const studyType = screen.getByTestId('study-type');
    expect(studyType.innerHTML).toContain('&lt;b&gt;Clinical&lt;/b&gt; Trial Study');
  });

  it('should handle multiple highlighted fields in same result', () => {
    const mockResult = createMockResult({
      primary_disease: 'Breast Cancer',
      dataset_source_repo: 'National Cancer Institute',
      study_type: 'Cancer Research',
      description: 'Study of cancer treatments',
      highlight: {
        'primary_disease.search': ['Breast <b>Cancer</b>'],
        'dataset_source_repo.search': ['National <b>Cancer</b> Institute'],
        'study_type.search': ['<b>Cancer</b> Research'],
        'description.search': ['Study of <b>cancer</b> treatments'],
      },
    });
    const props = {
      ...defaultProps,
      resultList: [mockResult],
    };

    renderWithRouter(<SearchResult {...props} />);

    // All fields should be highlighted (HTML-escaped because mock returns strings)
    expect(screen.getByTestId('primary-disease').innerHTML).toContain('&lt;b&gt;Cancer&lt;/b&gt;');
    expect(screen.getByTestId('dataset-source-repo').innerHTML).toContain('&lt;b&gt;Cancer&lt;/b&gt;');
    expect(screen.getByTestId('study-type').innerHTML).toContain('&lt;b&gt;Cancer&lt;/b&gt;');
    expect(screen.getByTestId('description').innerHTML).toContain('&lt;b&gt;cancer&lt;/b&gt;');
  });
});
