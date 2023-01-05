import gql from 'graphql-tag';
import programIcon from '../assets/icons/Icon-Programs.png';

// --------------- Icons configuration --------------
// Ideal size for programListingIcon is 100x100 px
// Ideal size for externalLinkIcon is 16x16 px
const programListingIcon = {
  src: programIcon,
  alt: 'Bento program logo',
};

const externalLinkIcon = {
  src: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/externalLinkIcon.svg',
  alt: 'External link icon',
};

// --------------- Table configuration --------------
const table = {
  // Set 'display' to false to hide the table entirely
  display: true,
  // Table title
  title: 'Programs',
  // Field name for table data, need to be updated only when using a different GraphQL query
  dataField: 'programInfo',
  // Value must be one of the 'field' in columns
  defaultSortField: 'program_id',
  // 'asc' or 'desc'
  defaultSortDirection: 'asc',
  // Set 'selectableRows' to true to show the row selection
  selectableRows: false,
  // A maximum of 10 columns are allowed
  columns: [
    {
      dataField: 'program_id',
      header: 'Program',
      link: '/program/{program_id}',
      display: true,
    },
    {
      dataField: 'program_name',
      header: 'Name',
    },
    {
      dataField: 'program_website',
      header: 'Program Website',
      link: '{program_website}',
    },
    {
      dataField: 'num_projects',
      header: 'Number of Projects',
    },
    {
      dataField: 'num_publications',
      header: 'Number of Publications',
    },
  ],
};

// --------------- GraphQL query - Retrieve program info --------------
const GET_PROGRAMS_DATA_QUERY = gql`{
  programInfo {
    program_id
    program_name
    program_website
    num_projects
    num_publications
 }
}
 `;

export {
  programListingIcon,
  externalLinkIcon,
  table,
  GET_PROGRAMS_DATA_QUERY,
};
