import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import ServeyField from './ServeyField';

const FIELDS = [
  { label: 'Servey Title', name: 'title' },
  { label: 'Subject', name: 'subject' },
  { label: 'Email text', name: 'body' },
  { label: 'List of recipients', name: 'recipients' }
];

class ServeyForm extends Component {
  renderFields = () =>
    FIELDS.map(({ label, name }) => (
      <Field
        component={ServeyField}
        type="text"
        label={label}
        name={name}
        key={name}
      />
    ));

  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onServeySubmit)}>
          {this.renderFields()}
          <Link to="/serveys" className="red btn btn-flat white-text">
            Cancel
          </Link>
          <button className="teal btn-flat right white-text" type="submit">
            Submit
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    );
  }
};

const validateEmails = emails => {
  const re = /^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const invalidEmails = emails.split(',')
    .map(email => email.trim())
    .filter(email => re.test(email) === false);

  if(invalidEmails.length) {
    return `There are invalid emails: ${invalidEmails}`;
  }
};

const validate = (values) => {
  const errors = {};
  if(!values.title) {
    errors.title = 'Please enter title';
  }
  if(!values.subject) {
    errors.subject = 'Please enter subject';
  }
  if(!values.body) {
    errors.body = 'Please enter body';
  }
  errors.emails = validateEmails(values.emails || '');
  return errors;
};

export default reduxForm({
  validate,
  form: 'serveyForm',
  destroyOnUnmount: false
})(ServeyForm);