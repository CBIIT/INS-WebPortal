import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DataSetDetailView from './dataSetDetailView';
import { descMaxLength } from '../../bento/datasetDetailData';

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

// Mock asset imports
jest.mock('../../assets/icons/Datasets.svg', () => 'dataset-icon.svg');
jest.mock('../../assets/icons/resourceLinkDownload.svg', () => 'download-icon.svg');
jest.mock('../../assets/icons/help.svg', () => 'help-icon.svg');

// Mock @bento-core/util
jest.mock('@bento-core/util', () => ({
  cn: (...classes) => classes.filter(Boolean).join(' '),
}));

// Helper function to create mock data
const createMockData = (overrides = {}) => ({
  dataset_title: 'Test Dataset',
  dataset_source_id: 'TEST-001',
  dataset_source_repo: 'Test Repository',
  dataset_source_url: 'https://example.com',
  description: 'Test description for the dataset.',
  experimental_approaches: null,
  PI_name: 'Dr. Test Investigator',
  release_date: '2024-01-01',
  institute: 'Test Institute',
  funding_source: 'NIH Grant',
  dataset_doc: 'NCI',
  dataset_pmid: '12345',
  study_type: 'Clinical Trial',
  primary_disease: 'Cancer',
  assay_method: 'WGS',
  participant_count: 100,
  sample_count: 200,
  related_genes: 'BRCA1; BRCA2',
  related_diseases: 'Breast Cancer',
  dataset_minimum_age_at_baseline: '18',
  dataset_maximum_age_at_baseline: '65',
  dataset_year_enrollment_started: '2020',
  dataset_year_enrollment_ended: '2023',
  limitations_for_reuse: 'None',
  study_links: 'https://example.com/study',
  related_terms: 'genomics; oncology',
  ...overrides,
});

// Default props
const defaultProps = {
  data: createMockData(),
  files: [],
};

describe('DataSetDetailView', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Basic Information Section - Conditional Rendering', () => {
    it('should NOT render when all dynamic fields are empty/null', () => {
      const data = createMockData({
        PI_name: null,
        dataset_source_url: null,
        dataset_pmid: null,
        release_date: null,
        institute: null,
        funding_source: null,
        dataset_doc: null,
      });

      render(<DataSetDetailView data={data} files={[]} />);

      expect(screen.queryByTestId('basic-information-section')).not.toBeInTheDocument();
    });

    it('should render when at least one dynamic field has data', () => {
      const data = createMockData({
        PI_name: 'Dr. Smith',
        dataset_source_url: null,
        dataset_pmid: null,
        release_date: null,
        institute: null,
        funding_source: null,
        dataset_doc: null,
      });

      render(<DataSetDetailView data={data} files={[]} />);

      expect(screen.getByTestId('basic-information-section')).toBeInTheDocument();
    });

    it('should render when multiple dynamic fields have data', () => {
      const data = createMockData();

      render(<DataSetDetailView data={data} files={[]} />);

      expect(screen.getByTestId('basic-information-section')).toBeInTheDocument();
    });

    it('should render Basic Information header text', () => {
      const data = createMockData();

      render(<DataSetDetailView data={data} files={[]} />);

      expect(screen.getByText('Basic Information')).toBeInTheDocument();
    });
  });

  describe('Dynamic Field Behavior', () => {
    it('should hide dynamic field when value is null', () => {
      const data = createMockData({ PI_name: null });

      render(<DataSetDetailView data={data} files={[]} />);

      expect(screen.queryByTestId('basic-info-PI_name')).not.toBeInTheDocument();
    });

    it('should hide dynamic field when value is empty string', () => {
      const data = createMockData({ PI_name: '' });

      render(<DataSetDetailView data={data} files={[]} />);

      expect(screen.queryByTestId('basic-info-PI_name')).not.toBeInTheDocument();
    });

    it('should show dynamic field when value exists', () => {
      const data = createMockData({ PI_name: 'Dr. Smith' });

      render(<DataSetDetailView data={data} files={[]} />);

      expect(screen.getByTestId('basic-info-PI_name')).toBeInTheDocument();
    });

    it('should show field label when field has data', () => {
      const data = createMockData({ PI_name: 'Dr. Smith' });

      render(<DataSetDetailView data={data} files={[]} />);

      expect(screen.getByText('Investigator(s)')).toBeInTheDocument();
    });

    it('should show non-dynamic fields (primary_disease) even when empty in Data Details', () => {
      const data = createMockData({ primary_disease: '' });

      render(<DataSetDetailView data={data} files={[]} />);

      // Primary disease is non-dynamic (dynamic: false), so it should still render
      expect(screen.getByTestId('data-detail-primary_disease')).toBeInTheDocument();
    });

    it('should show non-dynamic fields even when null in Data Details', () => {
      const data = createMockData({ primary_disease: null });

      render(<DataSetDetailView data={data} files={[]} />);

      // Primary disease is non-dynamic, should still be rendered
      expect(screen.getByTestId('data-detail-primary_disease')).toBeInTheDocument();
    });
  });

  describe('Study Description - Expand/Collapse', () => {
    it('should render Study Description section', () => {
      render(<DataSetDetailView {...defaultProps} />);

      expect(screen.getByTestId('study-description-section')).toBeInTheDocument();
      expect(screen.getByText('Study Description')).toBeInTheDocument();
    });

    it('should NOT show Read More when description is under descMaxLength chars', () => {
      const shortDescription = 'A'.repeat(descMaxLength - 1);
      const data = createMockData({ description: shortDescription });

      render(<DataSetDetailView data={data} files={[]} />);

      expect(screen.queryByTestId('description-read-more')).not.toBeInTheDocument();
    });

    it('should show Read More when description exceeds descMaxLength chars', () => {
      const longDescription = 'A'.repeat(descMaxLength + 50);
      const data = createMockData({ description: longDescription });

      render(<DataSetDetailView data={data} files={[]} />);

      expect(screen.getByTestId('description-read-more')).toBeInTheDocument();
    });

    it('should expand description when Read More is clicked', () => {
      const longDescription = 'A'.repeat(descMaxLength + 50);
      const data = createMockData({ description: longDescription });

      render(<DataSetDetailView data={data} files={[]} />);

      fireEvent.click(screen.getByTestId('description-read-more'));

      expect(screen.getByTestId('description-show-less')).toBeInTheDocument();
      expect(screen.queryByTestId('description-read-more')).not.toBeInTheDocument();
    });

    it('should collapse description when Show Less is clicked', () => {
      const longDescription = 'A'.repeat(descMaxLength + 50);
      const data = createMockData({ description: longDescription });

      render(<DataSetDetailView data={data} files={[]} />);

      // Expand first
      fireEvent.click(screen.getByTestId('description-read-more'));
      expect(screen.getByTestId('description-show-less')).toBeInTheDocument();

      // Then collapse
      fireEvent.click(screen.getByTestId('description-show-less'));
      expect(screen.getByTestId('description-read-more')).toBeInTheDocument();
    });

    it('should handle empty description gracefully', () => {
      const data = createMockData({ description: '' });

      render(<DataSetDetailView data={data} files={[]} />);

      // Should still render the section without crashing
      expect(screen.getByTestId('study-description-section')).toBeInTheDocument();
    });

    it('should handle null description gracefully', () => {
      const data = createMockData({ description: null });

      render(<DataSetDetailView data={data} files={[]} />);

      // Should still render the section without crashing
      expect(screen.getByTestId('study-description-section')).toBeInTheDocument();
    });
  });

  describe('Experimental Approaches - Conditional Rendering', () => {
    it('should NOT render when experimental_approaches is null', () => {
      const data = createMockData({ experimental_approaches: null });

      render(<DataSetDetailView data={data} files={[]} />);

      expect(screen.queryByTestId('experimental-approaches-section')).not.toBeInTheDocument();
    });

    it('should NOT render when experimental_approaches is empty string', () => {
      const data = createMockData({ experimental_approaches: '' });

      render(<DataSetDetailView data={data} files={[]} />);

      expect(screen.queryByTestId('experimental-approaches-section')).not.toBeInTheDocument();
    });

    it('should render when experimental_approaches has content', () => {
      const data = createMockData({ experimental_approaches: 'Test experimental approach content' });

      render(<DataSetDetailView data={data} files={[]} />);

      expect(screen.getByTestId('experimental-approaches-section')).toBeInTheDocument();
      expect(screen.getByText('Experimental Approaches')).toBeInTheDocument();
    });

    it('should show Read More when experimental_approaches exceeds descMaxLength chars', () => {
      const longContent = 'B'.repeat(descMaxLength + 50);
      const data = createMockData({ experimental_approaches: longContent });

      render(<DataSetDetailView data={data} files={[]} />);

      expect(screen.getByTestId('experimental-read-more')).toBeInTheDocument();
    });

    it('should expand experimental approaches when Read More is clicked', () => {
      const longContent = 'B'.repeat(descMaxLength + 50);
      const data = createMockData({ experimental_approaches: longContent });

      render(<DataSetDetailView data={data} files={[]} />);

      fireEvent.click(screen.getByTestId('experimental-read-more'));

      expect(screen.getByTestId('experimental-show-less')).toBeInTheDocument();
    });
  });

  describe('Data Details Section', () => {
    it('should render Data Details section', () => {
      render(<DataSetDetailView {...defaultProps} />);

      expect(screen.getByTestId('data-details-section')).toBeInTheDocument();
      // "Data Details" appears as section header and in Additional Details
      expect(screen.getAllByText('Data Details').length).toBeGreaterThanOrEqual(1);
    });

    it('should render paired fields when both values exist', () => {
      const data = createMockData({
        dataset_minimum_age_at_baseline: '18',
        dataset_maximum_age_at_baseline: '65',
      });

      render(<DataSetDetailView data={data} files={[]} />);

      expect(screen.getByTestId('data-detail-dataset_minimum_age_at_baseline')).toBeInTheDocument();
      expect(screen.getByText('18 - 65')).toBeInTheDocument();
    });

    it('should render paired field when only first value exists', () => {
      const data = createMockData({
        dataset_minimum_age_at_baseline: '18',
        dataset_maximum_age_at_baseline: null,
      });

      render(<DataSetDetailView data={data} files={[]} />);

      expect(screen.getByTestId('data-detail-dataset_minimum_age_at_baseline')).toBeInTheDocument();
      // The format is "min - max", with empty string for missing value
      const fieldElement = screen.getByTestId('data-detail-dataset_minimum_age_at_baseline');
      expect(fieldElement.textContent).toContain('18 -');
    });

    it('should render paired field when only second value exists', () => {
      const data = createMockData({
        dataset_minimum_age_at_baseline: null,
        dataset_maximum_age_at_baseline: '65',
      });

      render(<DataSetDetailView data={data} files={[]} />);

      expect(screen.getByTestId('data-detail-dataset_minimum_age_at_baseline')).toBeInTheDocument();
      // The format is "min - max", with empty string for missing value
      const fieldElement = screen.getByTestId('data-detail-dataset_minimum_age_at_baseline');
      expect(fieldElement.textContent).toContain('- 65');
    });

    it('should NOT render paired field when both values are empty', () => {
      const data = createMockData({
        dataset_minimum_age_at_baseline: null,
        dataset_maximum_age_at_baseline: null,
      });

      render(<DataSetDetailView data={data} files={[]} />);

      expect(screen.queryByTestId('data-detail-dataset_minimum_age_at_baseline')).not.toBeInTheDocument();
    });

    it('should render multi-link field with multiple links', () => {
      const data = createMockData({
        study_links: 'https://link1.com; https://link2.com',
      });

      render(<DataSetDetailView data={data} files={[]} />);

      expect(screen.getByTestId('data-detail-study_links')).toBeInTheDocument();
      // Both links should be rendered
      expect(screen.getByText('https://link1.com')).toBeInTheDocument();
      expect(screen.getByText('https://link2.com')).toBeInTheDocument();
    });

    it('should hide dynamic data detail field when empty', () => {
      const data = createMockData({ study_type: null });

      render(<DataSetDetailView data={data} files={[]} />);

      expect(screen.queryByTestId('data-detail-study_type')).not.toBeInTheDocument();
    });
  });

  describe('Resource Links / Files', () => {
    it('should NOT render files section when files array is empty', () => {
      render(<DataSetDetailView data={createMockData()} files={[]} />);

      expect(screen.queryByTestId('files-section')).not.toBeInTheDocument();
    });

    it('should NOT render files section when files is undefined', () => {
      render(<DataSetDetailView data={createMockData()} />);

      expect(screen.queryByTestId('files-section')).not.toBeInTheDocument();
    });

    it('should render files section when files exist', () => {
      const files = [
        { file_id: '1', file_name: 'data.csv', downloadUrl: 'https://example.com/data.csv' },
      ];

      render(<DataSetDetailView data={createMockData()} files={files} />);

      expect(screen.getByTestId('files-section')).toBeInTheDocument();
    });

    it('should render download links for each file', () => {
      const files = [
        { file_id: '1', file_name: 'data.csv', downloadUrl: 'https://example.com/data.csv' },
        { file_id: '2', file_name: 'metadata.json', downloadUrl: 'https://example.com/metadata.json' },
      ];

      render(<DataSetDetailView data={createMockData()} files={files} />);

      expect(screen.getByText('data.csv')).toBeInTheDocument();
      expect(screen.getByText('metadata.json')).toBeInTheDocument();
    });

    it('should display Download resource links label when files exist', () => {
      const files = [
        { file_id: '1', file_name: 'data.csv', downloadUrl: 'https://example.com/data.csv' },
      ];

      render(<DataSetDetailView data={createMockData()} files={files} />);

      expect(screen.getByText('Download resource links:')).toBeInTheDocument();
    });
  });

  describe('PMID Fields', () => {
    it('should render PMID as link to PubMed', () => {
      const data = createMockData({ dataset_pmid: '12345' });

      render(<DataSetDetailView data={data} files={[]} />);

      const pmidLink = screen.getByRole('link', { name: /12345/i });
      expect(pmidLink).toHaveAttribute('href', 'https://pubmed.ncbi.nlm.nih.gov/12345/');
    });

    it('should render multiple PMIDs as separate links', () => {
      const data = createMockData({ dataset_pmid: '12345; 67890' });

      render(<DataSetDetailView data={data} files={[]} />);

      const pmidLinks = screen.getAllByRole('link', { name: /\d+/i });
      const pubmedLinks = pmidLinks.filter((link) => link.href.includes('pubmed.ncbi.nlm.nih.gov'));
      expect(pubmedLinks.length).toBeGreaterThanOrEqual(2);
    });

    it('should NOT render non-numeric PMID as link', () => {
      const data = createMockData({ dataset_pmid: 'not-a-number' });

      render(<DataSetDetailView data={data} files={[]} />);

      // Should render as text, not as a link to PubMed
      expect(screen.getByText('not-a-number')).toBeInTheDocument();
      expect(screen.queryByRole('link', { name: 'not-a-number' })).not.toBeInTheDocument();
    });
  });

  describe('Header and Navigation', () => {
    it('should render dataset title', () => {
      const data = createMockData({ dataset_title: 'My Test Dataset' });

      render(<DataSetDetailView data={data} files={[]} />);

      expect(screen.getByText('My Test Dataset')).toBeInTheDocument();
    });

    it('should render source repository name', () => {
      const data = createMockData({ dataset_source_repo: 'dbGaP' });

      render(<DataSetDetailView data={data} files={[]} />);

      expect(screen.getByText('dbGaP')).toBeInTheDocument();
    });

    it('should render View Dataset in External Resource link when URL exists', () => {
      const data = createMockData({ dataset_source_url: 'https://example.com' });

      render(<DataSetDetailView data={data} files={[]} />);

      expect(screen.getByText('View Dataset in External Resource')).toBeInTheDocument();
    });

    it('should NOT render external resource link when URL is empty', () => {
      const data = createMockData({ dataset_source_url: null });

      render(<DataSetDetailView data={data} files={[]} />);

      expect(screen.queryByText('View Dataset in External Resource')).not.toBeInTheDocument();
    });

    it('should render breadcrumb navigation', () => {
      render(<DataSetDetailView {...defaultProps} />);

      expect(screen.getByText('Explore Datasets')).toBeInTheDocument();
    });
  });

  describe('Semicolon Formatting', () => {
    it('should format semicolon-separated values correctly', () => {
      const data = createMockData({ related_genes: 'BRCA1;BRCA2;TP53' });

      render(<DataSetDetailView data={data} files={[]} />);

      // Should be formatted with spaces after semicolons
      expect(screen.getByText('BRCA1; BRCA2; TP53')).toBeInTheDocument();
    });
  });
});

// Edge case tests with mocked config
describe('DataSetDetailView - Edge Cases with Mocked Config', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should handle dataset title with semicolons', () => {
    const data = createMockData({ dataset_title: 'Study A;Study B' });

    render(<DataSetDetailView data={data} files={[]} />);

    expect(screen.getByText('Study A; Study B')).toBeInTheDocument();
  });

  it('should handle very long dataset title', () => {
    const longTitle = 'A'.repeat(500);
    const data = createMockData({ dataset_title: longTitle });

    render(<DataSetDetailView data={data} files={[]} />);

    // Should not crash and should render the title
    expect(screen.getByText(longTitle)).toBeInTheDocument();
  });
});
