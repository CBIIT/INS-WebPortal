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
      padding: '5px 5px 5px 20px',
      color: '#004C73',
      borderBottom: 'none',
    },
    paddingCheckbox: {
      width: '48px',
      padding: '0 0 0 5px',
    },
    body: {
      color: '#004c73',
      '&.project_id': {
        width: '10%',
      },
      '&.queried_project_id': {
        width: '10%',
      },
      '&.program': {
        width: '5%',
      },
      '&.project_title': {
        width: '20%',
      },
      '&.principal_investigators': {
        width: '10%',
      },
      '&.program_officers': {
        width: '10%',
      },
      '&.lead_doc': {
        width: '5%',
      },
      '&.activity_code': {
        width: '5%',
      },
      '&.award_amount': {
        width: '10%',
      },
      '&.project_end_date': {
        width: '10%',
      },
      '&.fiscal_year': {
        width: '5%',
      },
      '&.publication_id': {
        width: '5%',
      },
      '&.queried_project_ids': {
        width: '15%',
      },
      '&.title': {
        width: '25%',
      },
      '&.authors': {
        width: '25%',
      },
      '&.citation_count': {
        width: '10%',
      },
      '&.relative_citation_ratio': {
        width: '10%',
      },
      '&.publish_date': {
        width: '10%',
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
      overflowX: 'auto',
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
