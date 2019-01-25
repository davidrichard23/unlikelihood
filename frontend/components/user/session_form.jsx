import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class SessionForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      balance: 1000,
    };
    
    this.handleSubmit = this.handleSubmit.bind(this);
    this.loginWithDemo = this.loginWithDemo.bind(this);
  }
  
  render() {

    return (
      <div className='login-page'>
        <div className='login-side-image' />

        <div className="login-main-content">
          <h1>Welcome to Unlikelihood</h1>
          {this.Errors()}

          <form onSubmit={this.handleSubmit}>
            <label htmlFor="email">Email</label>
            <input 
              type="text" 
              name="email" 
              id="email" 
              value={this.state.email}
              onChange={this.handleInput('email')}
            />
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              name="password" 
              id="password" 
              value={this.state.password}
              onChange={this.handleInput('password')}
            />

            <div className='row'>
              <div>
                <input className='btn rect-btn' type="submit" value={this.props.formType === 'login' ? 'Login' : 'Signup'} />
              </div>
              <button className='btn rect-btn' onClick={this.loginWithDemo}>Demo Account</button>
            </div>

            <p style={{marginTop: 30}}>Dont have an account? <Link className='link' to='/signup'>Sign Up</Link></p>
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
    this.setState({email: 'demo', password: '111111'}, () => {
      this.handleSubmit(e);
    });
  }

}