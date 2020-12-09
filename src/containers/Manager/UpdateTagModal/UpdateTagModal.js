import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  FormControl,
  OutlinedInput,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Snackbar,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab'; 
import { AssignmentTurnedIn, AssignmentLate } from '@material-ui/icons';

import toJs from '../../../hoc/ToJS';
import select from '../../../utils/select';
import ROUTER from '../../../constant/router';

import { updateTag } from '../../../reducer/quiz';

function UpdateTagModal(props) {
  const { updatedTag, setUpdatedTag } = props;

  const [name, setName] = useState('');
  const [noti, setNoti] = useState(null);

  useEffect(() => {
    setName(updatedTag?.name);
  }, [updatedTag])

  const resetForm = () => {
    setName('');
    setUpdatedTag(null);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    props.updateTag({
      id: updatedTag.id,
      name,
    })
    .then(result => setNoti(result))
    .catch();
    resetForm();
  }

  return (
    <>
      <Dialog
        open={updatedTag != null}
        keepMounted
        onClose={() => setUpdatedTag(null)}
        style={{ minWidth: 640 }}
      >
        <DialogTitle>Sửa danh mục khoá học</DialogTitle>
        <DialogContent style={{ marginTop: 12 }}>
          <form onSubmit={handleSubmit}>
            <FormControl style={{ width: '100%' }}>
              <OutlinedInput
                required
                value={name}
                placeholder="Tên danh mục khoá học"
                startAdornment={<AssignmentLate position="start" />}
                onChange={(e) => setName(e.target.value)}
                inputProps={{style: {fontSize: 18, paddingLeft: 10, marginLeft: 10 }}}
                style={{ height: 40 }}
              />
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions style={{ padding: '0 24px 12px 24px' }}>
          <Button variant="outlined" onClick={() => setUpdatedTag(null)} color="secondary">
            Huỷ
          </Button>
          <Button variant="contained" onClick={handleSubmit} color="primary">
            Đồng ý
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={noti !== null} autoHideDuration={6000} onClose={() => setNoti(null)}>
        <Alert variant="filled" severity={noti?.type} onClose={() => setNoti(null)}>
          {noti?.message}
        </Alert>
      </Snackbar>
    </>
  );
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
  updateTag: (payload) => dispatch(updateTag(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(toJs(UpdateTagModal));
