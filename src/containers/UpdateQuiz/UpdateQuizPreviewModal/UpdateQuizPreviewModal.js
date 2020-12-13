import React from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@material-ui/core';
import Interweave from 'interweave';


import toJs from '../../../hoc/ToJS';
import select from '../../../utils/select';

function UpdateQuizPreviewModal(props) {
  const { combine, isPreviewing, setPreviewing } = props;

  console.log('ok', combine);

  return (
    <Dialog open={isPreviewing} onClose={() => setPreviewing(false)}>
      <DialogTitle>Xxemx trước</DialogTitle>
      <DialogContent>
        <Interweave content={combine} />
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="primary" onClick={() => setPreviewing(false)}>Đóng</Button>
      </DialogActions>
    </Dialog>
  );
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(toJs(UpdateQuizPreviewModal));

