import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Search from './search';
import AccountDropdown from './account_dropdown';
import LogoIcon from '../../img/logo_icon';

export default class NavBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdownOpen: false,
    };

    this.toggleDropdown = this.toggleDropdown.bind(this);
  }
  
  render() {
    const { dropdownOpen } = this.state;

    return (
      <div className='nav'>
        <LogoIcon />
        <div className="inner">
          <div className="left">
            <Search />
          </div>
          <div className="right">
            <Link className='btn' to='/'>Home</Link>
            <button className='btn' onClick={this.toggleDropdown}>Account</button>
            {dropdownOpen && <AccountDropdown isOpen={dropdownOpen} />}
          </div>
        </div>
      </div>
    );
  }

  toggleDropdown() {
    this.setState({dropdownOpen: !this.state.dropdownOpen});
  }
};