import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Button,
  Grid,
  LinearProgress,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  CardActionArea,
  DialogContentText,
  DialogActions,
  Snackbar,
  Fab,
  Typography,
  TextareaAutosize,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab'; 
import { AddBox, Clear } from '@material-ui/icons';

import InsertQuizPreviewModal from '../InsertQuizPreviewModal';

import toJs from '../../../hoc/ToJS';
import select from '../../../utils/select';
import ROUTER from '../../../constant/router';

import './index.css';

function InsertQuizForm(props) {
  const [isPreviewing, setPreviewing] = useState(false);
  const [content, setContent] = useState('');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [sampleInput, setSampleInput] = useState('');
  const [sampleOutput, setSampleOutput] = useState('');

  const isAdmin = sessionStorage.getItem("isAdmin") === 'true';

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

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(toJs(InsertQuizForm));

