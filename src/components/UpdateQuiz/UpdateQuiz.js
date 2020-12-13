import React, { useState } from 'react';
import { Grid } from '@material-ui/core';

import UpdateQuizForm from '../../containers/UpdateQuiz/UpdateQuizForm';
import UpdateQuizSetting from '../../containers/UpdateQuiz/UpdateQuizSetting';
// import UpdateQuizTestCase from '../../containers/UpdateQuiz/UpdateQuizTestCase';

function UpdateQuiz(props) {
  const courseId = props.location?.state?.courseId;

  const [content, setContent] = useState('');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [sampleInput, setSampleInput] = useState('');
  const [sampleOutput, setSampleOutput] = useState('');

  const [title, setTitle] = useState("");
  const [selectedCourseId, setSelectedCourseId] = useState(courseId ? courseId : "");
  const [selectedTagId, setSelectedTagId] = useState("");

  const [testcase, setTestcase] = useState([{}]);

  const temp = window.location.href.split('/');
  const quizId = parseInt(temp[temp.length - 1]);

  return (
    <Grid container justify="center" spacing={3}>
      <Grid item lg={3} md={4} xs={12}>
        <UpdateQuizSetting
          quizId={quizId}
          courseId={courseId}
          title={title}
          selectedCourseId={selectedCourseId}
          selectedTagId={selectedTagId}
          setTitle={setTitle}
          setSelectedCourseId={setSelectedCourseId}
          setSelectedTagId={setSelectedTagId}
        />
        {/* <UpdateQuizTestCase
          testcase={testcase}
          setTestcase={setTestcase} 
        /> */}
      </Grid>
      <Grid item lg={7} md={8} xs={12}>
        <UpdateQuizForm
          quizId={quizId}
          content={content}
          input={input}
          output={output}
          sampleInput={sampleInput}
          sampleOutput={sampleOutput}
          setContent={setContent}
          setInput={setInput}
          setOutput={setOutput}
          setSampleInput={setSampleInput}
          setSampleOutput={setSampleOutput}
          title={title}
          selectedCourseId={selectedCourseId}
          selectedTagId={selectedTagId}
          testcase={testcase}
        />
      </Grid>
    </Grid>
  );
}

export default UpdateQuiz;
