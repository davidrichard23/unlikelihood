import React, { Component } from 'react'

export default class OrderForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isBuying: true,
      isReviewing: false,
      shares: '',
    };

    this.handleInput = this.handleInput.bind(this);
  } 

  render() {
    const { asset, price, currentUser } = this.props;
    const { isBuying, shares } = this.state;

    const balance = currentUser.balance;

    return (
      <div className="order-form">
        <div className="heading">
          <button className={'btn' + (isBuying ? ' selected green' : '')} onClick={() => this.setState({isBuying: true})}>
            Buy {asset.ticker}
          </button>
          <button className={'btn' + (!isBuying ? ' selected green' : '')} onClick={() => this.setState({isBuying: false})}>
            Sell {asset.ticker}
          </button>
        </div>
        <div className="row">
          <label>Shares</label>
          <input type="text" id="" placeholder='0' value={shares} onChange={this.handleInput} />
        </div>
        <div className="row grey-border-bottom">
          <p className='green-text'>Market Price</p>
          <p>{price.toFixed(2)}</p>
        </div>
        <div className="row">
          <p>Estimated {isBuying ? 'Cost' : 'Credit'}</p>
          <p>${(price * shares).toFixed(2)}</p>
        </div>
        <div className="review-button-container grey-border-bottom">
          <button className='btn rect-btn'>Review Order</button>
        </div>
        <div className="row" style={{justifyContent: 'center'}}>
          <p style={{fontWeight: 400}}>
            {isBuying ? 
              `$${balance.toFixed(2)} Buying Power Available`
              : 
              `$${shares} Shares Available` // update to use the current user's owned share count
            }
          </p>
        </div>
      </div>
    );
  }

  handleInput(e) {
    const val = e.target.value;
    if (isNaN(val)) return;

    this.setState({shares: val});
  }
}