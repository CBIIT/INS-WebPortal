import gql from 'graphql-tag';
import programIcon from '../assets/icons/Icon-Programs.png';
import externalLinkIconBlueSrc from '../assets/icons/externalLinkIconBlue.svg';

// --------------- Page title configuration --------------
const pageTitle = {
  label: 'Program:',
  dataField: 'program_acronym',
};

const pageSubTitle = {
  dataField: 'program_name',
};

const externalLinkIcon = {
  src: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/externalLinkIcon.svg',
  alt: 'External link icon',
};

const externalLinkIconBlue = {
  src: externalLinkIconBlueSrc,
  alt: 'External link icon blue',
};

const descMaxLength = 750;

// --------------- Basic Information fields configuration --------------
const basicInformationFields = [
  {
    label: 'Investigator(s)',
    datafield: 'PI_name',
    dynamic: false,
    isLink: false,
    formatSemicolon: true,
    tooltip: 'The individual designated by the applicant organization to have the appropriate level of authority and responsibility to direct the project or program to be supported by the award',
  },
  {
    label: 'Study Page',
    datafield: 'dataset_source_url',
    linkTextField: null, // null to use custom textFormat
    dynamic: true,
    isLink: true,
    formatSemicolon: false,
    tooltip: 'Link to the study or dataset source website',
    textFormat: [
      {
        text: 'dataset_source_repo',
        type: 'datafield',
      },
      {
        text: ': ',
        type: 'string',
      },
      {
        text: 'dataset_source_id',
        type: 'datafield',
      },
    ],
  },
  {
    label: 'Cited Publication PMID(s)',
    datafield: 'dataset_pmid',
    dynamic: true,
    isLink: false,
    formatSemicolon: true,
    tooltip: 'External link to PubMed',
    isPMID: true,
  },
  {
    label: 'Release Date',
    datafield: 'release_date',
    dynamic: true,
    isLink: false,
    formatSemicolon: false,
    tooltip: 'Date when study was published to the public',
  },
  // TODO: Add institute field to graphql once available
  {
    label: 'Institute',
    datafield: 'institute',
    dynamic: true,
    isLink: false,
    formatSemicolon: false,
    tooltip: 'Institution where the study was conducted',
  },
  {
    label: 'Funding Source(s)',
    datafield: 'funding_source',
    dynamic: true,
    isLink: false,
    formatSemicolon: true,
    tooltip: 'Grant number funding the study',
  },
  {
    label: 'NCI Division/Office/Center',
    datafield: 'dataset_doc',
    dynamic: true,
    isLink: false,
    formatSemicolon: true,
    tooltip: 'Each of NCI\'s divisions, offices, and centers (DOC) who work together to build and maintain comprehensive cancer research',
  },
];

// --------------- Data Details fields configuration --------------
const dataDetailsFields = [
  {
    label: 'Study Type',
    datafield: 'study_type',
    dynamic: true,
    isLink: false,
    formatSemicolon: true,
    tooltip: 'Study design and scope of analysis, for example, case set, control set, longitudinal, epigenetics, RNA sequencing, or single-cell analysis',
  },
  {
    label: 'Primary Disease',
    datafield: 'primary_disease',
    dynamic: false,
    isLink: false,
    formatSemicolon: true,
    tooltip: 'Study\'s primary disease focus',
  },
  {
    label: 'Assay Method',
    datafield: 'assay_method',
    dynamic: true,
    isLink: false,
    formatSemicolon: true,
    tooltip: 'Sequencing assay method(s) used, for example, whole genome sequencing (WGS), whole exome sequencing (WES or WXS), or RNA Sequencing (RNA-seq).',
  },
  {
    label: 'Participant Count',
    datafield: 'participant_count',
    dynamic: true,
    isLink: false,
    formatSemicolon: false,
    tooltip: 'Total number of consented subjects in the study',
  },
  {
    label: 'Sample Count',
    datafield: 'sample_count',
    dynamic: true,
    isLink: false,
    formatSemicolon: false,
    tooltip: 'Total number of samples in the study',
  },
  {
    label: 'Related Genes',
    datafield: 'related_genes',
    dynamic: true,
    isLink: false,
    formatSemicolon: true,
    tooltip: 'Any genes related to the dataset study',
  },
  {
    label: 'Related Diseases',
    datafield: 'related_diseases',
    dynamic: true,
    isLink: false,
    formatSemicolon: true,
    tooltip: 'Any diseases related to the dataset study',
  },
  {
    label: 'Age at Baseline (Min - Max)',
    datafield: 'dataset_minimum_age_at_baseline',
    pairedField: 'dataset_maximum_age_at_baseline',
    dynamic: true,
    isLink: false,
    formatSemicolon: false,
    tooltip: 'Participants\' minimum and maximum ages at study\'s enrollment start',
    isPaired: true,
  },
  {
    label: 'Enrollment Year (Start - End)',
    datafield: 'dataset_year_enrollment_started',
    pairedField: 'dataset_year_enrollment_ended',
    dynamic: true,
    isLink: false,
    formatSemicolon: false,
    tooltip: 'Years when study\'s participant enrollment started and ended',
    isPaired: true,
  },
  {
    label: 'Limitations for Reuse',
    datafield: 'limitations_for_reuse',
    dynamic: true,
    isLink: false,
    formatSemicolon: true,
    tooltip: 'Determines how a study\'s data can be used in the future based on consent groups. Refer to the Glossary in the About section for each consent group definition.',
  },
  {
    label: 'Related Link(s)',
    datafield: 'study_links',
    dynamic: true,
    isLink: false,
    formatSemicolon: true,
    tooltip: 'Link to an external website related to the study or dataset',
    isMultiLink: true,
  },
  {
    label: 'Related Terms',
    datafield: 'related_terms',
    dynamic: true,
    isLink: false,
    formatSemicolon: true,
    tooltip: 'Any other terms related to the dataset study',
  },
];

// --------------- Additional Details fields configuration --------------
const additionalDetailsFields = [
  {
    label: 'Participant/Sample Details',
    text: 'This information is coming soon.',
  },
  {
    label: 'Data Details',
    text: 'This information is coming soon.',
  },
  {
    label: 'Program(s)',
    text: 'This information is coming soon.',
  },
];

const dummyResourceLinks = [
  {
    name: 'Cancer Therapeutics Response Portal (CTRP v1, 2013) dataset',
    url: 'https://google.com',
  },
  {
    name: 'Cancer Therapeutics Response Portal (CTRP v2, 2025) dataset',
    url: 'https://google.com',
  },
  {
    name: 'Cancer Therapeutics internal Link',
    url: 'https://google.com',
  },
  {
    name: 'Annotated Cluster Multidimensional Enrichment (ACME) analysis',
    url: 'https://google.com',
  },
  {
    name: 'Basal Gene-Expression and Copy-Number Correlation Analysis',
    url: 'https://google.com',
  },
  {
    name: 'Resource Link 6',
    url: 'https://google.com',
  },
  {
    name: 'Resource Link 7',
    url: 'https://google.com',
  },
  {
    name: 'Resource Link 8',
    url: 'https://google.com',
  },
  {
    name: 'Resource Link 9',
    url: 'https://google.com',
  },
  {
    name: 'Resource Link 10',
    url: 'https://google.com',
  },
  {
    name: 'Resource Link 11',
    url: 'https://google.com',
  },
  {
    name: 'Resource Link 12',
    url: 'https://google.com',
  },
  {
    name: 'Resource Link 13',
    url: 'https://google.com',
  },
  {
    name: 'Resource Link 14',
    url: 'https://google.com',
  },
];

// --------------- GraphQL query - Retrieve program details --------------
const getDataSetDetailDataQuery = gql`
query datasetDetails($dataset_source_id: String) {
    datasetDetails(dataset_source_id: $dataset_source_id) {
        assay_method
        dataset_doc
        dataset_maximum_age_at_baseline
        dataset_minimum_age_at_baseline
        dataset_pmid
        dataset_source_id
        dataset_source_repo
        dataset_source_url
        dataset_title
        dataset_year_enrollment_ended
        dataset_year_enrollment_started
        description
        experimental_approaches
        funding_source
        institute
        limitations_for_reuse
        participant_count
        PI_name
        primary_disease
        related_diseases
        related_genes
        related_terms
        release_date
        sample_count
        study_links
        study_type
        __typename
    }
}`;

export {
  pageTitle,
  pageSubTitle,
  externalLinkIcon,
  externalLinkIconBlue,
  descMaxLength,
  basicInformationFields,
  dataDetailsFields,
  additionalDetailsFields,
  getDataSetDetailDataQuery,
  dummyResourceLinks,
};
