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

function InsertQuizPreviewModal(props) {
  const { combine, isPreviewing, setPreviewing } = props;

  return (
    <Dialog open={isPreviewing} onClose={() => setPreviewing(false)}>
      <DialogTitle>Xem trước</DialogTitle>
      <DialogContent><Interweave content={combine} /></DialogContent>
      <DialogActions><Button variant="contained" color="primary" onClick={() => setPreviewing(false)}>Đóng</Button></DialogActions>
    </Dialog>
  );
}

const mapStateToProps = () => ({});

const mapDispatchToProps = () => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(toJs(InsertQuizPreviewModal));

