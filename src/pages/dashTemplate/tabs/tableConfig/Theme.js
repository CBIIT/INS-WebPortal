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
      padding: '0px 5px 0px 20px',
      color: '#004C73',
      borderBottom: 'none',
    },
    paddingCheckbox: {
      width: '48px',
      padding: '0 0 0 5px',
    },
    body: {
      color: '#13344A',
      '&.project_id': {
        width: '10%',
        '& p': {
          lineBreak: 'anywhere',
        },
      },
      '&.queried_project_id': {
        width: '10%',
        '& p': {
          lineBreak: 'anywhere',
        },
      },
      '&.program': {
        width: '5%',
        '& p': {
          lineBreak: 'anywhere',
        },
      },
      '&.project_title': {
        width: '20%',
        '& p': {
          lineBreak: 'anywhere',
        },
      },
      '&.principal_investigators': {
        width: '10%',
        '& p': {
          lineBreak: 'anywhere',
        },
      },
      '&.program_officers': {
        width: '10%',
        '& p': {
          lineBreak: 'anywhere',
        },
      },
      '&.lead_doc': {
        width: '5%',
        '& p': {
          lineBreak: 'anywhere',
        },
      },
      '&.activity_code': {
        width: '5%',
        '& p': {
          lineBreak: 'anywhere',
        },
      },
      '&.award_amount': {
        width: '10%',
        '& p': {
          lineBreak: 'anywhere',
        },
      },
      '&.project_end_date': {
        width: '10%',
        '& p': {
          lineBreak: 'anywhere',
        },
      },
      '&.fiscal_year': {
        width: '5%',
        '& p': {
          lineBreak: 'anywhere',
        },
      },
      '&.publication_id': {
        width: '5%',
        '& p': {
          lineBreak: 'anywhere',
        },
      },
      '&.queried_project_ids': {
        width: '15%',
        '& p': {
          lineBreak: 'anywhere',
        },
      },
      '&.title': {
        width: '25%',
        '& p': {
          lineBreak: 'anywhere',
        },
      },
      '&.authors': {
        width: '25%',
        '& p': {
          lineBreak: 'anywhere',
        },
      },
      '&.citation_count': {
        width: '10%',
        '& p': {
          lineBreak: 'anywhere',
        },
      },
      '&.relative_citation_ratio': {
        width: '10%',
        '& p': {
          lineBreak: 'anywhere',
        },
      },
      '&.publish_date': {
        width: '10%',
        '& p': {
          lineBreak: 'anywhere',
        },
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
