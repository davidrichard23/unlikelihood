import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logout } from '../../actions/user_actions';

class AccountDropdown extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClick);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick);
  }

  handleClick(e) {
    if (this.view.contains(e.target)) return;
    
    this.props.close();
  }

  render() {
    const { isOpen, currentUser, portfolioValue, logout } = this.props;

    if (!isOpen) return null;
    
    return (
      <div ref={view => this.view = view} className="account-dropdown">
        <header className='grey-border-bottom'>
          <h3>{currentUser.firstName} {currentUser.lastName}</h3>
          <div className="row">
            <div>
              <h3>${portfolioValue.toFixed(2)}</h3>
              <p>Portfolio Value</p>
            </div>
            <div>
              <h3>${currentUser.balance.toFixed(2)}</h3>
              <p>Buying Power</p>
            </div>
          </div>
        </header>
        <button className='btn' onClick={logout}><svg width="28" height="28" viewBox="0 0 28 28" style={{marginRight: 12}}><g fillRule="evenodd" transform="translate(2 2)"><path d="M20.1818182,3 L3.81818182,3 C2.81818182,3 2,3.9 2,5 L2,8.99 L3.81818182,8.99 L3.81818182,4.98 L20.1818182,4.98 L20.1818182,19.01 L3.81818182,19.01 L3.81818182,14.99 L2,14.99 L2,19 C2,20.1 2.81818182,20.98 3.81818182,20.98 L20.1818182,20.98 C21.1818182,20.98 22,20.1 22,19 L22,5 C22,3.89 21.1818182,3 20.1818182,3 L20.1818182,3 Z M12,15.99 L16,11.99 L12,7.99 L12,10.99 L2,10.99 L2,12.99 L12,12.99 L12,15.99 L12,15.99 Z"></path></g></svg>Logout</button>
      </div>
    );
  }
}



const msp = state => {
  const portfolioValue = state.entities.portfolioChartData['1D'] ? state.entities.portfolioChartData['1D'].close : 0

  return {
    currentUser: state.entities.user,
    portfolioValue,
  }
}
const mdp = dispatch => ({
  logout: () => dispatch(logout())
})

export default connect(msp, mdp)(AccountDropdown)