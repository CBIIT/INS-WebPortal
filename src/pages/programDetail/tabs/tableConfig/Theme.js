export const tblHeader = {
  MuiTableSortLabel: {
    root: {
      color: '#13344A',
      position: 'relative',
      fontSize: '11pt',
      fontFamily: 'Lato Regular,Raleway, sans-serif',
      fontWeight: 'bold',
      letterSpacing: '0.06em',
      textDecoration: 'none',
      '&:hover': {
        color: '#13344A',
      },
      '&:hover $svg': {
      },
    },
  },
  MuiTableRow: {
    head: {
      height: '40px',
      borderBottom: '3px solid #42779a',
    },
  },
};

const tblBody = {
  MuiTableCell: {
    root: {
      minHeight: '45px',
      padding: '10px 5px 10px 20px',
      color: '#004C73',
      borderBottom: 'none',
      fontSize: '1rem',
      lineHeight: '1.5',
      letterSpacing: '0.00938em',
    },
    paddingCheckbox: {
      width: '48px',
      padding: '0 0 0 5px',
    },
    body: {
      color: '#004c73',
      '&.projects_project_id_1': {
        width: '15%',
      },
      '&.projects_project_title_2': {
        width: '20%',
      },
      '&.projects_program_names_3': {
        width: '15%',
      },
      '&.projects_org_name_4': {
        width: '15%',
      },
      '&.projects_project_start_date_5': {
        width: '20%',
      },
      '&.projects_project_end_date_6': {
        width: '15%',
      },
      '&.grants_grant_id_1': {
        width: '10%',
      },
      '&.grants_project_id_2': {
        width: '10%',
      },
      '&.grants_grant_title_3': {
        width: '15%',
      },
      '&.grants_principal_investigators_4': {
        width: '20%',
      },
      '&.grants_program_officers_5': {
        width: '15%',
      },
      '&.grants_fiscal_year_6': {
        width: '15%',
      },
      '&.grants_project_end_date_7': {
        width: '15%',
      },
      '&.publications_pmid_1': {
        width: '10%',
      },
      '&.publications_project_ids_2': {
        width: '15%',
      },
      '&.publications_title_3': {
        width: '15%',
      },
      '&.publications_authors_4': {
        width: '15%',
      },
      '&.publications_publication_date_5': {
        width: '15%',
      },
      '&.publications_cited_by_6': {
        width: '10%',
      },
      '&.publications_relative_citation_ratio_7': {
        width: '20%',
      },
    },
  },
};

export const extendedView = {
  tblTopPgn: {
    MuiTablePagination: {
      root: {
        paddingRight: '50px',
      },
    },
  },
};

export const tblPgn = {
  MuiTablePagination: {
    toolbar: {
      minHeight: '45px',
    },
  },
};

export const tblContainer = {
  MuiTableContainer: {
    root: {
      width: '100%',
      overflowX: 'visible',
      marginTop: '52px',
      transform: 'rotateX(180deg)',
      boxShadow: 'none',
      borderRadius: '0',
    },
  },
  MuiTable: {
    root: {
      transform: 'rotateX(180deg)',
      width: '100%',
      display: 'table',
      borderSpacing: '0',
      borderCollapse: 'collapse',
      borderTop: '3px solid #42779a',
      borderBottom: '5px solid #e7e5e5',
    },
  },
};

export const themeConfig = {
  tblHeader,
  tblBody,
  tblContainer,
  tblPgn,
  extendedView,
};
