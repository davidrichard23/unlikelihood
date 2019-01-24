import React from 'react';
import { Link } from 'react-router-dom';
import LogoIcon from '../../img/logo_icon';

export default () => {
  return (
    <div className='nav'>
      <div className="inner">
        <div className="left">
          <LogoIcon />
          <Link className='btn thin' to='/'>Unlikelihood</Link>
          <Link className='btn' to='/'>Investing</Link>
          <Link className='btn' to='/'>
            Cash Management 
            <div className='highlight'>Coming Soon</div>
          </Link>
        </div>
        <div className="right">
          <Link className='btn' to='/login'>Log In</Link>
          <Link className='btn round-btn' to='/signup'>Sign Up</Link>
        </div>
      </div>
    </div>
  );
};