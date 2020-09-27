import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  Card,
  CardHeader,
  CardContent,
  CardActionArea,
} from '@material-ui/core';

import toJs from '../../../hoc/ToJS';
import select from '../../../utils/select';

import ROUTER from '../../../constant/router';

import { getCourses } from '../../../reducer/courses';
import { getQuiz, getTags } from '../../../reducer/quiz';

function HomeCourses(props) {
  const history = useHistory();

  useEffect(() => {
    props.getCourses();
    props.getTags();
    props.getQuiz();
  }, []);

  return (
    <>
      {props.courses?.find((course) => course.id === props.courseId)?.tags?.map((tagId) => {
        const tag = props.tags.find((e) => e.id == tagId);
        return (
          <Card style={{ padding: 0, marginBottom: 16 }}>
            <CardHeader
              title={tag?.name}
              style={{ backgroundColor: '#f0f3f5' }}
            />
            <CardContent>
              {tag?.quizList.map((quizId) => (
                <Card style={{ margin: '8px 0', background: 'linear-gradient(270deg,#36d1dc,#5b86e5)' }}>
                  {console.log(quizId)}
                  <CardActionArea onClick={() => {
                    history.push({
                      pathname: `${ROUTER.COURSES}/${quizId}`,
                      state: { quizId: quizId },
                    });
                  }}>
                    <CardHeader title={props.quiz?.find((quiz) => quiz.id == quizId)?.name}/>
                  </CardActionArea>
                </Card>
              ))}
            </CardContent>
          </Card>
        )
      })}
    </>
  );
}

const mapStateToProps = (state) => ({
  quiz: select(state, 'quizReducer', 'quiz'),
  tags: select(state, 'quizReducer', 'tags'),
  courses: select(state, 'coursesReducer', 'courses'),
  isFetching: select(state, 'coursesReducer', 'isFetching'),
});

const mapDispatchToProps = (dispatch) => ({
  getQuiz: () => dispatch(getQuiz()),
  getTags: () => dispatch(getTags()),
  getCourses: () => dispatch(getCourses()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(toJs(HomeCourses));

