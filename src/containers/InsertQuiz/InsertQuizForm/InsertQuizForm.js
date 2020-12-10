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

import InsertQuizPreviewModal from '../InsertQuizPreviewModal';

import toJs from '../../../hoc/ToJS';

import './index.css';

function InsertQuizForm(props) {
  const { content, setContent } = props;
  const { input, setInput } = props;
  const { output, setOutput } = props;
  const { sampleInput, setSampleInput } = props;
  const { sampleOutput, setSampleOutput } = props;
  const { title, selectedCourseId, setSelectedTagId, testcase } = props;

  const [isPreviewing, setPreviewing] = useState(false);

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
            <Button variant="contained" color="primary" style={{ float: 'right' }}>Lưu</Button>
          </Grid>
        </CardActions>
      </Card>

      <InsertQuizPreviewModal
        input={input}
        output={output}
        sampleInput={sampleInput}
        sampleOutput={sampleOutput}
        content={content}
        isPreviewing={isPreviewing}
        setPreviewing={setPreviewing}
      />
    </>
  );
}

const mapStateToProps = () => ({
});

const mapDispatchToProps = () => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(toJs(InsertQuizForm));

