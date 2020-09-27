import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardActionArea } from '@material-ui/core';

import toJs from '../../../hoc/ToJS';
import select from '../../../utils/select';
import ROUTER from '../../../constant/router';
import { getCourses } from '../../../reducer/courses';

function HomeCourses(props) {
  const history = useHistory();

  useEffect(() => {
    props.getCourses();
  }, [props]);

  return (
    <Card style={{ padding: 0 }}>
      <CardHeader
        title="Các lớp học phần"
        style={{ background: 'linear-gradient(90deg,#48b1bf,#06beb6)' }}
      />
      <CardContent>
        {props.courses.map((e) => (
          <Card key={e.id} style={{ margin: '8px 0', background: 'linear-gradient(270deg,#36d1dc,#5b86e5)' }}>
            <CardActionArea onClick={() => {
              history.push({
                pathname: `${ROUTER.COURSES}/${e.code}`,
                state: { courseId: e.id },
              });
            }}>
              <CardHeader title={e.name}/>
            </CardActionArea>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
}

const mapStateToProps = (state) => ({
  courses: select(state, 'coursesReducer', 'courses'),
  isFetching: select(state, 'coursesReducer', 'isFetching'),
});

const mapDispatchToProps = (dispatch) => ({
  getCourses: () => dispatch(getCourses()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(toJs(HomeCourses));

