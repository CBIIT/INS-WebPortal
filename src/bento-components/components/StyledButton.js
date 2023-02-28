/* eslint-disable */

import React from 'react';
import injectSheet from 'react-jss';

const styles = {
  myButton: {
    padding: (props) => props.spacing,
  },
  myLabel: (props) => ({
    display: 'block',
    color: props.labelColor,
    fontWeight: props.fontWeight,
    fontStyle: props.fontStyle,
  }),
};

const Button = ({ classes, children }) => (
  <button className={classes.myButton}>
    <span className={classes.myLabel}>{children}</span>
  </button>
);

Button.defaultProps = {
  spacing: 10,
  fontWeight: 'bold',
  labelColor: 'red',
};

const StyledButton = injectSheet(styles)(Button);
export default StyledButton;
