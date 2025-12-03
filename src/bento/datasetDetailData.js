import gql from 'graphql-tag';
import programIcon from '../assets/icons/Icon-Programs.png';

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
    linkTextField: 'dataset_source_id',
    dynamic: true,
    isLink: true,
    formatSemicolon: false,
    tooltip: 'Link to the study or dataset source website',
  },
  {
    label: 'Cited Publication PMID(s)',
    datafield: 'dataset_pmid',
    dynamic: true,
    isLink: false,
    formatSemicolon: false,
    tooltip: 'External link to PubMed',
    isPMID: true,
  },
  {
    label: 'Release Date',
    datafield: 'release_date',
    dynamic: true,
    isLink: false,
    formatSemicolon: true,
    tooltip: 'Date when study was published to the public',
  },
  // TODO: Add institute field to graphql once available
  {
    label: 'Institute',
    datafield: 'institute',
    dynamic: true,
    isLink: false,
    formatSemicolon: true,
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
    dynamic: false,
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
    formatSemicolon: false,
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

// --------------- GraphQL query - Retrieve program details --------------
const getDataSetDetailDataQuery = gql`
query datasetDetails($dataset_source_id: String) {
    datasetDetails(dataset_source_id: $dataset_source_id) {
        dataset_title
        description
        dataset_source_id
        dataset_source_url
        dataset_doc
        release_date
        PI_name
        funding_source
        dataset_pmid
        study_type
        limitations_for_reuse
        assay_method
        participant_count
        sample_count
        primary_disease
        related_genes
        related_diseases
        related_terms
        study_links
        dataset_source_repo
        dataset_minimum_age_at_baseline
        dataset_maximum_age_at_baseline
        dataset_year_enrollment_started
        dataset_year_enrollment_ended
    }
}`;

export {
  pageTitle,
  pageSubTitle,
  externalLinkIcon,
  basicInformationFields,
  dataDetailsFields,
  additionalDetailsFields,
  getDataSetDetailDataQuery,
};
