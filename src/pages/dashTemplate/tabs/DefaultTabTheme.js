const customTheme = {
  MuiTabs: {
    root: {
      borderBottom: '10px solid #40789c',
    },
  },
  MuiTab: {
    root: {
      marginTop: '15px',
      color: '#6E6E6E',
      height: '45px',
      overflow: 'hidden',
      background: '#EAEAEA',
      borderTop: '1px solid black',
      borderLeft: '1px solid black',
      borderRight: '1px solid black',
      fontWeight: '400',
      lineHeight: '18px',
      letterSpacing: '0.25px',
      marginRight: '10px',
      fontSize: '21px',
      width: '250px',
      textTransform: 'none',
      fontFamily: 'Lato',
      '&.Mui-selected': {
        fontWeight: 'bolder',
        '&.programs': {
          background: '#D6F2EA',
          color: '#10A075',
        },
        '&.projects': {
          background: '#DCD6F2',
          color: '#2D10A0',
        },
        '&.grants': {
          background: '#F2D6DE',
          color: '#A0103B',
        },
        '&.publications': {
          background: '#ECF2D6',
          color: '#83A010',
        },
        '&.MuiTypography-body1': {
          color: 'red',
        },
      },
      '& span.programs_count': {
        marginLeft: '5px',
        fontSize: '17px',
      },
      '& span.projects_count': {
        marginLeft: '5px',
        fontSize: '17px',
      },
      '& span.grants_count': {
        marginLeft: '5px',
        fontSize: '17px',
      },
      '& span.publications_count': {
        marginLeft: '5px',
        fontSize: '17px',
      },
    },
  },
};

export { customTheme as default };
