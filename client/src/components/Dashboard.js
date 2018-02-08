import React from 'react';
import { Link } from 'react-router-dom';
import ServeyList from './ServeyList';

const Dashboard = (props) => {
  return (
    <div>
      <ServeyList />
      <div className="fixed-action-btn">
        <Link to="serveys/new" className="btn-floating btn-large waves-effect waves-light red">
          <i className="material-icons">add</i>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
