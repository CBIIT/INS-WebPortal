import React from 'react';
import {
  render, screen, fireEvent, within,
} from '@testing-library/react';
import { HashRouter } from 'react-router-dom';
import ResourceDetailView from './DetailView';
import { descMaxLength } from '../../bento/resourceDetailData';

// Mock Material-UI withStyles
jest.mock('@material-ui/core', () => ({
  ...jest.requireActual('@material-ui/core'),
  withStyles: () => (Component) => (props) => (
    <Component
      {...props}
      classes={{
        mainContainer: 'mainContainer',
        contentContainer: 'contentContainer',
        nav: 'nav',
        navLink: 'navLink',
        container: 'container',
        innerContainer: 'innerContainer',
        header: 'header',
        logo: 'logo',
        headerTitle: 'headerTitle',
        headerMainTitle: 'headerMainTitle',
        datasetLabel: 'datasetLabel',
        datasetTitle: 'datasetTitle',
        headerResourceContainer: 'headerResourceContainer',
        subTitle: 'subTitle',
        repositoryName: 'repositoryName',
        externalResource: 'externalResource',
        externalLinkIcon: 'externalLinkIcon',
        resourceLinksWrapper: 'resourceLinksWrapper',
        resourceLink: 'resourceLink',
        resourceLinkText: 'resourceLinkText',
        resourceLinkIcon: 'resourceLinkIcon',
        detailsContainer: 'detailsContainer',
        contentSection: 'contentSection',
        studyHeader: 'studyHeader',
        text: 'text',
        readMoreLink: 'readMoreLink',
        detailsGrid: 'detailsGrid',
        subSection: 'subSection',
        link: 'link',
        tooltipFont: 'tooltipFont',
      }}
    />
  ),
}));

// Mock html-react-parser
jest.mock('html-react-parser', () => jest.fn((str) => str));

// Mock @bento-core/util
jest.mock('@bento-core/util', () => ({
  cn: (...classes) => classes.filter(Boolean).join(' '),
}));

// Helper function to create mock data
const createMockData = (overrides = {}) => ({
  resource_id: 'test-resource-123',
  resource_title: 'Test Resource',
  resource_full_description: 'Test description for the resource. This is a detailed description.',
  resource_source_url: 'https://example.com',
  resource_tool_type: ['Data Tool', 'Analysis Tool'],
  resource_tool_subtype: ['Genomics Analysis', 'Statistical'],
  resource_research_area: ['Cancer Research', 'Precision Medicine'],
  resource_research_type: ['Basic Research', 'Translational Research'],
  resource_access: 'Open Access',
  resource_doc: ['NCI Division A', 'NCI Division B'],
  resource_poc_name: ['Dr. John Doe', 'Dr. Jane Smith'],
  resource_poc_email: ['john@nih.gov', 'jane@nih.gov'],
  ...overrides,
});

// Default props
const defaultProps = {
  data: createMockData(),
  files: [],
};

const MockParent = ({ children }) => (
  <HashRouter>
    {children}
  </HashRouter>
);

describe('DataSetDetailView', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Resource Categories Section - Conditional Rendering', () => {
    it('should NOT render when all dynamic fields are empty/null', () => {
      const data = createMockData({
        resource_tool_type: [],
        resource_tool_subtype: [],
        resource_research_area: [],
        resource_research_type: [],
      });

      render(<ResourceDetailView data={data} />, { wrapper: MockParent });

      expect(screen.queryByTestId('basic-information-section')).not.toBeInTheDocument();
    });

    it('should render when at least one dynamic field has data', () => {
      const data = createMockData({
        resource_tool_type: ['Data Tool'],
        resource_tool_subtype: [],
        resource_research_area: [],
        resource_research_type: [],
      });

      render(<ResourceDetailView data={data} />, { wrapper: MockParent });

      expect(screen.getByTestId('basic-information-section')).toBeInTheDocument();
    });

    it('should render when multiple dynamic fields have data', () => {
      const data = createMockData();

      render(<ResourceDetailView data={data} />, { wrapper: MockParent });

      expect(screen.getByTestId('basic-information-section')).toBeInTheDocument();
    });

    it('should render Resource Categories header text', () => {
      const data = createMockData();

      render(<ResourceDetailView data={data} />, { wrapper: MockParent });

      expect(screen.getByText('Resource Categories')).toBeInTheDocument();
    });
  });

  describe('Dynamic Field Behavior', () => {
    it('should hide dynamic field when array value is empty', () => {
      const data = createMockData({ resource_tool_type: [] });

      render(<ResourceDetailView data={data} />, { wrapper: MockParent });

      expect(screen.queryByTestId('basic-info-resource_tool_type')).not.toBeInTheDocument();
    });

    it('should hide dynamic field when value is null', () => {
      const data = createMockData({ resource_tool_type: null });

      render(<ResourceDetailView data={data} />, { wrapper: MockParent });

      expect(screen.queryByTestId('basic-info-resource_tool_type')).not.toBeInTheDocument();
    });

    it('should show dynamic field when array has values', () => {
      const data = createMockData({ resource_tool_type: ['Data Tool', 'Analysis Tool'] });

      render(<ResourceDetailView data={data} />, { wrapper: MockParent });

      expect(screen.getByTestId('basic-info-resource_tool_type')).toBeInTheDocument();
    });

    it('should show field label when field has data', () => {
      const data = createMockData({ resource_tool_type: ['Data Tool'] });

      render(<ResourceDetailView data={data} />, { wrapper: MockParent });

      expect(screen.getByText('Tool Type')).toBeInTheDocument();
    });

    it('should show resource information fields', () => {
      const data = createMockData({ resource_access: 'Open Access' });

      render(<ResourceDetailView data={data} />, { wrapper: MockParent });

      expect(screen.getByTestId('data-detail-resource_access')).toBeInTheDocument();
      expect(screen.getByText('Access Control')).toBeInTheDocument();
    });
  });

  describe('Resource Description - Expand/Collapse', () => {
    it('should render Resource Description section', () => {
      render(<ResourceDetailView {...defaultProps} />, { wrapper: MockParent });

      expect(screen.getByTestId('resource-description-section')).toBeInTheDocument();
      expect(within(screen.getByTestId('resource-description-section')).getByText('Description')).toBeInTheDocument();
    });

    it('should NOT show description section when description is empty or only HTML with no text', () => {
      const dataEmpty = createMockData({ resource_full_description: '' });
      render(<ResourceDetailView data={dataEmpty} />, { wrapper: MockParent });
      expect(screen.queryByTestId('resource-description-section')).not.toBeInTheDocument();

      const dataNull = createMockData({ resource_full_description: null });
      render(<ResourceDetailView data={dataNull} />, { wrapper: MockParent });
      expect(screen.queryByTestId('resource-description-section')).not.toBeInTheDocument();

      const dataHtmlOnly = createMockData({ resource_full_description: '<p><br></p>' });
      render(<ResourceDetailView data={dataHtmlOnly} />, { wrapper: MockParent });
      expect(screen.queryByTestId('resource-description-section')).not.toBeInTheDocument();
    });

    it('should show full description (including embedded HTML) when under descMaxLength', () => {
      const shortDescription = '<p>Short <b>bold</b> text</p>';
      const data = createMockData({ resource_full_description: shortDescription });

      render(<ResourceDetailView data={data} />, { wrapper: MockParent });

      // No toggle when under limit
      expect(screen.queryByTestId('description-toggle-expansion')).not.toBeInTheDocument();

      // The embedded HTML should be preserved (mock returns the string)
      const descContainer = screen.getByTestId('description-text');
      expect(descContainer.textContent).toContain('<b>bold</b>');
      expect(descContainer.textContent).toContain('Short');
    });

    it('should show truncated description and a Read More toggle when over descMaxLength', () => {
      const innerText = 'A'.repeat(descMaxLength + 50);
      const longDescription = `<p>${innerText}</p>`; // contains HTML but decision is based on stripped length
      const data = createMockData({ resource_full_description: longDescription });

      render(<ResourceDetailView data={data} />, { wrapper: MockParent });

      const toggle = screen.getByTestId('description-toggle-expansion');
      expect(toggle).toBeInTheDocument();
      expect(toggle.textContent).toBe('Read More');

      const descContainer = screen.getByTestId('description-text');
      // truncated output should end with ellipses
      expect(descContainer.textContent).toContain('...');
      // should not contain the full innerText
      expect(descContainer.textContent).not.toContain(innerText);
    });

    it('should expand to show full description (including HTML) when Read More is clicked, and collapse back', () => {
      const innerText = 'B'.repeat(descMaxLength + 30);
      const longDescription = `<p>Prefix <span class="x">${innerText}</span></p>`;
      const data = createMockData({ resource_full_description: longDescription });

      render(<ResourceDetailView data={data} />, { wrapper: MockParent });

      const toggle = screen.getByTestId('description-toggle-expansion');
      expect(toggle.textContent).toBe('Read More');

      // Expand
      fireEvent.click(toggle);
      expect(toggle.textContent).toBe('Show Less');

      const descContainer = screen.getByTestId('description-text');
      // Full inner text should now be present
      expect(descContainer.textContent).toContain(innerText);

      // Collapse
      fireEvent.click(toggle);
      expect(toggle.textContent).toBe('Read More');
      expect(descContainer.textContent).toContain('...');
    });
  });

  describe('Resource Information Section', () => {
    it('should render Resource Information section', () => {
      render(<ResourceDetailView {...defaultProps} />, { wrapper: MockParent });

      expect(screen.getByTestId('data-details-section')).toBeInTheDocument();
      expect(screen.getByText('Resource Information')).toBeInTheDocument();
    });

    it('should render resource access when available', () => {
      const data = createMockData({ resource_access: 'Open Access' });

      render(<ResourceDetailView data={data} />, { wrapper: MockParent });

      expect(screen.getByTestId('data-detail-resource_access')).toBeInTheDocument();
      expect(screen.getByText('Access Control')).toBeInTheDocument();
      expect(screen.getByText('Open Access')).toBeInTheDocument();
    });

    it('should render array fields with semicolon separator', () => {
      const data = createMockData({
        resource_doc: ['NCI DCEG', 'NCI CCBR'],
        resource_poc_name: ['Dr. Alice Johnson', 'Dr. Bob Smith'],
      });

      render(<ResourceDetailView data={data} />, { wrapper: MockParent });

      expect(screen.getByText('NCI DCEG; NCI CCBR')).toBeInTheDocument();
      expect(screen.getByText('Dr. Alice Johnson; Dr. Bob Smith')).toBeInTheDocument();
    });

    it('should hide dynamic resource information field when empty', () => {
      const data = createMockData({ resource_access: '' });

      render(<ResourceDetailView data={data} />, { wrapper: MockParent });

      expect(screen.queryByTestId('data-detail-resource_access')).not.toBeInTheDocument();
    });
  });

  describe('Header and Navigation', () => {
    it('should render resource title', () => {
      const data = createMockData({ resource_title: 'Test Analysis Platform' });

      render(<ResourceDetailView data={data} />, { wrapper: MockParent });

      expect(screen.getByText('Test Analysis Platform')).toBeInTheDocument();
    });

    it('should render Visit Resource link when URL exists', () => {
      const data = createMockData({ resource_source_url: 'https://example.com' });

      render(<ResourceDetailView data={data} />, { wrapper: MockParent });

      expect(screen.getByText('Visit Resource')).toBeInTheDocument();
    });

    it('should NOT render external resource link when URL is empty', () => {
      const data = createMockData({ resource_source_url: null });

      render(<ResourceDetailView data={data} />, { wrapper: MockParent });

      expect(screen.queryByText('Visit Resource')).not.toBeInTheDocument();
    });

    it('should render breadcrumb navigation', () => {
      render(<ResourceDetailView {...defaultProps} />, { wrapper: MockParent });

      expect(screen.getByText('Explore Resources')).toBeInTheDocument();
    });
  });

  describe('Array Field Formatting', () => {
    it('should format array values with semicolon separator', () => {
      const data = createMockData({ resource_tool_type: ['Tool A', 'Tool B', 'Tool C'] });

      render(<ResourceDetailView data={data} />, { wrapper: MockParent });

      // Should be formatted with semicolons and spaces
      expect(screen.getByText('Tool A; Tool B; Tool C')).toBeInTheDocument();
    });
  });
});

describe('Resource Categories Fields - Comprehensive Dynamic Field Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe.each([
    {
      datafield: 'resource_tool_type',
      label: 'Tool Type',
      testId: 'basic-info-resource_tool_type',
      validValue: ['Data Tool', 'Analysis Tool'],
    },
    {
      datafield: 'resource_tool_subtype',
      label: 'Tool Subtype',
      testId: 'basic-info-resource_tool_subtype',
      validValue: ['Genomics Analysis', 'Statistical'],
    },
    {
      datafield: 'resource_research_area',
      label: 'Research Area',
      testId: 'basic-info-resource_research_area',
      validValue: ['Cancer Research', 'Precision Medicine'],
    },
    {
      datafield: 'resource_research_type',
      label: 'Research Type',
      testId: 'basic-info-resource_research_type',
      validValue: ['Basic Research', 'Translational Research'],
    },
  ])(
    'Resource Category Field: $label ($datafield)',
    ({
      datafield, label, testId, validValue,
    }) => {
      it(`should NOT render ${label} when array is empty`, () => {
        const data = createMockData({ [datafield]: [] });
        render(<ResourceDetailView data={data} />, { wrapper: MockParent });
        expect(screen.queryByTestId(testId)).not.toBeInTheDocument();
      });

      it(`should NOT render ${label} when value is null`, () => {
        const data = createMockData({ [datafield]: null });
        render(<ResourceDetailView data={data} />, { wrapper: MockParent });
        expect(screen.queryByTestId(testId)).not.toBeInTheDocument();
      });

      it(`should render ${label} when array has values`, () => {
        const data = createMockData({ [datafield]: validValue });
        render(<ResourceDetailView data={data} />, { wrapper: MockParent });
        expect(screen.getByTestId(testId)).toBeInTheDocument();
      });

      it(`should display label "${label}" when field has data`, () => {
        const data = createMockData({ [datafield]: validValue });
        render(<ResourceDetailView data={data} />, { wrapper: MockParent });
        expect(screen.getByText(label)).toBeInTheDocument();
      });

      it(`should format array values with semicolon separator for ${label}`, () => {
        const data = createMockData({ [datafield]: validValue });
        render(<ResourceDetailView data={data} />, { wrapper: MockParent });
        const expectedText = validValue.join('; ');
        expect(screen.getByText(expectedText)).toBeInTheDocument();
      });
    },
  );
});

describe('Resource Information Fields - Comprehensive Dynamic Field Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe.each([
    {
      datafield: 'resource_access',
      label: 'Access Control',
      testId: 'data-detail-resource_access',
      validValue: 'Open Access',
      isArray: false,
    },
    {
      datafield: 'resource_doc',
      label: 'NCI Division/Office/Center',
      testId: 'data-detail-resource_doc',
      validValue: ['NCI DCEG', 'NCI CCBR'],
      isArray: true,
    },
    {
      datafield: 'resource_poc_name',
      label: 'Contact Name',
      testId: 'data-detail-resource_poc_name',
      validValue: ['Dr. John Doe', 'Dr. Jane Smith'],
      isArray: true,
    },
    {
      datafield: 'resource_poc_email',
      label: 'Contact Email',
      testId: 'data-detail-resource_poc_email',
      validValue: ['john@example.com', 'jane@example.com'],
      isArray: true,
      hyperlink: true,
    },
  ])(
    'Resource Information Field: $label ($datafield)',
    ({
      datafield, label, testId, validValue, isArray,
    }) => {
      it(`should NOT render ${label} when ${isArray ? 'array is empty' : 'value is empty string'}`, () => {
        const emptyValue = isArray ? [] : '';
        const data = createMockData({ [datafield]: emptyValue });
        render(<ResourceDetailView data={data} />, { wrapper: MockParent });
        expect(screen.queryByTestId(testId)).not.toBeInTheDocument();
      });

      it(`should NOT render ${label} when value is null`, () => {
        const data = createMockData({ [datafield]: null });
        render(<ResourceDetailView data={data} />, { wrapper: MockParent });
        expect(screen.queryByTestId(testId)).not.toBeInTheDocument();
      });

      it(`should render ${label} when value exists`, () => {
        const data = createMockData({ [datafield]: validValue });
        render(<ResourceDetailView data={data} />, { wrapper: MockParent });
        expect(screen.getByTestId(testId)).toBeInTheDocument();
      });

      it(`should display label "${label}" when field has data`, () => {
        const data = createMockData({ [datafield]: validValue });
        render(<ResourceDetailView data={data} />, { wrapper: MockParent });
        expect(within(screen.getByTestId(testId)).getByText(label)).toBeInTheDocument();
      });
    },
  );

  describe('Resource Information Fields - Hyperlink Support', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should render mailto links for Contact Email', () => {
      const emails = ['john@example.com', 'jane@example.com'];
      const data = createMockData({ resource_poc_email: emails });
      render(<ResourceDetailView data={data} />, { wrapper: MockParent });

      const container = screen.getByTestId('data-detail-resource_poc_email');
      const links = within(container).getAllByRole('link');

      expect(links).toHaveLength(emails.length);
      emails.forEach((email, index) => {
        expect(links[index]).toHaveAttribute('href', `mailto:${email}`);
        expect(links[index]).toHaveTextContent(email);
      });
      expect(container.textContent).toContain(';');
    });
  });

  describe('Resource Information Fields - Array Formatting', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should format array values with semicolon separator for Access Control', () => {
      const data = createMockData({ resource_access: 'Open Access' });
      render(<ResourceDetailView data={data} />, { wrapper: MockParent });
      // This field is not an array, so this test is skipped for it
    });

    it('should format array values with semicolon separator for NCI Division/Office/Center', () => {
      const values = ['NCI DCEG', 'NCI CCBR'];
      const data = createMockData({ resource_doc: values });
      render(<ResourceDetailView data={data} />, { wrapper: MockParent });
      const expectedText = values.join('; ');
      expect(within(screen.getByTestId('data-detail-resource_doc')).getByText(expectedText)).toBeInTheDocument();
    });

    it('should format array values with semicolon separator for Contact Name', () => {
      const values = ['Dr. John Doe', 'Dr. Jane Smith'];
      const data = createMockData({ resource_poc_name: values });
      render(<ResourceDetailView data={data} />, { wrapper: MockParent });
      const expectedText = values.join('; ');
      expect(within(screen.getByTestId('data-detail-resource_poc_name')).getByText(expectedText)).toBeInTheDocument();
    });

    it('should format array values with semicolon separator for Contact Email', () => {
      const emails = ['john@example.com', 'jane@example.com'];
      const data = createMockData({ resource_poc_email: emails });
      render(<ResourceDetailView data={data} />, { wrapper: MockParent });
      const expectedText = emails.join('; ');
      const container = screen.getByTestId('data-detail-resource_poc_email');
      expect(container.textContent).toContain(expectedText);
    });
  });
});
