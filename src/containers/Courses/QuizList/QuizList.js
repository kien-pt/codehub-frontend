import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  Card,
  CardHeader,
  CardContent,
  CardActionArea,
  Grid,
  Button,
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
              style={{ color: 'white', backgroundColor: '#39424E' }}
            />
            <CardContent>
              {tag?.quizList.map((quizId) => (
                <Card style={{ marginBottom: '8px' }}>
                  {console.log(quizId)}
                  <CardActionArea onClick={() => {
                    history.push({
                      pathname: `${ROUTER.QUIZ}/${quizId}`,
                      state: { quizId: quizId },
                    });
                  }}>
                    <CardContent>
                      <Grid container>
                        <Grid item xs={8}>
                          <div style={{ fontSize: 24, padding: 8 }}>
                            {props.quiz?.find((quiz) => quiz.id == quizId)?.name}
                          </div>
                        </Grid>
                        <Grid item xs={4}>
                          <Button variant="outlined" style={{ float: 'right', color: '#1BA94C', borderColor: '#1BA94C' }}>0/100</Button>
                        </Grid>
                      </Grid>
                      
                    </CardContent>
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

