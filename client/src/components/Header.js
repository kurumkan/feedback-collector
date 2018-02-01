import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from './Payments';

class Header extends Component {
  renderContent = () => {
    const { auth } = this.props;
    switch(auth) {
      case null: {
        return null;
      }
      case false: {
        return <li><a href="/auth/google">Login with Google</a></li>;
      }
      default: {
        return [
          <li key="payments"><Payments /></li>,
          <li key="credits" style={{margin: '0 15px'}}>Credits: {auth.credits}</li>,
          <li key="logou"><a href="/api/logout">Logout</a></li>
        ]
      }
    }
  };

  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <Link to={ this.props.auth ? '/serveys' : '/' } className="left brand-logo">Feedback Collector</Link>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            { this.renderContent() }
          </ul>
        </div>
      </nav>
    )
  }
}

const select = ({ auth }) => ({ auth });

export default connect(select)(Header);