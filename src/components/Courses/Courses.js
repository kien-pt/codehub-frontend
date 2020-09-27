import React from 'react';
import { Markup } from 'interweave';
import QuizList from '../../containers/Courses/QuizList';

function Courses(props) {
  const courseId = props.history.location.state.courseId;
  return (
    <QuizList courseId={courseId} />
  );
}

export default Courses;
