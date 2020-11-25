import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
} from '@material-ui/core';

import toJs from '../../../hoc/ToJS';
import select from '../../../utils/select';

function InsertCourseModal(props) {
  const [isInserting, setInserting] = useState(false);

  return (
    <>
      <Button onClick={() => setInserting(true)} style={{ border: 'dashed 1px black', width: '100%' }}>+ Thêm khoá học</Button>
      <Dialog
        open={isInserting}
        keepMounted
        onClose={() => setInserting(false)}
        style={{ minWidth: 640 }}
      >
        <DialogTitle>Thêm khoá học</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <TextField fullWidth />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setInserting(false)} color="secondary">
            Huỷ
          </Button>
          <Button onClick={() => setInserting(false)} color="primary">
            Đồng ý
          </Button>
        </DialogActions>
      </Dialog>
    </>
);
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(toJs(InsertCourseModal));

