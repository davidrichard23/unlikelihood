import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
  return (
    <div className='nav'>
      <div className="inner">
        <div className="left">
          <Link className='btn' to='/'>Unlikelihood</Link>
          <Link className='btn' to='/'>Investing</Link>
        </div>
        <div className="right">
          <Link className='btn' to='/login'>Login</Link>
          <Link className='btn round-btn' to='/signup'>Signup</Link>
        </div>
      </div>
    </div>
  );
};