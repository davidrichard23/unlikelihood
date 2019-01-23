import React from 'react';
import { Link } from 'react-router-dom';

export default props => {
  return (
    <div>
      <h2>Welcome</h2>

      <Link to='/login'>Login</Link>
      <Link to='/signup'>Signup</Link>
    </div>
  );
};