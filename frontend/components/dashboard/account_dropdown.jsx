import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../../actions/user_actions';

const AccountDropdown = props => {
  if (!props.isOpen) return null;
  
  return (
    <div className="account-dropdown">
      <button className='btn' onClick={props.logout}>Logout</button>
    </div>
  );
};



const mdp = dispatch => ({
  logout: () => dispatch(logout())
})

export default connect(null, mdp)(AccountDropdown)