import React, { useState } from 'react';
import { Grid } from '@material-ui/core';

import InsertQuizForm from '../../containers/InsertQuiz/InsertQuizForm';
import InsertQuizSetting from '../../containers/InsertQuiz/InsertQuizSetting';
import InsertQuizTestCase from '../../containers/InsertQuiz/InsertQuizTestCase';

function InsertQuiz(props) {
  const courseId = props.location?.state?.courseId;

  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [content, setContent] = useState('');
  const [sampleInput, setSampleInput] = useState('');
  const [sampleOutput, setSampleOutput] = useState('');

  const [title, setTitle] = useState("");
  const [selectedTagId, setSelectedTagId] = useState("");
  const [selectedCourseId, setSelectedCourseId] = useState(courseId);

  const [testcase, setTestcase] = useState([{}]);

  return (
    <Grid container justify="center" spacing={3}>
      <Grid item lg={3} md={4} xs={12}>
        <InsertQuizSetting
          title={title}
          courseId={courseId}
          selectedTagId={selectedTagId}
          selectedCourseId={selectedCourseId}
          setTitle={setTitle}
          setSelectedTagId={setSelectedTagId}
          setSelectedCourseId={setSelectedCourseId}
        />
        <InsertQuizTestCase
          testcase={testcase}
          setTestcase={setTestcase}
        />
      </Grid>
      <Grid item lg={7} md={8} xs={12}>
        <InsertQuizForm
          title={title}
          input={input}
          output={output}
          content={content}
          testcase={testcase}
          sampleInput={sampleInput}
          sampleOutput={sampleOutput}
          selectedTagId={selectedTagId}
          selectedCourseId={selectedCourseId}
          setInput={setInput}
          setOutput={setOutput}
          setContent={setContent}
          setSampleInput={setSampleInput}
          setSampleOutput={setSampleOutput}
        />
      </Grid>
    </Grid>
  );
}

export default InsertQuiz;
