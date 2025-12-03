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
  },
  {
    label: 'Study Page',
    datafield: 'dataset_source_url',
    linkTextField: 'dataset_source_id',
    dynamic: true,
    isLink: true,
    formatSemicolon: false,
  },
  {
    label: 'Cited Publication PMID(s)',
    datafield: 'dataset_pmid',
    dynamic: true,
    isLink: false,
    formatSemicolon: false,
  },
  {
    label: 'Release Date',
    datafield: 'release_date',
    dynamic: true,
    isLink: false,
    formatSemicolon: true,
  },
  // TODO: Add institute field to graphql once available
  {
    label: 'Institute',
    datafield: 'institute',
    dynamic: true,
    isLink: false,
    formatSemicolon: true,
  },
  {
    label: 'Funding Source(s)',
    datafield: 'funding_source',
    dynamic: true,
    isLink: false,
    formatSemicolon: true,
  },
  {
    label: 'NCI Division/Office/Center',
    datafield: 'dataset_doc',
    dynamic: true,
    isLink: false,
    formatSemicolon: true,
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
