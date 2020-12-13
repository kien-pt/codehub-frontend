import React, { useState, useEffect } from 'react';
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
import select from '../../../utils/select';

import { getQuizById, updateQuiz } from '../../../reducer/quiz';

import './index.css';
import InsertQuizPreviewModal from '../../InsertQuiz/InsertQuizPreviewModal';

function UpdateQuizForm(props) {
  const history = useHistory();

  const { content, setContent } = props;
  const { input, setInput } = props;
  const { output, setOutput } = props;
  const { sampleInput, setSampleInput } = props;
  const { sampleOutput, setSampleOutput } = props;
  const { quizId, getQuizById } = props;
  const { title, selectedTagId, testcase } = props;

  useEffect(() => {
    getQuizById(quizId);
  }, [getQuizById, quizId]);

  const quiz = props.quizList.find((quiz) => quiz.id === quizId);
  var combine = quiz?.content;
  combine = combine?.replaceAll("<div class='problem-content'>\n", "");
  combine = combine?.replaceAll("<div class='problem-sample'>\n", "");
  combine = combine?.replaceAll("</div>\n", "");
  
  useEffect(() => {
    var tempContent = "";
    const contentPart = combine?.split('\n')[0].substring(2).replaceAll("<p style='textAlign:justify'>", "")?.split('</p>') || [];
    contentPart.splice(contentPart.length - 1, 1);
    contentPart.forEach((e, index) => tempContent += (e === "") ? '\n' : `${e}${index === contentPart.length - 1 ? '' :'\n'}`);
    setContent(tempContent);

    var tempInput = "";
    var inputPart = combine?.split('\n')[1].substring(2).replaceAll("<p style='textAlign:justify'><strong>Input:</strong></p>", "");
    inputPart = inputPart?.replaceAll("<p style='textAlign:justify'>", "")?.split('</p>') || [];
    inputPart.splice(inputPart.length - 1, 1);
    inputPart.forEach((e, index) => tempInput += (e === "") ? '\n' : `${e}${index === inputPart.length - 1 ? '' :'\n'}`);
    setInput(tempInput);

    var tempOutput = "";
    var outputPart = combine?.split('\n')[2].substring(2).replaceAll("<p style='textAlign:justify'><strong>Output:</strong></p>", "");
    outputPart = outputPart?.replaceAll("<p style='textAlign:justify'>", "")?.split('</p>') || [];
    outputPart.splice(outputPart.length - 1, 1);
    outputPart.forEach((e, index) => tempOutput += (e === "") ? '\n' : `${e}${index === outputPart.length - 1 ? '' :'\n'}`);
    setOutput(tempOutput);

    var samplePart = combine?.split('\n')[6].substring(2).replaceAll("    <div class='sample-type'>input      <div class='sample-value'>", "");
    samplePart = samplePart?.replaceAll("      <div class='sample-type'>output      <div class='sample-value'>", ",");
    samplePart = samplePart?.replaceAll("    </li>", "");
    setSampleInput(samplePart?.split(',')[0]);
    setSampleOutput(samplePart?.split(',')[1]);
  }, [combine, setContent, setInput, setOutput, setSampleInput, setSampleOutput]);

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


  const previewCombine = 
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

  console.log(previewCombine);

  const [isPreviewing, setPreviewing] = useState(false);

  const updateQuiz = () => {
    props.updateQuiz(
      history,
      {
        id: quizId,
        title,
        content: previewCombine,
        tagId: selectedTagId,
        testCases: testcase,
      }
    );
  } 

  return (
    <>
      <Card>
        <CardHeader
          title="Sửa bài tập"
          style={{ color: 'white', backgroundColor: '#39424E' }}
        />
        <CardContent>
          <strong>Yêu cầu:</strong>
          <TextareaAutosize className="text-area" value={content} rowsMin={3} onChange={(e) => setContent(e.target.value)} />
          <strong>Input:</strong>
          <TextareaAutosize className="text-area" value={input} rowsMin={1} onChange={(e) => setInput(e.target.value)} />
          <strong>Output:</strong>
          <TextareaAutosize className="text-area" value={output} rowsMin={1} onChange={(e) => setOutput(e.target.value)} />
          <div className='problem-sample'>
            <strong>Ví dụ:</strong>
            <ul style={{ margin: 0, borderBottom: '1px solid #bbb' }}>
              <li style={{ margin: 0 }}>
                <div className='sample-type'>input</div>
                <TextareaAutosize className="text-area table-text-area" value={sampleInput} rowsMin={1} onChange={(e) => setSampleInput(e.target.value)} />
                <div className='sample-type' style={{ borderTop: '1px solid #bbb' }}>output</div>
                <TextareaAutosize className="text-area table-text-area" value={sampleOutput} rowsMin={1} onChange={(e) => setSampleOutput(e.target.value)} />
              </li>
            </ul>
          </div>
        </CardContent>
        <CardActions style={{ padding: '0 16px 8px' }}>
          <Grid style={{ width: '100%' }}>
            <Button variant="outlined" onClick={() => setPreviewing(true)}>Xem trước</Button>
            <Button variant="contained" onClick={updateQuiz} color="primary" style={{ float: 'right' }}>Lưu</Button>
          </Grid>
        </CardActions>
      </Card>

      <InsertQuizPreviewModal
        combine={previewCombine}
        isPreviewing={isPreviewing}
        setPreviewing={setPreviewing}
      />
    </>
  );
}

const mapStateToProps = (state) => ({
  quizList: select(state, 'quizReducer', 'quiz'),
  isFetching: select(state, 'quizReducer', 'isFetching'),
});

const mapDispatchToProps = (dispatch) => ({
  getQuizById: (id) => dispatch(getQuizById(id)),
  updateQuiz: (history, payload) => dispatch(updateQuiz(history, payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(toJs(UpdateQuizForm));
