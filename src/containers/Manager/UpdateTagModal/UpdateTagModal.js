import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Snackbar,
  FormControl,
  OutlinedInput,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab'; 
import { AssignmentLate } from '@material-ui/icons';

import toJs from '../../../hoc/ToJS';

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
      <Dialog open={updatedTag != null} keepMounted onClose={() => setUpdatedTag(null)} style={{ minWidth: 640 }}>
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
          <Button variant="outlined" color="secondary" onClick={() => setUpdatedTag(null)}>Huỷ</Button>
          <Button variant="contained" color="primary" onClick={handleSubmit}>Đồng ý</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={noti !== null} autoHideDuration={6000} onClose={() => setNoti(null)}>
        <Alert variant="filled" severity={noti?.type} onClose={() => setNoti(null)}>{noti?.message}</Alert>
      </Snackbar>
    </>
  );
}

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
  updateTag: (payload) => dispatch(updateTag(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(toJs(UpdateTagModal));
