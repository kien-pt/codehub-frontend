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
} from '@material-ui/core';
import { AssignmentTurnedIn, AssignmentLate } from '@material-ui/icons';

import toJs from '../../../hoc/ToJS';
import select from '../../../utils/select';

function InsertCourseModal(props) {
  const { isInserting, handleClick } = props;

  const [code, setCode] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = () => {
    console.log(code,name);
    handleClick(false);
  }

  return (
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

