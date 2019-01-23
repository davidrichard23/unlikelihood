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
    this.loginWithDemo = this.loginWithDemo.bind(this);
  }
  
  render() {
    const isSignup = this.props.formType === 'signup';

    return (
      <div className='login-page'>
        <div className='login-side-image'>

        </div>
        <div className="login-main-content">
          <h1>Welcome to Robinhood</h1>
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
                  type="text" 
                  name="balance" 
                  id="balance" 
                  value={this.state.balance}
                  onChange={this.handleInput('balance')}
                  />
              </div>
            }

            <div className='row'>
              <div>
                <input className='rect-btn' type="submit" value={this.props.formType === 'login' ? 'Login' : 'Signup'} />
              </div>
              {!isSignup && 
                <button className='rect-btn' onClick={this.loginWithDemo}>Demo Account</button>
              }
            </div>

            
          </form>
        </div>
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

  loginWithDemo(e) {
    this.setState({username: 'demo', password: '111111'}, () => {
      this.handleSubmit(e);
    });
  }

}