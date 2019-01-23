import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Search from './search';
import AccountDropdown from './account_dropdown';

export default class NavBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdownOpen: true,
    };
  }
  
  render() {
    const { dropdownOpen } = this.state;

    return (
      <div className='nav'>
        <div className="inner">
          <div className="left">
            <Search />
          </div>
          <div className="right">
            <Link className='btn' to='/'>Home</Link>
            <Link className='btn' to='/'>Account</Link>
            {dropdownOpen && <AccountDropdown />}
          </div>
        </div>
      </div>
    );
  }
};