import React, { Component } from 'react';

export default class Dashboard extends Component {

  render() {
    const { currentUser } = this.props

    return (
      <div>
        <h2>Hello {currentUser.username}</h2>  
        <button onClick={this.props.logout}>Logout</button>
      </div>
    );
  }
}