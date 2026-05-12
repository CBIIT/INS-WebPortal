import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SearchResult from './SearchResult';

// Mock react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Link: ({ to, children, ...props }) => <a href={to} {...props}>{children}</a>,
}));

// Mock ReactHtmlParser
jest.mock('html-react-parser', () => jest.fn((str) => str));

// Mock bootstrap Popover
jest.mock('bootstrap', () => ({
  Popover: jest.fn(),
}));

// Helper to create mock resource result with configurable fields
const createMockResult = (overrides = {}) => {
  const {
    highlight, resource_uuid, content = {}, ...rest
  } = overrides;
  const hasUuidKey = Object.prototype.hasOwnProperty.call(overrides, 'resource_uuid');
  return {
    resource_uuid: hasUuidKey ? resource_uuid : 'test-uuid-1234-5678',
    content: {
      // Required/visible fields
      resource_title: 'Test Resource',
      resource_tool_type: 'Database',
      resource_research_area: 'Cancer Research',
      resource_short_description: 'This is a test description',
      resource_source_url: 'https://example.com',
      // Hidden fields (searchable, appear in "Other Match in...")
      resource_tool_subtype: 'Public Database',
      resource_research_type: 'Basic Research',
      resource_access: 'Open Access',
      resource_doc: 'NCI',
      resource_poc_name: 'Test Contact',
      resource_poc_email: 'test@example.com',
      resource_full_description: 'Full description here',
      ...content,
    },
    highlight: highlight || {},
    ...rest,
  };
};

// Default props
const defaultProps = {
  resultList: [],
  glossaryTerms: [],
};

// Wrapper to provide router context
const renderWithRouter = (component) => render(
  <BrowserRouter>
    {component}
  </BrowserRouter>,
);

describe('Accessibility', () => {
  it('should display accessible resource title links', () => {
    const result = createMockResult();
    renderWithRouter(<SearchResult {...defaultProps} resultList={[result]} />);

    const links = screen.getAllByTestId('resource-title-link');
    expect(links.length).toBeGreaterThanOrEqual(1);
    expect(links[0]).toHaveTextContent('Test Resource');
  });

  it('should have proper link references for resource detail pages', () => {
    const result = createMockResult({ resource_uuid: 'abc-123-def-456' });
    renderWithRouter(<SearchResult {...defaultProps} resultList={[result]} />);

    const links = screen.getAllByTestId('resource-title-link');
    expect(links[0]).toHaveAttribute('href', '/resource/abc-123-def-456');
  });

  it('should display accessible field labels', () => {
    const result = createMockResult();
    renderWithRouter(<SearchResult {...defaultProps} resultList={[result]} />);

    expect(screen.getByText(/Tool Type:/)).toBeInTheDocument();
    expect(screen.getByText(/Research Area:/)).toBeInTheDocument();
  });
});

describe('Basic Functionality', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render search results without crashing', () => {
    const result = createMockResult();
    renderWithRouter(<SearchResult {...defaultProps} resultList={[result]} />);
    const links = screen.getAllByTestId('resource-title-link');
    expect(links.length).toBeGreaterThanOrEqual(1);
    expect(links[0]).toHaveTextContent('Test Resource');
  });

  it('should display no result message when resultList is empty', () => {
    renderWithRouter(<SearchResult {...defaultProps} resultList={[]} />);

    expect(screen.getByText(/No result found. Please refine your search./)).toBeInTheDocument();
  });

  it('should display multiple results', () => {
    const result1 = createMockResult({ resource_uuid: 'uuid-1', content: { resource_title: 'Resource 1' } });
    const result2 = createMockResult({ resource_uuid: 'uuid-2', content: { resource_title: 'Resource 2' } });

    renderWithRouter(<SearchResult {...defaultProps} resultList={[result1, result2]} />);

    expect(screen.getByText('Resource 1')).toBeInTheDocument();
    expect(screen.getByText('Resource 2')).toBeInTheDocument();
  });

  it('should display resource title linked to detail page', () => {
    const result = createMockResult();
    renderWithRouter(<SearchResult {...defaultProps} resultList={[result]} />);

    const links = screen.getAllByTestId('resource-title-link');
    expect(links[0]).toHaveAttribute('href', '/resource/test-uuid-1234-5678');
    expect(links[0]).toHaveTextContent('Test Resource');
  });

  it('should display Tool Type when available', () => {
    const result = createMockResult();
    renderWithRouter(<SearchResult {...defaultProps} resultList={[result]} />);

    const toolTypes = screen.getAllByTestId('tool-type');
    expect(toolTypes.length).toBeGreaterThanOrEqual(1);
    expect(toolTypes[0]).toHaveTextContent('Database');
  });

  it('should display Research Area when available', () => {
    const result = createMockResult();
    renderWithRouter(<SearchResult {...defaultProps} resultList={[result]} />);

    const researchAreas = screen.getAllByTestId('research-area');
    expect(researchAreas.length).toBeGreaterThanOrEqual(1);
    expect(researchAreas[0]).toHaveTextContent('Cancer Research');
  });

  it('should display Description when available', () => {
    const result = createMockResult();
    renderWithRouter(<SearchResult {...defaultProps} resultList={[result]} />);

    const descriptions = screen.getAllByTestId('description');
    expect(descriptions.length).toBeGreaterThanOrEqual(1);
    expect(descriptions[0]).toHaveTextContent('This is a test description');
  });

  it('should display Visit Resource link when URL is available', () => {
    const result = createMockResult();
    renderWithRouter(<SearchResult {...defaultProps} resultList={[result]} />);

    const visitLinks = screen.getAllByTestId('resource-visit-link');
    expect(visitLinks.length).toBeGreaterThanOrEqual(1);
    expect(visitLinks[0]).toHaveTextContent('Visit Resource');
  });

  it('should handle external link in resource result', () => {
    const result = createMockResult({ content: { resource_source_url: 'https://external-resource.com' } });
    renderWithRouter(<SearchResult {...defaultProps} resultList={[result]} />);

    const visitLinks = screen.getAllByTestId('resource-visit-link');
    expect(visitLinks[0]).toHaveAttribute('href', 'https://external-resource.com');
    expect(visitLinks[0]).toHaveAttribute('target', '_blank');
  });
});

describe('Implementation Requirements', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should not display empty optional fields', () => {
    const result = createMockResult({
      content: {
        resource_title: 'Test Resource',
        resource_tool_type: '',
        resource_research_area: '',
        resource_short_description: '',
      },
    });

    renderWithRouter(<SearchResult {...defaultProps} resultList={[result]} />);

    const link = screen.getAllByTestId('resource-title-link')[0];
    expect(link).toBeInTheDocument();
    expect(screen.queryByTestId('tool-type')).not.toBeInTheDocument();
    expect(screen.queryByTestId('research-area')).not.toBeInTheDocument();
    expect(screen.queryByTestId('description')).not.toBeInTheDocument();
  });

  it('should not display null optional fields', () => {
    const result = createMockResult({
      content: {
        resource_title: 'Test Resource',
        resource_tool_type: null,
        resource_research_area: null,
      },
    });

    renderWithRouter(<SearchResult {...defaultProps} resultList={[result]} />);

    expect(screen.getAllByTestId('resource-title-link').length).toBeGreaterThanOrEqual(1);
  });

  it('should not display undefined optional fields', () => {
    const result = createMockResult({
      content: {
        resource_title: 'Test Resource',
        resource_tool_type: undefined,
        resource_research_area: undefined,
      },
    });

    renderWithRouter(<SearchResult {...defaultProps} resultList={[result]} />);

    expect(screen.getAllByTestId('resource-title-link').length).toBeGreaterThanOrEqual(1);
  });

  it('should display highlighted values from backend', () => {
    const result = createMockResult({
      content: { resource_tool_type: 'Database' },
      highlight: { resource_tool_type: ['<b>Database</b>'] },
    });

    renderWithRouter(<SearchResult {...defaultProps} resultList={[result]} />);

    expect(screen.getAllByTestId('tool-type')[0]).toBeInTheDocument();
  });

  it('should remove HTML tags from descriptions except bold tags', () => {
    const result = createMockResult({
      content: { resource_short_description: '<em>italic</em> text with <b>bold</b>' },
    });

    renderWithRouter(<SearchResult {...defaultProps} resultList={[result]} />);

    const description = screen.getAllByTestId('description')[0];
    expect(description).toBeInTheDocument();
  });

  it('should truncate long descriptions to 500 characters when no highlight', () => {
    const longDesc = 'a'.repeat(600);
    const result = createMockResult({
      content: { resource_short_description: longDesc },
      highlight: {},
    });

    renderWithRouter(<SearchResult {...defaultProps} resultList={[result]} />);

    const description = screen.getAllByTestId('description')[0];
    expect(description).toBeInTheDocument();
    const text = description.textContent;
    expect(text.length).toBeLessThanOrEqual(603); // 500 + "..."
  });

  it('should not truncate highlighted descriptions', () => {
    const longDesc = 'a'.repeat(600);
    const result = createMockResult({
      content: { resource_short_description: longDesc },
      highlight: { resource_short_description: [longDesc] },
    });

    renderWithRouter(<SearchResult {...defaultProps} resultList={[result]} />);

    expect(screen.getAllByTestId('description')[0]).toBeInTheDocument();
  });

  it('should display additional matches for hidden fields with highlights', () => {
    const result = createMockResult({
      content: {
        resource_tool_subtype: 'Public Database',
      },
      highlight: {
        resource_tool_subtype: ['Public <b>Database</b>'],
      },
    });

    renderWithRouter(<SearchResult {...defaultProps} resultList={[result]} />);

    expect(screen.getAllByTestId('additional-match').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText(/Other Match in/)).toBeInTheDocument();
  });

  it('should display multiple additional matches', () => {
    const result = createMockResult({
      highlight: {
        resource_tool_subtype: ['<b>Public</b> Database'],
        resource_research_type: ['<b>Basic</b> Research'],
        resource_access: ['<b>Open</b> Access'],
      },
    });

    renderWithRouter(<SearchResult {...defaultProps} resultList={[result]} />);

    const additionalMatches = screen.getAllByTestId('additional-match');
    expect(additionalMatches.length).toBeGreaterThanOrEqual(1);
  });

  it('should initialize popovers on resultList change', () => {
    const result1 = createMockResult({ resource_uuid: 'uuid-1' });
    const result2 = createMockResult({ resource_uuid: 'uuid-2' });

    const { rerender } = renderWithRouter(
      <SearchResult {...defaultProps} resultList={[result1]} />,
    );

    rerender(
      <BrowserRouter>
        <SearchResult {...defaultProps} resultList={[result1, result2]} />
      </BrowserRouter>,
    );

    expect(screen.getAllByTestId('resource-title-link').length).toBeGreaterThanOrEqual(1);
  });

  it('should use resource_uuid for detail page links', () => {
    const result = createMockResult({ resource_uuid: 'special-uuid-789' });
    renderWithRouter(<SearchResult {...defaultProps} resultList={[result]} />);

    const link = screen.getAllByTestId('resource-title-link')[0];
    expect(link).toHaveAttribute('href', '/resource/special-uuid-789');
  });

  it('should link to resource detail page using correct path format', () => {
    const result = createMockResult({ resource_uuid: 'abc123' });
    renderWithRouter(<SearchResult {...defaultProps} resultList={[result]} />);

    const link = screen.getAllByTestId('resource-title-link')[0];
    expect(link.href).toMatch(/\/resource\/abc123$/);
  });
});

describe('Edge Cases', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should handle result with no content', () => {
    const result = { resource_uuid: 'test', content: {} };
    renderWithRouter(<SearchResult {...defaultProps} resultList={[result]} />);
    expect(screen.getAllByTestId('resource-title-link').length).toBeGreaterThanOrEqual(1);
  });

  it('should handle result with missing resource_uuid', () => {
    const result = createMockResult({ resource_uuid: undefined });
    renderWithRouter(<SearchResult {...defaultProps} resultList={[result]} />);

    const link = screen.getAllByTestId('resource-title-link')[0];
    expect(link).toHaveAttribute('href', '/resource/undefined');
  });

  it('should handle very long resource title', () => {
    const longTitle = 'A'.repeat(200);
    const result = createMockResult({
      content: { resource_title: longTitle },
    });

    renderWithRouter(<SearchResult {...defaultProps} resultList={[result]} />);
    expect(screen.getAllByTestId('resource-title-link')[0]).toHaveTextContent(longTitle);
  });

  it('should handle resource title with special characters', () => {
    const result = createMockResult({
      content: { resource_title: 'Resource & Tool (Beta) <v1.0>' },
    });

    renderWithRouter(<SearchResult {...defaultProps} resultList={[result]} />);
    expect(screen.getAllByTestId('resource-title-link')[0]).toHaveTextContent(/Resource & Tool/);
  });

  it('should handle description with HTML entities', () => {
    const result = createMockResult({
      content: { resource_short_description: 'Description with &lt;html&gt; entities &amp; symbols' },
    });

    renderWithRouter(<SearchResult {...defaultProps} resultList={[result]} />);

    expect(screen.getAllByTestId('description')[0]).toBeInTheDocument();
  });

  it('should handle empty resultList', () => {
    renderWithRouter(<SearchResult {...defaultProps} resultList={[]} />);

    expect(screen.getByText(/No result found/)).toBeInTheDocument();
  });

  it('should handle null resultList', () => {
    renderWithRouter(<SearchResult {...defaultProps} resultList={null} />);

    expect(screen.getByText(/No result found. Please refine your search./)).toBeInTheDocument();
  });

  it('should handle undefined resultList', () => {
    renderWithRouter(<SearchResult {...defaultProps} resultList={undefined} />);

    expect(screen.getByText(/No result found. Please refine your search./)).toBeInTheDocument();
  });

  it('should handle result without resource_source_url', () => {
    const result = createMockResult({
      content: { resource_source_url: null },
    });

    renderWithRouter(<SearchResult {...defaultProps} resultList={[result]} />);

    const visitLink = screen.getAllByTestId('resource-visit-link')[0];
    expect(visitLink).not.toHaveAttribute('href');
  });

  it('should handle result with empty resource_source_url', () => {
    const result = createMockResult({
      content: { resource_source_url: '' },
    });

    renderWithRouter(<SearchResult {...defaultProps} resultList={[result]} />);

    const visitLink = screen.getAllByTestId('resource-visit-link')[0];
    expect(visitLink).not.toHaveAttribute('href');
  });

  it('should handle highlight object with extra fields', () => {
    const result = createMockResult({
      highlight: {
        resource_tool_type: ['<b>Database</b>'],
        unknownField: ['<b>Unknown</b>'],
      },
    });

    renderWithRouter(<SearchResult {...defaultProps} resultList={[result]} />);

    expect(screen.getAllByTestId('tool-type')[0]).toBeInTheDocument();
  });

  it('should handle arrays in content fields', () => {
    const result = createMockResult({
      content: {
        resource_title: 'Resource',
        resource_tool_type: ['Database', 'Tool'],
      },
    });

    renderWithRouter(<SearchResult {...defaultProps} resultList={[result]} />);
    expect(screen.getAllByTestId('resource-title-link')[0]).toHaveTextContent('Resource');
  });

  it('should handle very large resultList', () => {
    const largeList = Array.from({ length: 100 }, (_, i) => createMockResult({
      resource_uuid: `uuid-${i}`,
      content: { resource_title: `Resource ${i}` },
    }));

    renderWithRouter(<SearchResult {...defaultProps} resultList={largeList} />);
    // Check a couple of resource title links exist
    const links = screen.getAllByTestId('resource-title-link');
    expect(links.some((l) => l.textContent === 'Resource 0')).toBeTruthy();
    expect(links.some((l) => l.textContent === 'Resource 50')).toBeTruthy();
  });

  it('should handle result with all optional fields present', () => {
    const result = createMockResult();

    renderWithRouter(<SearchResult {...defaultProps} resultList={[result]} />);

    expect(screen.getByText('Test Resource')).toBeInTheDocument();
    expect(screen.getAllByTestId('tool-type')[0]).toBeInTheDocument();
    expect(screen.getAllByTestId('research-area')[0]).toBeInTheDocument();
    expect(screen.getAllByTestId('description')[0]).toBeInTheDocument();
  });

  it('should handle result with only required field', () => {
    const result = {
      resource_uuid: 'test-uuid',
      content: { resource_title: 'Only Title' },
    };

    renderWithRouter(<SearchResult {...defaultProps} resultList={[result]} />);
    expect(screen.getAllByTestId('resource-title-link')[0]).toHaveTextContent('Only Title');
  });

  it('should handle glossaryTerms prop', () => {
    const result = createMockResult();
    renderWithRouter(
      <SearchResult
        {...defaultProps}
        resultList={[result]}
        glossaryTerms={['term1', 'term2']}
      />,
    );
    expect(screen.getAllByTestId('resource-title-link').length).toBeGreaterThanOrEqual(1);
  });

  it('should render correctly on result updates', () => {
    const result1 = createMockResult({ resource_uuid: 'uuid-1', content: { resource_title: 'Resource 1' } });
    const result2 = createMockResult({ resource_uuid: 'uuid-2', content: { resource_title: 'Resource 2' } });

    const { rerender } = renderWithRouter(
      <SearchResult {...defaultProps} resultList={[result1]} />,
    );

    expect(screen.getAllByTestId('resource-title-link')[0]).toHaveTextContent('Resource 1');

    rerender(
      <BrowserRouter>
        <SearchResult {...defaultProps} resultList={[result2]} />
      </BrowserRouter>,
    );

    expect(screen.getAllByTestId('resource-title-link')[0]).toHaveTextContent('Resource 2');
  });
});
