import React, { useRef } from 'react';
import {
  withStyles,
} from '@material-ui/core';
import {
  clearTableSelections,
} from './store/caseDetailReducer';
import Dialog from '../../components/AddToCartDialog';
import { getFilesIdsInCart } from '../fileCentricCart/store/cart';

const styles = () => ({
  button: {
    borderRadius: '10px',
    width: '120px',
    lineHeight: '37px',
    fontSize: '12px',
    textTransform: 'uppercase',
    fontFamily: 'Lato',
    color: '#fff',
    backgroundColor: '#142D64',
    marginTop: '6px',
    marginBottom: '10px',
    marginRight: '24px',
  },
});

const SelectAllModalDialog = ({
  classes, openSnack,
}) => {
  const childRef = useRef();

  const handleClose = () => {
    childRef.current.close();
  };

  async function exportFiles() {
    // Find the newly added files by comparing
    const currentFileIdsInCart = getFilesIdsInCart();

    // tell the reducer to clear the selection on the table.
    clearTableSelections();
    // tell the reducer to clear the selection on the table.
    handleClose();
  }

  const OnYesClick = () => { exportFiles(); };
  const onNoClick = () => { handleClose(); };

  return (
    <>
      {/* <button type="button" onClick={handleClickOpen} className={classes.button}>
        Add All Files
      </button> */}
      <Dialog
        ref={childRef}
        onYesClick={OnYesClick}
        onNoClick={onNoClick}
      />
    </>
  );
};

export default withStyles(styles, { withTheme: true })(SelectAllModalDialog);
