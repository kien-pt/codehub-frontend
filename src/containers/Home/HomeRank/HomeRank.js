import React, { useEffect } from 'react';
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
  useEffect(() => {
    props.getStudents();
  }, []);

  const [anchorEl, setAnchorEl] = React.useState(null);

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
        <Button onClick={handleClick} style={{ color: 'white', backgroundColor: '#20a8d8', width: '100%' }}>
          {props.courses[0]?.name}
        </Button>
        <StyledMenu
          id="customized-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {props.courses?.map((e) => (
            <MenuItem key={e.id}>{e.name}</MenuItem>
          ))}
        </StyledMenu>
        {props.students.slice(0, 10).map((e, index) => (
          <div key={e.id}>
            <Divider light style={{ margin: '8px 0', height: '0.5px' }} />
            <Grid container>
              <Grid item xs={2} style={{ fontWeight: 'bold' }}>{index + 1}</Grid>
              <Grid item xs={8}>{e.name}</Grid>
              <Grid item xs={2} style={{ color: 'rgb(32, 168, 216)', fontWeight: 'bold', textAlign: 'end' }}>{e.point}</Grid>
            </Grid>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

const mapStateToProps = (state) => ({
  courses: select(state, 'coursesReducer', 'courses'),
  students: select(state, 'studentsReducer', 'students'),
  isFetching: select(state, 'studentsReducer', 'isFetching'),
});

const mapDispatchToProps = (dispatch) => ({
  getStudents: () => dispatch(getStudents()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(toJs(HomeRank));

