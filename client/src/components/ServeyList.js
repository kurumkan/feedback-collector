import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class ServeyList extends React.Component {
  componentDidMount() {
    this.props.fetchServeys();
  }
  renderList = () => (
    this.props.serveys.reverse().map(s => (
      <div key={s._id} className="card darken-1">
        <div className="card-content text-white">
          <span className="card-title">{s.title}</span>
          <p>{s.body}</p>
        </div>
        <div className="card-action">
          <a>Yes {s.yes}</a>
          <a>No {s.no}</a>
        </div>
      </div>
    ))
  );
  render() {
    if(!this.props.serveys.length) {
      return <div>Loading ...</div>
    }
    console.log(this.props.serveys)
    return (
      <div>
        {this.renderList()}
      </div>
    );
  }
}

const select = (state) => ({
  serveys: state.serveys
});

export default connect(select, actions)(ServeyList);
