import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  Card,
  CardHeader,
  CardContent,
  Grid,
  Divider,
  Button,
  Menu,
  MenuItem,
  withStyles,
} from '@material-ui/core';

import toJs from '../../../hoc/ToJS';
import select from '../../../utils/select';
import { getStudents } from '../../../reducer/students';

function HomeRank(props) {
  const { getStudents } = props;
  const [courseId, setCourseId] = useState(props.courseId);

  useEffect(() => {
    getStudents();
  }, [getStudents]);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleSelect = (index) => {
    setCourseId(index);
    handleClose();
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
    <Card style={{ padding: 0 }}>
      <CardHeader
        title="Bảng xếp hạng"
        style={{ color: 'white', backgroundColor: '#39424E' }}
      />
      <CardContent>
        <Button
          variant="contained"
          color="primary"
          disabled={props.disabled}
          onClick={handleClick}
          style={{ width: '100%' }}
        >
          {props.courses.find((course) => course.id === courseId)?.name}
        </Button>
        <StyledMenu
          id="customized-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {props.courses?.map((e) => (
            <MenuItem key={e.id} onClick={() => handleSelect(e.id)}>{e.name}</MenuItem>
          ))}
        </StyledMenu>
        {props.students.slice(0, 10).map((student, index) => {
          var totalPoint = 0;
          console.log(props.point, courseId);
          props.point.forEach((e) => totalPoint += (e.courseId === props.courses.find((course) => course.id === courseId)?.id && e.userId === student.id) ? e.point : 0);
          return (
            <div key={student.id}>
              <Divider light style={{ margin: '8px 0', height: '0.5px' }} />
              <Grid container>
                <Grid item xs={2} style={{ fontWeight: 'bold' }}>{index + 1}</Grid>
                <Grid item xs={8} style={{ textAlign: 'center'}}>{student.name}</Grid>
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
  courses: select(state, 'coursesReducer', 'courses'),
  students: select(state, 'studentsReducer', 'students'),
  point: select(state, 'pointReducer', 'point'),
  isFetching: select(state, 'studentsReducer', 'isFetching'),
});

const mapDispatchToProps = (dispatch) => ({
  getStudents: () => dispatch(getStudents()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(toJs(HomeRank));

