import React from 'react';
import Grow from '@material-ui/core/Grow';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import { withStyles } from '@material-ui/core/styles';

const ESC_KEY_CODE = 27;

const defaultSearchStyles = (theme) => ({
  main: {
    display: 'flex',
    flex: '1 0 auto',
  },
  searchIcon: {
    color: theme.palette.text.secondary,
    marginTop: '10px',
    marginRight: '8px',
  },
  searchText: {
    flex: '0.8 0',
  },
  clearIcon: {
    '&:hover': {
      color: theme.palette.error.main,
    },
  },
});

class TableSearch extends React.Component {
  handleTextChange = (event) => {
    this.props.onSearch(event.target.value);
  };

  onKeyDown = (event) => {
    if (event.keyCode === ESC_KEY_CODE) {
      this.props.onHide();
    }
  };

  render() {
    const {
      classes, options, onHide, searchText,
    } = this.props;

    return (
      <Grow appear in timeout={300}>
        <div className={classes.main} ref={(el) => (this.rootRef = el)}>
          <SearchIcon className={classes.searchIcon} />
          <TextField
            className={classes.searchText}
            autoFocus
            InputProps={{
              'data-test-id': options.textLabels.toolbar.search,
            }}
            inputProps={{
              'aria-label': options.textLabels.toolbar.search,
            }}
            value={searchText || ''}
            onKeyDown={this.onKeyDown}
            onChange={this.handleTextChange}
            fullWidth
            inputRef={(el) => (this.searchField = el)}
            placeholder={options.searchPlaceholder}
            {...(options.searchProps ? options.searchProps : {})}
          />
          <IconButton className={classes.clearIcon} onClick={onHide}>
            <ClearIcon />
          </IconButton>
        </div>
      </Grow>
    );
  }
}

export default withStyles(defaultSearchStyles, { name: 'MUIDataTableSearch' })(TableSearch);
