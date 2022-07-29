const styles = {
  grow: {
    flexGrow: 3,
  },
  searchComp: {
    marginRight: '45px',
  },
  headerBar: (props) => {
    const defaultProps = {
      color: '#8A95A7',
      width: '100%',
      height: '100px',
      margin: '0 auto',
      display: 'flex',
      position: 'fixed',
      minHeight: '100px',
      justifyContent: 'space-between',
      top: '0px',
      zIndex: '1201',
      background: '#ffffff',
    };
    return Object.assign(defaultProps, props.customStyle.headerBar);
  },
  nihLogoContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  icdcLogoContainer: {
    display: 'flex',
    width: '100%',
    paddingLeft: '24px',
    marginLeft: (props) => props.customStyle.icdcLogoContainerMarginLeft || 'auto',
    background: (props) => `url(${props.easter})` || '',
    overflow: 'hidden',
    '@media (min-width: 2400px)': {
      backgroundRepeat: 'no-repeat',
      backgroundSize: '100% 100%',
    },
  },
  nihLogoImg: (props) => {
    const defaultProps = {
      minWidth: '200px',
      minHeight: '90px',
      maxHeight: '80px',
      maxWidth: '460px',
      cursor: 'pointer',
    };
    return Object.assign(defaultProps, props.customStyle.nihLogoImg);
  },
};

export default styles;
