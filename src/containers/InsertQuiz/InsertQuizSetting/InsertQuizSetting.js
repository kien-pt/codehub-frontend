import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardHeader,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab'; 
import { AddBox, Clear } from '@material-ui/icons';

import { getCourses } from '../../../reducer/courses';
import { getTagsByCourseId } from '../../../reducer/quiz';

import toJs from '../../../hoc/ToJS';
import select from '../../../utils/select';
import ROUTER from '../../../constant/router';

function InsertQuizSetting(props) {
  const { courseId } = props;
  const { courses, getCourses } = props;
  const { tags, getTagsByCourseId } = props;

  const { selectedCourseId, setSelectedCourseId } = props;
  const { selectedTagId, setSelectedTagId } = props;
  const { title, setTitle } = props;

  useEffect(() => {
    getCourses();
  }, [getCourses]);

  useEffect(() => {
    getTagsByCourseId(selectedCourseId);
  }, [selectedCourseId, getTagsByCourseId]);

  useEffect(() => {
    setSelectedTagId("");
  }, [setSelectedTagId, tags]);

  const handleSelect = (e) => {
    console.log("ok");
    setSelectedCourseId(e.target.value);
    getTagsByCourseId(selectedCourseId);
  }

  return (
    <Card>
      <CardHeader
        title="Cài đặt chung"
        style={{ color: 'white', backgroundColor: '#39424E' }}
      />
      <CardContent>
        <FormControl variant="outlined" style={{ width: '100%', marginBottom: 12 }}>
          <InputLabel style={{ backgroundColor: 'white', height: 9, padding: '0 4px' }}>Tên bài tập</InputLabel>
          <OutlinedInput
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            inputProps={{ style: {fontSize: 18, marginLeft: 10 }}}
            style={{ height: 56 }}
          />
        </FormControl>
        <FormControl variant="outlined" style={{ width: '100%' }}>
          <InputLabel style={{ backgroundColor: 'white', height: 9, padding: '0 4px' }}>Chọn khoá học</InputLabel>
          <Select native value={selectedCourseId} onChange={handleSelect}>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>{`${course.code} - ${course.name}`}</option>
            ))}
          </Select>
        </FormControl>
        <FormControl variant="outlined" style={{ width: '100%', marginTop: 12 }}>
          <InputLabel style={{ backgroundColor: 'white', height: 9, padding: '0 4px' }}>Chọn danh mục khoá học</InputLabel>
          <Select native value={selectedTagId} onChange={(e) => setSelectedTagId(e.target.value)}>
            {tags.map((tag) => (
              <option key={tag.id} value={tag.id}>{tag.name}</option>
            ))}
          </Select>
        </FormControl>
      </CardContent>
    </Card>
  );
}

const mapStateToProps = (state) => ({
  tags: select(state, 'quizReducer', 'tags'),
  courses: select(state, 'coursesReducer', 'courses'),
});

const mapDispatchToProps = (dispatch) => ({
  getCourses: () => dispatch(getCourses()),
  getTagsByCourseId: (id) => dispatch(getTagsByCourseId(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(toJs(InsertQuizSetting));

