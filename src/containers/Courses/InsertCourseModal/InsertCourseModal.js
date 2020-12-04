import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  OutlinedInput,
  Snackbar,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab'; 
import { AssignmentTurnedIn, AssignmentLate } from '@material-ui/icons';

import toJs from '../../../hoc/ToJS';
import select from '../../../utils/select';

import { insertCourses } from '../../../reducer/courses';

function InsertCourseModal(props) {
  const { isInserting, handleClick } = props;

  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [noti, setNoti] = useState(null);

  const handleSubmit = () => {
    props.insertCourses({
      code,
      name,
    }).then(result => setNoti(result))
    .catch();
    handleClick(false);
  }

  return (
    <>
      <Dialog
        open={isInserting}
        keepMounted
        onClose={() => handleClick(false)}
        style={{ minWidth: 640 }}
      >
        <DialogTitle>Thêm khoá học</DialogTitle>
        <DialogContent style={{ marginTop: 12 }}>
          <form onSubmit={handleSubmit}>
            <FormControl style={{ width: '100%' }}>
              <OutlinedInput
                required
                placeholder="Nhập mã khoá học"
                startAdornment={<AssignmentLate position="start" />}
                onChange={(e) => setCode(e.target.value)}
                inputProps={{style: {fontSize: 18, paddingLeft: 10, marginLeft: 10 }}}
                style={{ height: 40 }}
              />
            </FormControl>
            <FormControl style={{ width: '100%', padding: '12px 0' }}>
              <OutlinedInput
                required
                placeholder="Nhập tên khoá học"
                startAdornment={<AssignmentTurnedIn position="start" />}
                onChange={(e) => setName(e.target.value)}
                inputProps={{style: {fontSize: 18, paddingLeft: 10, marginLeft: 10 }}}
                style={{ height: 40 }}
              />
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions style={{ padding: '0 24px 12px 24px' }}>
          <Button variant="outlined" onClick={() => handleClick(false)} color="secondary">
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
  insertCourses: (payload) => dispatch(insertCourses(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(toJs(InsertCourseModal));

