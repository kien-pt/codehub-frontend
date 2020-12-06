import React from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@material-ui/core';
import Interweave from 'interweave';


import toJs from '../../../hoc/ToJS';
import select from '../../../utils/select';

function InsertQuizPreviewModal(props) {
  const {
    input,
    output,
    content,
    sampleInput,
    sampleOutput,
    isPreviewing,
    setPreviewing
  } = props;

  var contentPart = '';
  content.split('\n').forEach((row) => {
    contentPart += `<p style="textAlign:justify">${row}</p>`; 
  });

  var inputPart = '<strong>Input:</strong>';
  input.split('\n').forEach((row) => {
    inputPart += `<p style="textAlign:justify">${row}</p>`; 
  });

  var outputPart = '<strong>Output:</strong>';
  output.split('\n').forEach((row) => {
    outputPart += `<p style="textAlign:justify">${row}</p>`; 
  });

  const combine = `
    <div class='problem-content'>
      ${contentPart}
      <p style="textAlign:justify">
        ${inputPart}
        ${outputPart}
      </p>
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
      </div>
    </div>
  `;

  console.log(combine)


  return (
    <Dialog open={isPreviewing} onClose={() => setPreviewing(false)}>
      <DialogTitle>Xem trước</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Interweave content={combine} />
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="primary" onClick={() => setPreviewing(false)}>Đóng</Button>
      </DialogActions>
    </Dialog>
  );
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(toJs(InsertQuizPreviewModal));

