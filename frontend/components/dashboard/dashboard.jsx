import React, { Component } from 'react';
import Nav from './nav_bar';

export default class Dashboard extends Component {

  render() {
    const { currentUser } = this.props;

    return (
      <div className='dashboard-page'>
        <Nav />
        <h2>Hello {currentUser.username}</h2>  
        
      </div>
    );
  }
}