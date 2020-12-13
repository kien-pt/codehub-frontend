import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Button,
  Grid,
  TextareaAutosize,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';

import toJs from '../../../hoc/ToJS';

import { insertQuiz } from '../../../reducer/quiz';

import InsertQuizPreviewModal from '../InsertQuizPreviewModal';
import './index.css';

function InsertQuizForm(props) {
  const history = useHistory();
  const { content, setContent } = props;
  const { input, setInput } = props;
  const { output, setOutput } = props;
  const { sampleInput, setSampleInput } = props;
  const { sampleOutput, setSampleOutput } = props;
  const { title, selectedCourseId, selectedTagId, testcase } = props;

  var contentPart = '';
  content.split('\n').forEach((row) => {
    contentPart += `<p style='textAlign:justify'>${row}</p>`; 
  });

  var inputPart = "<p style='textAlign:justify'><strong>Input:</strong></p>";
  input.split('\n').forEach((row) => {
    inputPart += `<p style='textAlign:justify'>${row}</p>`; 
  });

  var outputPart = "<p style='textAlign:justify'><strong>Output:</strong></p>";
  output.split('\n').forEach((row) => {
    outputPart += `<p style='textAlign:justify'>${row}</p>`; 
  });

  const combine =
`<div class='problem-content'>
  ${contentPart}
  ${inputPart}
  ${outputPart}
</div>
<div class='problem-sample'>
  <strong>Ví dụ:</strong>
  <ul style="margin: 0">
    <li>
      <div class='sample-type'>input</div>
      <div class='sample-value'>${sampleInput}</div>
      <div class='sample-type'>output</div>
      <div class='sample-value'>${sampleOutput}</div>
    </li>
  </ul>
</div>`;

  const [isPreviewing, setPreviewing] = useState(false);

  const insertQuiz = () => {
    props.insertQuiz(
      history,
      {
        quiz: {
          title,
          content: combine.toString(),
          tagId: selectedTagId,
        },
        testCases: testcase,
      }
    );
  } 

  return (
    <>
      <Card>
        <CardHeader
          title="Thêm bài tập"
          style={{ color: 'white', backgroundColor: '#39424E' }}
        />
        <CardContent>
          <strong>Yêu cầu:</strong>
          <TextareaAutosize className="text-area" rowsMin={3} onChange={(e) => setContent(e.target.value)} />
          <strong>Input:</strong>
          <TextareaAutosize className="text-area" rowsMin={1} onChange={(e) => setInput(e.target.value)} />
          <strong>Output:</strong>
          <TextareaAutosize className="text-area" rowsMin={1} onChange={(e) => setOutput(e.target.value)} />
          <div className='problem-sample'>
            <strong>Ví dụ:</strong>
            <ul style={{ margin: 0, borderBottom: '1px solid #bbb' }}>
              <li style={{ margin: 0 }}>
                <div className='sample-type'>input</div>
                <TextareaAutosize className="text-area table-text-area" rowsMin={1} onChange={(e) => setSampleInput(e.target.value)} />
                <div className='sample-type' style={{ borderTop: '1px solid #bbb' }}>output</div>
                <TextareaAutosize className="text-area table-text-area" rowsMin={1} onChange={(e) => setSampleOutput(e.target.value)} />
              </li>
            </ul>
          </div>
        </CardContent>
        <CardActions style={{ padding: '0 16px 8px' }}>
          <Grid style={{ width: '100%' }}>
            <Button variant="outlined" onClick={() => setPreviewing(true)}>Xem trước</Button>
            <Button variant="contained" onClick={insertQuiz} color="primary" style={{ float: 'right' }}>Lưu</Button>
          </Grid>
        </CardActions>
      </Card>

      <InsertQuizPreviewModal
        combine={combine}
        isPreviewing={isPreviewing}
        setPreviewing={setPreviewing}
      />
    </>
  );
}

const mapStateToProps = () => ({
});

const mapDispatchToProps = (dispatch) => ({
  insertQuiz: (history, payload) => dispatch(insertQuiz(history, payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(toJs(InsertQuizForm));

