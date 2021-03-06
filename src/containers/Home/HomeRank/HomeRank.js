import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  Link,
  Grid,
  Menu,
  Button,
  Divider,
  MenuItem,
  withStyles,
  Card,
  CardHeader,
  CardContent,
} from '@material-ui/core';

import toJs from '../../../hoc/ToJS';
import select from '../../../utils/select';
import ROUTER from '../../../constant/router';

import { getAllUsers } from '../../../reducer/users';
import { getAllPointByCourseId } from '../../../reducer/point';

function HomeRank(props) {
  const { courses } = props;
  const { getAllUsers, getAllPointByCourseId } = props;
  const [courseIndex, setCourseIndex] = useState(0);

  const userId = parseInt(localStorage.getItem("userId"));

  const selectedCourse = courses?.length > 0 ? courses[courseIndex] : null;

  const rankUser = props.usersList.map((user) => ({...user, point: 0}));
  props.server_point.forEach((e) => {
    const index = rankUser.findIndex((user) => user.id === e.userID);
    rankUser.splice(index, 1, {...rankUser[index], point: e.total_point});
  });

  // Get all students
  useEffect(() => {
    if (userId >= 0) getAllUsers();
  }, [userId, getAllUsers]);

  useEffect(() => {
    if (selectedCourse) getAllPointByCourseId(selectedCourse.id);
  }, [courseIndex, getAllPointByCourseId, courses, selectedCourse]);

  const [anchorEl, setAnchorEl] = React.useState(null);

  // Select course
  const handleSelect = (index) => {
    setCourseIndex(index);
    handleClose();
  };

  // Open menu
  const handleClick = (event) => setAnchorEl(event.currentTarget);

  // Close menu
  const handleClose = () => setAnchorEl(null);

  const StyledMenu = withStyles({
    paper: {
      border: '1px solid #d3d4d5',
      width: anchorEl?.offsetWidth,
    },
  })((props) => (
    <Menu
      elevation={0}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      {...props}
    />
  ));

  return (
    <Card>
      <CardHeader title="Bảng xếp hạng" style={{ color: 'white', backgroundColor: '#39424E' }} />
      <CardContent style={{ minHeight: 415 }}>
        <Button variant="contained" color="primary" disabled={props.disabled} onClick={handleClick} style={{ width: '100%' }}>{selectedCourse?.name}</Button>
        <StyledMenu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
          {courses?.map((e, index) => <MenuItem key={e.code} onClick={() => handleSelect(index)}>{e.name}</MenuItem>)}
        </StyledMenu>
        {rankUser?.sort((a, b) => (b.point - a.point)).slice(0, 10).map((student, index) => {
          return (
            <div key={student.username}>
              <Divider light style={{ margin: '8px 0', height: '0.5px' }} />
              <Grid container>
                <Grid item xs={2} style={{ fontWeight: 'bold' }}>{index + 1}</Grid>
                <Grid item xs={8} style={{ textAlign: 'center'}}><Link href={`${ROUTER.USER}/${student.id}`}>{student.fullname}</Link></Grid>
                <Grid item xs={2} style={{ color: '#1BA94C', fontWeight: 'bold', textAlign: 'end' }}>{student.point}</Grid>
              </Grid>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}

const mapStateToProps = (state) => ({
  tags: select(state, 'tagsReducer', 'tags'),
  server_point: select(state, 'pointReducer', 'server_point'),
  courses: select(state, 'coursesReducer', 'courses'),
  usersList: select(state, 'usersReducer', 'usersList'),
  isFetching: select(state, 'studentsReducer', 'isFetching'),
});

const mapDispatchToProps = (dispatch) => ({
  getAllUsers: () => dispatch(getAllUsers()),
  getAllPointByCourseId: (id) => dispatch(getAllPointByCourseId(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(toJs(HomeRank));
