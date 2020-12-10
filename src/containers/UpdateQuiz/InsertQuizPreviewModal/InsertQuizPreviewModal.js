import React from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@material-ui/core';
import Interweave from 'interweave';


import toJs from '../../../hoc/ToJS';
import select from '../../../utils/select';

function InsertQuizPreviewModal(props) {
  const { combine, isPreviewing, setPreviewing } = props;

  return (
    <Dialog open={isPreviewing} onClose={() => setPreviewing(false)}>
      <DialogTitle>Xem trước</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Interweave content={combine} />
        </DialogContentText>
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
)(toJs(InsertQuizPreviewModal));

