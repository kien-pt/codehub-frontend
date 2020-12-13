import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
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

import { getAllUsers } from '../../../reducer/users';
import { getPointByCourseId } from '../../../reducer/point';

function HomeRank(props) {
  const { courses } = props;
  const { getAllUsers, getPointByCourseId } = props;
  const [courseIndex, setCourseIndex] = useState(0);

  const selectedCourse = courses?.length > 0 ? courses[courseIndex] : null;

  const rankUser = props.usersList.map((user) => ({...user, point: 0}));
  props.point.forEach((e) => {
    const index = rankUser.findIndex((user) => user.id === e.userID);
    rankUser.splice(index, 1, {...rankUser[index], point: e.total_point});
  });
  // console.log(rankUser);

  // Get all students
  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  useEffect(() => {
    if (selectedCourse) getPointByCourseId(selectedCourse.id);
  }, [courseIndex, getPointByCourseId, courses, selectedCourse]);

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
      <CardContent>
        <Button variant="contained" color="primary" disabled={props.disabled} onClick={handleClick} style={{ width: '100%' }}>{selectedCourse?.name}</Button>
        <StyledMenu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
          {courses?.map((e, index) => <MenuItem key={e.code} onClick={() => handleSelect(index)}>{e.name}</MenuItem>)}
        </StyledMenu>
        {rankUser?.sort((a, b) => (b.point - a.point)).slice(0, 10).map((student, index) => {
          var totalPoint = 0;
          // props.point.forEach((e) => totalPoint += (e.courseIndex === courses.find((course) => course.id === courseIndex)?.id && e.userId === student.id) ? e.point : 0);
          return (
            <div key={student.username}>
              <Divider light style={{ margin: '8px 0', height: '0.5px' }} />
              <Grid container>
                <Grid item xs={2} style={{ fontWeight: 'bold' }}>{index + 1}</Grid>
                <Grid item xs={8} style={{ textAlign: 'center'}}>{student.fullname}</Grid>
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
  point: select(state, 'pointReducer', 'point'),
  courses: select(state, 'coursesReducer', 'courses'),
  usersList: select(state, 'usersReducer', 'usersList'),
  isFetching: select(state, 'studentsReducer', 'isFetching'),
});

const mapDispatchToProps = (dispatch) => ({
  getAllUsers: () => dispatch(getAllUsers()),
  getPointByCourseId: (id) => dispatch(getPointByCourseId(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(toJs(HomeRank));
