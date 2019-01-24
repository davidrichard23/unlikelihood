import React, { Component } from 'react';
import Nav from './nav_bar';

export default class Dashboard extends Component {

  render() {
    const { currentUser } = this.props;

    return (
      <div className='dashboard-page'>
        <Nav />
        <div className="wrapper">
          <h2>{currentUser.first_name + ' ' + currentUser.last_name}'s Portfolio</h2>  
        </div>
        
      </div>
    );
  }
}