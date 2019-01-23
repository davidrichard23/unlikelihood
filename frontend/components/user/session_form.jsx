import React, { Component } from 'react';

export default class SessionForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email: "",
      balance: 1000,
    };
    
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  render() {
    const isSignup = this.props.formType === 'signup'

    return (
      <div>
        {this.Errors()}
        
        <form onSubmit={this.handleSubmit}>
          {isSignup &&
            <div>
              <label htmlFor="email">Email</label>
              <input 
                type="text" 
                name="email" 
                id="email" 
                value={this.state.email}
                onChange={this.handleInput('email')}
                />
            </div>
          }
          <label htmlFor="username">Username</label>
          <input 
            type="text" 
            name="username" 
            id="username" 
            value={this.state.username}
            onChange={this.handleInput('username')}
            />
          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            name="password" 
            id="password" 
            value={this.state.password}
            onChange={this.handleInput('password')}
            />
          {isSignup &&
            <div>
              <label htmlFor="balance">Starting balance</label>
              <input 
                type="balance" 
                name="balance" 
                id="balance" 
                value={this.state.balance}
                onChange={this.handleInput('balance')}
                />
            </div>
          }
          <input type="submit" value={this.props.formType === 'login' ? 'Login' : 'Signup'} />
        </form>
      </div>
    );
  }

  Errors() {
    const { errors } = this.props

    return (
      <ul>
        {errors.map(error => <li key={error}>Error: {error}</li>)}
      </ul>
    );
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state);
    this.props.processForm(user);
  }

  handleInput(field) {
    return e => {
      this.setState({[field]: e.target.value});
    }
  }

}