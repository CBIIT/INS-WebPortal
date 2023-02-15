import gql from 'graphql-tag';
import { customProgramsListTableDownloadCSV } from './tableDownloadCSV';
import programIcon from '../assets/icons/Icon-Programs.png';

// --------------- Icons configuration --------------
// Ideal size for programListingIcon is 100x100 px
// Ideal size for externalLinkIcon is 16x16 px
const programListingIcon = {
  src: programIcon,
  alt: 'INS program logo',
};

const externalLinkIcon = {
  src: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/externalLinkIcon.svg',
  alt: 'External link icon',
};

// --------------- Table configuration --------------
const table = {
  name: 'Programs',
  title: 'Programs',
  display: true,
  dataField: 'programInfo',
  api: 'GET_PROGRAMS_DATA_QUERY',
  paginationAPIField: 'programInfo',
  defaultSortField: 'program_id',
  defaultSortDirection: 'asc',
  count: 'numberOfPrograms',
  buttonText: 'Add Selected Files',
  dataKey: 'program_id',
  saveButtonDefaultStyle: {
    color: '#fff',
    backgroundColor: '#DC2FDA',
    opacity: '1',
    border: '0px',
    cursor: 'pointer',
  },
  ActiveSaveButtonDefaultStyle: {
    cursor: 'pointer',
    opacity: 'unset',
    border: 'unset',
  },
  DeactiveSaveButtonDefaultStyle: {
    opacity: '0.3',
    cursor: 'auto',
  },
  columns: [
    {
      dataField: 'program_id',
      header: 'Program',
      sort: 'asc',
      link: '/program/{program_id}',
      primary: true,
      display: true,
      headerStyles: {
        width: '10%',
      },
    },
    {
      dataField: 'program_name',
      header: 'Name',
      sort: 'asc',
      display: true,
      headerStyles: {
        width: '20%',
      },
    },
    {
      dataField: 'program_website',
      header: 'Program Website',
      link: '{program_website}',
      sort: 'asc',
      display: true,
      headerStyles: {
        width: '50%',
      },
    },
    {
      dataField: 'num_projects',
      header: 'Number of Projects',
      sort: 'asc',
      display: true,
      headerStyles: {
        width: '10%',
      },
    },
    {
      dataField: 'num_publications',
      header: 'Number of Publications',
      sort: 'asc',
      display: true,
      headerStyles: {
        width: '10%',
      },
    },
  ],
  id: 'program_table',
  onRowsSelect: 'type1',
  disableRowSelection: 'type1',
  tableID: 'program_table',
  selectableRows: false,
  tableDownloadCSV: customProgramsListTableDownloadCSV,
  downloadFileName: 'programs_list_download',
  headerPagination: true,
  footerPagination: true,
};

// --------------- GraphQL query - Retrieve program info --------------
const GET_PROGRAMS_DATA_QUERY = gql`
query programInfo(
  $first: Int,
  $order_by: String,
  $sort_direction: String 
  ){
    programInfo(
    first: $first,
    order_by: $order_by,
    sort_direction: $sort_direction
    )  {
  program_id
  program_name
  program_description
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
