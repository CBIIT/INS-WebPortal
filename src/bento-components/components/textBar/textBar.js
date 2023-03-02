import React from 'react';
import injectSheet from 'react-jss';

const styles = {
  textBarStyle: (props) => {
    const defaultProps = {
      color: '#FFFFFF',
      background: '#76C4E4',
      width: '100%',
      height: '20px',
      margin: '0 auto',
      display: 'flex',
      position: 'fixed',
      top: '80px',
      minHeight: '20px',
      justifyContent: 'center',
      zIndex: '1201',
      alignItems: 'center',
      fontSize: '16px',
    };
    return Object.assign(defaultProps, props.customStyle.textBarStyle);
  },
};

const TextBar = ({ classes, ...props }) => {
  const { content } = props;
  return (
    <div id="header" className={classes.textBarStyle}>
      {content}
    </div>
  );
};

TextBar.defaultProps = {
  content: '',
  customStyle: {},
};

const StyledHeader = injectSheet(styles)(TextBar);
export default StyledHeader;
