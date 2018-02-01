import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from "../actions";
import StripeCheckout from 'react-stripe-checkout';

class Payments extends Component {
  render() {
    return (
      <StripeCheckout
        name="Feedback Collector"
        description="$5 for 5 email credits"
        amount={500}
        token={this.props.handleToken}
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
      >
        <button className="btn">Add Credits</button>
      </StripeCheckout>
    );
  }
}

export default connect(null, actions)(Payments);

