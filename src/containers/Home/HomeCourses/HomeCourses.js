import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardHeader,
  CardActionArea,
  LinearProgress,
} from '@material-ui/core';

import toJs from '../../../hoc/ToJS';
import select from '../../../utils/select';
import ROUTER from '../../../constant/router';
import { getCourses } from '../../../reducer/courses';

function HomeCourses(props) {
  const history = useHistory();
  const { getCourses } = props;

  useEffect(() => {
    getCourses();
  }, [getCourses]);

  return (
    <Card style={{ color: 'white', padding: 0 }}>
      <CardHeader
        title="Các lớp học phần"
        style={{ backgroundColor: '#39424E' }}
      />
      <CardContent>
        {props.courses.map((e) => (
          <Card key={e.id} style={{ marginBottom: 16 }}>
            <CardActionArea onClick={() => {
              history.push({
                pathname: `${ROUTER.COURSES}/${e.code}`,
                state: { courseId: e.id },
              });
            }}>
              <CardContent>
                <div style={{ fontWeight: 'bold', fontSize: 20, padding: '16px 0 8px 0' }}>{e.name}</div>
                <LinearProgress variant="determinate" value={0} style={{ width: '70%' }} />
                <div style={{ padding: '12px 0' }}>
                  <span style={{ fontWeight: 'bold' }}>0%</span>
                  <span>&nbsp; (0/1000)</span>
                </div>
                <div className="cardButton" style={{ width: '20%' }}>Tiếp tục luyện tập</div>
              </CardContent>
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

