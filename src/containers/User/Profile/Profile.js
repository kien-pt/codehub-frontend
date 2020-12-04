import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Typography,
  Card,
  CardHeader,
  CardContent,
  FormControl,
  OutlinedInput,
  Divider,
  Snackbar,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab'; 
import { AssignmentInd, Person } from '@material-ui/icons';

import toJs from '../../../hoc/ToJS';
import select from '../../../utils/select';

import { updateUser } from '../../../reducer/users';

function Profile(props) {
  const [username, setUsername] = useState('');
  const [fullname, setFullname] = useState('');
  const [isEditting, setEditting] = useState(false);
  const [noti, setNoti] = useState(null);

  useEffect(() => {
    setUsername(props.user?.username || '');
  }, [props.user?.username]);

  useEffect(() => {
    setFullname(props.user?.fullname || '');
  }, [props.user?.fullname]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setEditting(false);
    props.updateUser({
      id: parseInt(sessionStorage.getItem("userId")),
      username,
      fullname,
    })
    .then(result => setNoti(result))
    .catch();
  }

  return (
    <Card style={{ color: 'white', padding: 0 }}>
      <CardHeader
        title={
          <img
          src="https://i.pinimg.com/originals/63/db/21/63db2105d5418f5e5c7763d28d9ebb36.jpg"
          alt="avatar"
          style={{
            display: 'block',
            width: 280,
            maxWidth: 280,
            border: 'solid 1px #0000001a',
            borderRadius: '50%',
            margin: '280px auto 0 auto',
          }}
        />
        }
        style={{ backgroundColor: '#39424E', height: 32 }}
      />
      <CardContent style={{ height: 220 }} />
      <CardContent style={{ color: 'black' }}>
        <Typography variant="h5">{props.user?.fullname}</Typography>
        <Typography variant="caption" display="block" style={{ color: 'a2a2a2' }}>{`@${props.user?.username}`}</Typography>
        <Divider style={{ margin: '8px 0' }} />
        <form onSubmit={handleSubmit} style={{ display: isEditting ? 'block' : 'none' }}>
          <FormControl style={{ width: '100%', paddingBottom: 6 }}>
            <OutlinedInput
              required
              placeholder="Tên đăng nhập"
              value={username}
              startAdornment={<Person position="start" />}
              onChange={(e) => setUsername(e.target.value)}
              inputProps={{style: {fontSize: 18, paddingLeft: 10, marginLeft: 10 }}}
              style={{ height: 36 }}
            />
          </FormControl>
          <FormControl style={{ width: '100%', padding: '6px 0 12px 0' }}>
            <OutlinedInput
              required
              placeholder="Họ và tên"
              value={fullname}
              startAdornment={<AssignmentInd position="start" />}
              onChange={(e) => setFullname(e.target.value)}
              inputProps={{style: {fontSize: 18, paddingLeft: 10, marginLeft: 10 }}}
              style={{ height: 36 }}
            />
          </FormControl>
          <FormControl style={{ display: 'inline', width: '100%' }}>
            <Button
              variant="outlined"
              onClick={() => setEditting(false)}
              style={{ width: '48%' }}
            >
              Huỷ
            </Button>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              style={{ width: '48%', float: 'right' }}
            >
              Lưu
            </Button>
          </FormControl>
        </form>
        <Button
          variant="outlined"
          onClick={() => setEditting(true)}
          style={{ display: isEditting ? 'none' : 'block', width: '100%', marginTop: 4 }}
        >
          Sửa thông tin
        </Button>

        <Snackbar open={noti !== null} autoHideDuration={6000} onClose={() => setNoti(null)}>
          <Alert variant="filled" severity={noti?.type} onClose={() => setNoti(null)}>
            {noti?.message}
          </Alert>
        </Snackbar>
      </CardContent>
    </Card>
  );
}

const mapStateToProps = (state) => ({
  user: select(state, 'usersReducer', 'user'),
});

const mapDispatchToProps = (dispatch) => ({
  updateUser: (payload) => dispatch(updateUser(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(toJs(Profile));
