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
  dataset_uuid: 'test-uuid-1234-5678',
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
  dataset_storage_distribution: 'Test Storage Platform',
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
        dataset_storage_distribution: null,
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

      expect(screen.getByText('Principal Investigators')).toBeInTheDocument();
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

    it('should render paired field with zero as first value (0 - num)', () => {
      const data = createMockData({
        dataset_minimum_age_at_baseline: 0,
        dataset_maximum_age_at_baseline: '65',
      });

      render(<DataSetDetailView data={data} files={[]} />);

      const fieldElement = screen.getByTestId('data-detail-dataset_minimum_age_at_baseline');
      expect(fieldElement.textContent).toContain('0 - 65');
    });

    it('should render paired field with zero as second value (num - 0)', () => {
      const data = createMockData({
        dataset_minimum_age_at_baseline: '18',
        dataset_maximum_age_at_baseline: 0,
      });

      render(<DataSetDetailView data={data} files={[]} />);

      const fieldElement = screen.getByTestId('data-detail-dataset_minimum_age_at_baseline');
      expect(fieldElement.textContent).toContain('18 - 0');
    });

    it('should render paired field with both values as zero (0 - 0)', () => {
      const data = createMockData({
        dataset_minimum_age_at_baseline: 0,
        dataset_maximum_age_at_baseline: 0,
      });

      render(<DataSetDetailView data={data} files={[]} />);

      const fieldElement = screen.getByTestId('data-detail-dataset_minimum_age_at_baseline');
      expect(fieldElement.textContent).toContain('0 - 0');
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

// ============================================================================
// COMPREHENSIVE DATA-DRIVEN FIELD TESTS
// These tests ensure all fields in basicInformationFields and dataDetailsFields
// are properly tested for dynamic visibility behavior
// ============================================================================

// Basic Information Fields - all are dynamic (hide when null/empty)
const basicInformationDynamicFields = [
  {
    datafield: 'PI_name',
    label: 'Principal Investigators',
    testId: 'basic-info-PI_name',
    validValue: 'Dr. Smith',
  },
  {
    datafield: 'dataset_source_url',
    label: 'Study Page',
    testId: 'basic-info-dataset_source_url',
    validValue: 'https://example.com',
  },
  {
    datafield: 'dataset_pmid',
    label: 'Cited Publication PMID(s)',
    testId: 'basic-info-dataset_pmid',
    validValue: '12345',
  },
  {
    datafield: 'release_date',
    label: 'Release Date',
    testId: 'basic-info-release_date',
    validValue: '2024-01-01',
  },
  {
    datafield: 'institute',
    label: 'Institute',
    testId: 'basic-info-institute',
    validValue: 'Test Institute',
  },
  {
    datafield: 'funding_source',
    label: 'Funding Source(s)',
    testId: 'basic-info-funding_source',
    validValue: 'NIH Grant',
  },
  {
    datafield: 'dataset_doc',
    label: 'NCI Division/Office/Center',
    testId: 'basic-info-dataset_doc',
    validValue: 'NCI',
  },
  {
    datafield: 'dataset_storage_distribution',
    label: 'Data Storage and Distribution Platform',
    testId: 'basic-info-dataset_storage_distribution',
    validValue: 'Cloud Storage',
  },
];

// Data Details Fields - dynamic fields (excluding paired and non-dynamic)
const dataDetailsDynamicFields = [
  {
    datafield: 'study_type',
    label: 'Study Type',
    testId: 'data-detail-study_type',
    validValue: 'Clinical Trial',
  },
  {
    datafield: 'assay_method',
    label: 'Assay Method',
    testId: 'data-detail-assay_method',
    validValue: 'WGS',
  },
  {
    datafield: 'participant_count',
    label: 'Participant Count',
    testId: 'data-detail-participant_count',
    validValue: 100,
  },
  {
    datafield: 'sample_count',
    label: 'Sample Count',
    testId: 'data-detail-sample_count',
    validValue: 200,
  },
  {
    datafield: 'related_genes',
    label: 'Related Genes',
    testId: 'data-detail-related_genes',
    validValue: 'BRCA1; BRCA2',
  },
  {
    datafield: 'related_diseases',
    label: 'Related Diseases',
    testId: 'data-detail-related_diseases',
    validValue: 'Breast Cancer',
  },
  {
    datafield: 'limitations_for_reuse',
    label: 'Limitations for Reuse',
    testId: 'data-detail-limitations_for_reuse',
    validValue: 'None',
  },
  {
    datafield: 'study_links',
    label: 'Related Link(s)',
    testId: 'data-detail-study_links',
    validValue: 'https://example.com/study',
  },
  {
    datafield: 'related_terms',
    label: 'Related Terms',
    testId: 'data-detail-related_terms',
    validValue: 'genomics; oncology',
  },
];

// Non-dynamic fields (always show regardless of value)
const nonDynamicFields = [
  {
    datafield: 'primary_disease',
    label: 'Primary Disease',
    testId: 'data-detail-primary_disease',
  },
];

// Paired fields (show if at least one value exists)
const pairedFields = [
  {
    datafield: 'dataset_minimum_age_at_baseline',
    pairedField: 'dataset_maximum_age_at_baseline',
    label: 'Age at Baseline (Min - Max)',
    testId: 'data-detail-dataset_minimum_age_at_baseline',
    validFirstValue: '18',
    validSecondValue: '65',
  },
  {
    datafield: 'dataset_year_enrollment_started',
    pairedField: 'dataset_year_enrollment_ended',
    label: 'Enrollment Year (Start - End)',
    testId: 'data-detail-dataset_year_enrollment_started',
    validFirstValue: '2020',
    validSecondValue: '2023',
  },
];

describe('Basic Information Fields - Comprehensive Dynamic Field Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe.each(basicInformationDynamicFields)(
    'Basic Info Field: $label ($datafield)',
    ({
      datafield, label, testId, validValue,
    }) => {
      it(`should NOT render ${label} when value is null`, () => {
        const data = createMockData({ [datafield]: null });
        render(<DataSetDetailView data={data} files={[]} />);
        expect(screen.queryByTestId(testId)).not.toBeInTheDocument();
      });

      it(`should NOT render ${label} when value is empty string`, () => {
        const data = createMockData({ [datafield]: '' });
        render(<DataSetDetailView data={data} files={[]} />);
        expect(screen.queryByTestId(testId)).not.toBeInTheDocument();
      });

      it(`should render ${label} when value exists`, () => {
        const data = createMockData({ [datafield]: validValue });
        render(<DataSetDetailView data={data} files={[]} />);
        expect(screen.getByTestId(testId)).toBeInTheDocument();
      });

      it(`should display label "${label}" when field has data`, () => {
        const data = createMockData({ [datafield]: validValue });
        render(<DataSetDetailView data={data} files={[]} />);
        expect(screen.getByText(label)).toBeInTheDocument();
      });
    },
  );
});

describe('Data Details Fields - Comprehensive Dynamic Field Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe.each(dataDetailsDynamicFields)(
    'Data Details Field: $label ($datafield)',
    ({
      datafield, label, testId, validValue,
    }) => {
      it(`should NOT render ${label} when value is null`, () => {
        const data = createMockData({ [datafield]: null });
        render(<DataSetDetailView data={data} files={[]} />);
        expect(screen.queryByTestId(testId)).not.toBeInTheDocument();
      });

      it(`should NOT render ${label} when value is empty string`, () => {
        const data = createMockData({ [datafield]: '' });
        render(<DataSetDetailView data={data} files={[]} />);
        expect(screen.queryByTestId(testId)).not.toBeInTheDocument();
      });

      it(`should render ${label} when value exists`, () => {
        const data = createMockData({ [datafield]: validValue });
        render(<DataSetDetailView data={data} files={[]} />);
        expect(screen.getByTestId(testId)).toBeInTheDocument();
      });

      it(`should display label "${label}" when field has data`, () => {
        const data = createMockData({ [datafield]: validValue });
        render(<DataSetDetailView data={data} files={[]} />);
        expect(screen.getByText(label)).toBeInTheDocument();
      });
    },
  );
});

describe('Non-Dynamic Fields - Always Visible Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe.each(nonDynamicFields)(
    'Non-Dynamic Field: $label ($datafield)',
    ({ datafield, label, testId }) => {
      it(`should render ${label} even when value is null`, () => {
        const data = createMockData({ [datafield]: null });
        render(<DataSetDetailView data={data} files={[]} />);
        expect(screen.getByTestId(testId)).toBeInTheDocument();
      });

      it(`should render ${label} even when value is empty string`, () => {
        const data = createMockData({ [datafield]: '' });
        render(<DataSetDetailView data={data} files={[]} />);
        expect(screen.getByTestId(testId)).toBeInTheDocument();
      });

      it(`should render ${label} when value exists`, () => {
        const data = createMockData({ [datafield]: 'Test Value' });
        render(<DataSetDetailView data={data} files={[]} />);
        expect(screen.getByTestId(testId)).toBeInTheDocument();
      });

      it(`should display label "${label}"`, () => {
        const data = createMockData({ [datafield]: 'Test Value' });
        render(<DataSetDetailView data={data} files={[]} />);
        expect(screen.getByText(label)).toBeInTheDocument();
      });
    },
  );
});

describe('Paired Fields - Comprehensive Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe.each(pairedFields)(
    'Paired Field: $label',
    ({
      datafield, pairedField, label, testId, validFirstValue, validSecondValue,
    }) => {
      it(`should render ${label} when both values exist`, () => {
        const data = createMockData({
          [datafield]: validFirstValue,
          [pairedField]: validSecondValue,
        });
        render(<DataSetDetailView data={data} files={[]} />);
        expect(screen.getByTestId(testId)).toBeInTheDocument();
        expect(screen.getByText(`${validFirstValue} - ${validSecondValue}`)).toBeInTheDocument();
      });

      it(`should render ${label} when only first value exists`, () => {
        const data = createMockData({
          [datafield]: validFirstValue,
          [pairedField]: null,
        });
        render(<DataSetDetailView data={data} files={[]} />);
        expect(screen.getByTestId(testId)).toBeInTheDocument();
        const fieldElement = screen.getByTestId(testId);
        expect(fieldElement.textContent).toContain(`${validFirstValue} -`);
      });

      it(`should render ${label} when only second value exists`, () => {
        const data = createMockData({
          [datafield]: null,
          [pairedField]: validSecondValue,
        });
        render(<DataSetDetailView data={data} files={[]} />);
        expect(screen.getByTestId(testId)).toBeInTheDocument();
        const fieldElement = screen.getByTestId(testId);
        expect(fieldElement.textContent).toContain(`- ${validSecondValue}`);
      });

      it(`should NOT render ${label} when both values are null`, () => {
        const data = createMockData({
          [datafield]: null,
          [pairedField]: null,
        });
        render(<DataSetDetailView data={data} files={[]} />);
        expect(screen.queryByTestId(testId)).not.toBeInTheDocument();
      });

      it(`should NOT render ${label} when both values are empty strings`, () => {
        const data = createMockData({
          [datafield]: '',
          [pairedField]: '',
        });
        render(<DataSetDetailView data={data} files={[]} />);
        expect(screen.queryByTestId(testId)).not.toBeInTheDocument();
      });

      it(`should render ${label} with zero as first value`, () => {
        const data = createMockData({
          [datafield]: 0,
          [pairedField]: validSecondValue,
        });
        render(<DataSetDetailView data={data} files={[]} />);
        const fieldElement = screen.getByTestId(testId);
        expect(fieldElement.textContent).toContain(`0 - ${validSecondValue}`);
      });

      it(`should render ${label} with zero as second value`, () => {
        const data = createMockData({
          [datafield]: validFirstValue,
          [pairedField]: 0,
        });
        render(<DataSetDetailView data={data} files={[]} />);
        const fieldElement = screen.getByTestId(testId);
        expect(fieldElement.textContent).toContain(`${validFirstValue} - 0`);
      });

      it(`should render ${label} with both values as zero`, () => {
        const data = createMockData({
          [datafield]: 0,
          [pairedField]: 0,
        });
        render(<DataSetDetailView data={data} files={[]} />);
        const fieldElement = screen.getByTestId(testId);
        expect(fieldElement.textContent).toContain('0 - 0');
      });

      it(`should display label "${label}"`, () => {
        const data = createMockData({
          [datafield]: validFirstValue,
          [pairedField]: validSecondValue,
        });
        render(<DataSetDetailView data={data} files={[]} />);
        expect(screen.getByText(label)).toBeInTheDocument();
      });
    },
  );
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
