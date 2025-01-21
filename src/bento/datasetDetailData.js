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

// --------------- GraphQL query - Retrieve program details --------------
const getDataSetDetailDataQuery = gql`
query datasetDetails($dbGaP_phs: String) {
    datasetDetails(dbGaP_phs: $dbGaP_phs) {
        dataset_title
        description
        dbGaP_phs
        dbGaP_URL
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
    }
}`;

export {
  pageTitle,
  pageSubTitle,
  externalLinkIcon,
  getDataSetDetailDataQuery,
};
