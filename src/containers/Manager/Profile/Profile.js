import React from 'react';
import { connect } from 'react-redux';
import {
  Grid,
  Avatar,
  Card,
  CardHeader,
  CardContent,
} from '@material-ui/core';
import { AccountCircleOutlined } from '@material-ui/icons';

import toJs from '../../../hoc/ToJS';
import select from '../../../utils/select';
import ROUTER from '../../../constant/router';

function Profile(props) {
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
        {props.user?.fullname}
      </CardContent>
    </Card>
  );
}

const mapStateToProps = (state) => ({
  user: select(state, 'usersReducer', 'user'),
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(toJs(Profile));
