import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class SignupForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      first_name: "",
      last_name: "",
      password: "",
      email: "",
      balance: 1000,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.removeErrors();
  }

  render() {

    return (
      <div className='signup-page'>
        <div className="wrapper">
          <h1>Make your money move</h1>
          <h2>Robinhood lets you invest in companies you love, commission-free.</h2>
          {this.Errors()}

          <form onSubmit={this.handleSubmit}>
            <div className="row">
              <input
                type="text"
                name="first_name"
                id="first_name"
                value={this.state.first_name}
                placeholder='First Name'
                onChange={this.handleInput('first_name')}
                style={{marginRight: 20}}
                />
              <input
                type="text"
                name="last_name"
                id="last_name"
                value={this.state.last_name}
                placeholder='Last Name'
                onChange={this.handleInput('last_name')}
                />
            </div>
            <br/>
            <input
              type="text"
              name="email"
              id="email"
              value={this.state.email}
              placeholder='Email'
              onChange={this.handleInput('email')}
              />
            <br/>
            <input
              type="password"
              name="password"
              id="password"
              value={this.state.password}
              placeholder='Password'
              onChange={this.handleInput('password')}
              />
            <br/>
            <input
              type="text"
              name="balance"
              id="balance"
              value={this.state.balance}
              placeholder='Starting account balance'
              onChange={this.handleInput('balance')}
              />

            <input className='btn rect-btn' type="submit" value={this.props.formType === 'login' ? 'Login' : 'Signup'} />

            <p>Already have an account? <Link className='link' to='/login'>Log In</Link></p>

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
      this.setState({ [field]: e.target.value });
    }
  }
}