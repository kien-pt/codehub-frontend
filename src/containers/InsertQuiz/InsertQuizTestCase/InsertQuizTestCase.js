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
  Grid,
  IconButton,
  TextareaAutosize,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab'; 
import { ChevronLeft, ChevronRight } from '@material-ui/icons';

import { getCourses } from '../../../reducer/courses';
import { getTagsByCourseId } from '../../../reducer/quiz';

import toJs from '../../../hoc/ToJS';
import select from '../../../utils/select';
import ROUTER from '../../../constant/router';

function InsertQuizTestCase(props) {
  const [testcase, setTestcase] = useState([{}]);

  const handleDeleteTestcase = () => {
    const temp = testcase;
    if (temp.length >= 1) temp.splice(temp.length - 1);
    console.log(temp);
    setTestcase([...temp]);
  }

  const handleInsertTestcase = () => {
    const temp = [...testcase, {}];
    console.log(temp);
    setTestcase([...temp]);
  }

  console.log(testcase);

  return (
    <Card style={{ marginTop: 32 }}>
      <CardHeader
        title={
          <Grid container>
            <Grid item xs={8}>Cài đặt Testcase</Grid>
            <Grid item xs={4}>
              <IconButton size="small" onClick={handleInsertTestcase} style={{ float: 'right', marginBottom: 2 }}>
                <ChevronRight style={{ color: 'white' }} />
              </IconButton>
              <span style={{ float: 'right', marginBottom: 2 }}>{testcase.length}</span>
              <IconButton size="small" onClick={handleDeleteTestcase} style={{ float: 'right', marginBottom: 2 }}>
                <ChevronLeft style={{ color: 'white' }} />
              </IconButton>
            </Grid>
          </Grid>
        }
        style={{ color: 'white', backgroundColor: '#39424E', paddingRight: 8 }}
      />
      <CardContent>
        <div className='problem-sample'>
          <ul style={{ margin: 0, borderBottom: '1px solid #bbb' }}>
            {testcase.map((test, index) => (
              <>
                {/* <strong style={{ paddingTop: 4 }}>{`Testcase #${index + 1}:`}</strong> */}
                <li style={{ margin: 0 }}>
                  <strong style={{ paddingTop: 4, textAlign: 'center' }}>{`Testcase #${index + 1}:`}</strong>
                  <div className='sample-type'>input</div>
                  <TextareaAutosize className="text-area table-text-area" rowsMin={1} />
                  <div className='sample-type' style={{ borderTop: '1px solid #bbb' }}>output</div>
                  <TextareaAutosize className="text-area table-text-area" rowsMin={1} />
                </li>
              </>
            ))}
          </ul>
        </div>
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
)(toJs(InsertQuizTestCase));

