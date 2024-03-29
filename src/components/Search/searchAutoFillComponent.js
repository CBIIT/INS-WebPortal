import React from 'react';
import {
  TextField, CircularProgress, withStyles, Popper,
} from '@material-ui/core';
import { Search as SearchIcon } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { getSearch } from '../../pages/dashboardTab/store/dashboardReducer';

function searchComponent({ classes }) {
  const history = useHistory();

  const [open] = React.useState(false);
  const [inputValue, setInputValue] = React.useState('');
  const [options, setOptions] = React.useState([]);
  const loading = open;

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  function onChange(newValue = []) {
    if (typeof newValue === 'string') {
      const path = `/search/${newValue}`;
      history.push(path);
    }
  }

  async function getAutoCompleteRes(newValue = []) {
    setInputValue(newValue);
    const searchResp = await getSearch(newValue);
    // const keys = ['programs', 'studies', 'subjects', 'samples', 'files'];
    const keys = ['project_titles'];
    // const datafields = ['program_id', 'study_id', 'subject_id', 'sample_id', 'file_id'];
    const datafields = ['title'];

    const mapOption = keys.map((key, ind) => searchResp[key].map((id) => (id[datafields[ind]])));
    const option = mapOption.reduce((acc = [], iterator) => [...acc, ...iterator]);

    setOptions(option.length === 0 ? [] : [...option.slice(0, 6),
      <div onClick={() => {}}>
        Press ENTER for more search results
        {' '}
        <span>
          <img
            className={classes.enterIcon}
            src="https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/EnterIcon.svg"
            alt="enter icon"
          />
        </span>
      </div>]);
  }
  const CustomPopper = (props) => (
    <Popper
      {...props}
      className={classes.root}
      placement="bottom"
    />
  );

  return (
    <>
      <Autocomplete
        className={classes.autocomplete}
        disableClearable
        freeSolo
        id="search"
        onChange={(event, newValue) => onChange(newValue)}
        PopperComponent={CustomPopper}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          getAutoCompleteRes(newInputValue);
        }}
        style={{ width: 260, height: 37 }}
        filterOptions={(optionSlice) => optionSlice}
        getOptionLabel={(option) => option}
        options={options}
        loading={loading}
        renderInput={(params) => (
          <TextField
            {...params}
            classes={{ root: classes.inputRoot }}
            variant="outlined"
            hiddenLabel
            placeholder="SEARCH INS"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && e.target.value) {
                onChange([e.target.value]);
              } else if (e.key === 'Enter' && !e.target.value) {
                onChange('');
              }
            }}
            InputProps={{
              style: {
                padding: '0px 8px',
              },
              classes: {
                root: classes.input,
                notchedOutline: classes.notchedOutline,
              },
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                  <SearchIcon
                    size={20}
                    style={{
                      color: '#000000', stroke: '#000000', strokeWidth: '1.1px', marginRight: '8px', cursor: 'pointer',
                    }}
                    onClick={() => onChange(inputValue)}
                  />
                </>
              ),
            }}
          />
        )}
      />
    </>
  );
}

const styles = () => ({
  backdrop: {
    // position: 'absolute',
    zIndex: 99999,
    background: 'rgba(0, 0, 0, 0.1)',
  },
  autocomplete: {
    margin: '0 auto',
    paddingTop: '32px',
  },
  input: {
    borderRadius: '8px',
    color: '#000000',
    fontFamily: 'Lato',
    fontSize: '16px',
    borderColor: 'red',
  },
  enterIcon: {
    height: '12px',
    margin: '0px 18px 0px 6px',
  },
  inputRoot: {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#000000',
      },
      '&:hover fieldset': {
        borderColor: '#000000',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#000000',
      },
    },
  },
  root: {
    zIndex: 1501,
    '& .MuiAutocomplete-listbox': {
      borderRadius: '8px',
      fontFamily: 'Lato',
      fontSize: '12px',
      color: '#142D64',
      fontWeight: 500,
      border: '2px solid #000000',
      padding: '0px',
      '& li': {
        // list item specific styling
        borderBottom: '1px solid #3B68CB',
        '&:nth-last-child(1)': {
          borderBottom: 'none',
          fontSize: '14px',
          color: 'black',
          backgroundColor: '#ECECEC',
          '& :hover': {
            color: 'black',
            backgroundColor: '#ECECEC',
            pointerEvents: 'none',
          },
        },
      },
      '& :hover': {
        color: 'white',
        backgroundColor: '#0088FF',
      },
    },
  },
});

export default withStyles(styles)(searchComponent);
