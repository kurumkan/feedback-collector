import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions';

const ServeyReview = ({formValues, onCancel, sendServey, history}) => {
  return (
    <div>
      <h5>Please confirm your entries</h5>
      <div>
        <label>Title</label>
        <div>{formValues.title}</div>
      </div>
      <div>
        <label>Subject</label>
        <div>{formValues.subject}</div>
      </div>
      <div>
        <label>Email Body</label>
        <div>{formValues.body}</div>
      </div>
      <div>
        <label>Recipients List</label>
        <div>{formValues.recipients}</div>
      </div>

      <button className="yellow darken-3 white-text btn-flat" onClick={onCancel}>
        Back
      </button>
      <button className="green white-text btn-flat right" onClick={() => sendServey(formValues, history)}>
        Send
        <i className="material-icons right">email</i>
      </button>
    </div>
  );
};

const select = (state) => ({
  formValues: state.form.serveyForm.values
});

export default connect(select, actions)(withRouter(ServeyReview));