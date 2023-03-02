import React from 'react';
import {
  withStyles,
} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

const MuiMenu = withStyles({
  paper: {
    border: '2px solid #d3d4d5',
    borderTop: '0',
    width: '295px',
    borderRadius: '0px',
    '& .MuiList': {
      marginTop: '0px',
      marginLeft: '0px',
    },
  },
  list: {
    paddingBottom: '0px',
    paddingTop: '0px',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));
  
const MuiMenuItem = withStyles(() => ({
  root: {
    left: '0',
    '&:focus': {
      backgroundColor: 'none',
      '& .MuiListItemIcon-root': {
        color: '#fff',
        backgroundColor: 'none',
      },
    },
  },
}))(MenuItem);

const JBrowseMenu = ({ 
  classes,
  items,
  selectHandler,
  text,
  customStyle,
  }) => {
  const [anchorElement, setAnchorElement] = React.useState(null);

  const clickHandler = (event) => {
    setAnchorElement(event.currentTarget);
  };

  const closeHandler = () => setAnchorElement(null);

  const menuItem = (item) => (
    <MuiMenuItem className={classes.menuItem} key={item.name}>
      <Button
        className={classes.menuItemButton}
        onClick={(event) => {selectHandler(item, event); closeHandler();}}>
          {item.name}
      </Button>
    </MuiMenuItem>
  );

  return (
    <div>
      <Button
        aria-controls="mui-menu"
        variant="outlined"
        onClick={clickHandler}
        className={classes.displayBtn}
      >
        <div className={classes.dropDownText}>
          {text}
        </div>
        <ArrowDropDownIcon className={classes.arrowDropDown} />
      </Button>
      <MuiMenu
        anchorEl={anchorElement}
        keepMounted
        open={Boolean(anchorElement)}
        onClose={closeHandler}
      >
        {items.map((item) =>  menuItem(item))}
      </MuiMenu>
    </div>
  )
}

const styles = (theme) => ({
  grow: {
    flexGrow: 3,
  },
  searchComp: {
    marginRight: '45px',
  },
  displayBtn: (props) => {
    const defaultProps = {
    width: '295px',
    height: '40px',
    padding: '4px 14px 2px 12px',
    boxSizing: 'border-box',
    border: '2.5px solid #c2c2c2',
    marginLeft: '20px',
    backgroundColor: '#f2f3f3',
    textTransform: 'none',
    '&:hover': {
      cursor: 'pointer',
    }}
    return Object.assign(defaultProps, props.customStyle.displayBtn);
  },
  dropDownText: (props) => {
    const defaultProps = {
    lineHeight: '1.05',
    fontSize: '12px',
    fontFamily: 'Open Sans',
    fontWeight: '600',
    color: '#525252',
    textAlign: 'left',
    position: 'relative',
    }
    return Object.assign(defaultProps, props.customStyle.dropDownText);
  },
  arrowDropDown: (props) => {
    const defaultProps = {
    fontSize: '30px',
    color: '#dc762f',
    }
    return Object.assign(defaultProps, props.customStyle.arrowDropDown);
  },
  menuItem: (props) => {
    const defaultProps = {
    color: '#dc762f',
    fontSize: '12px',
    fontWeight: '700',
    paddingLeft: '0',
    }
    return Object.assign(defaultProps, props.customStyle.menuItem);
  },
  menuItemButton: (props) => {
    console.log(props);
    const defaultProps = {
    width: '100%',
  }
    return Object.assign(defaultProps, props.customStyle.menuItemButton);
  }
});

JBrowseMenu.defaultProps = {
  customStyle: {}
};

export default withStyles(styles, { withTheme: true })(JBrowseMenu);
