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
  additionalDetailsFields,
  getDataSetDetailDataQuery,
};
