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

function HomeRank(props) {
  const { getAllUsers } = props;
  const [courseIndex, setCourseIndex] = useState(0);

  // Get all students
  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

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
        <Button variant="contained" color="primary" disabled={props.disabled} onClick={handleClick} style={{ width: '100%' }}>
          {props.courses?.length > 0 ? props.courses[courseIndex].name : null}
        </Button>
        <StyledMenu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
          {props.courses?.map((e, index) => (
            <MenuItem key={e.code} onClick={() => handleSelect(index)}>{e.name}</MenuItem>
          ))}
        </StyledMenu>
        {props.usersList?.filter((user) => !user.admin).slice(0, 10).map((student, index) => {
          var totalPoint = 0;
          props.point.forEach((e) => totalPoint += (e.courseIndex === props.courses.find((course) => course.id === courseIndex)?.id && e.userId === student.id) ? e.point : 0);
          return (
            <div key={student.username}>
              <Divider light style={{ margin: '8px 0', height: '0.5px' }} />
              <Grid container>
                <Grid item xs={2} style={{ fontWeight: 'bold' }}>{index + 1}</Grid>
                <Grid item xs={8} style={{ textAlign: 'center'}}>{student.fullname}</Grid>
                <Grid item xs={2} style={{ color: '#1BA94C', fontWeight: 'bold', textAlign: 'end' }}>{totalPoint}</Grid>
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
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(toJs(HomeRank));
