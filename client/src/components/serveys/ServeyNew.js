import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import ServeyForm from './ServeyForm';
import ServeyFormReview from './ServeyFormReview';

class ServeyNew extends Component {
  state = { showFormReview: false };

  renderContent = () => {
    if(this.state.showFormReview) {
      return <ServeyFormReview onCancel={() => this.setState({ showFormReview: false })}/>;
    }
    return <ServeyForm onServeySubmit={() => this.setState({ showFormReview: true })}/>;
  };

  render() {
    return (
      <div>
        {this.renderContent()}
      </div>
    );
  }
}

export default reduxForm({ form: 'serveyForm' })(ServeyNew);