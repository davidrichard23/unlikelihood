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
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleReview = this.toggleReview.bind(this);
  } 

  render() {
    const { asset, price, currentUser, ownedShares } = this.props;
    const { isReviewing, isBuying, shares } = this.state;

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
          <input type="text" id="" placeholder='0' value={shares} onChange={this.handleInput} disabled={isReviewing} />
        </div>
        <div className="row grey-border-bottom">
          <p className='green-text'>Market Price</p>
          <p>{price.toFixed(2)}</p>
        </div>
        <div className="row grey-border-bottom">
          <p>Estimated {isBuying ? 'Cost' : 'Credit'}</p>
          <p>${(price * shares).toFixed(2)}</p>
        </div>

        {isReviewing && this.Review()}
        
        <div className="review-button-container grey-border-bottom">
          {!this.state.error &&
            <button className='btn rect-btn' onClick={isReviewing ? this.handleSubmit : this.toggleReview}>
              {isReviewing ? 'Submit' : 'Review Order'}
            </button>
          }
          {isReviewing && <button className='btn outline-btn' onClick={this.toggleReview}>Edit</button>}
        </div>
        <div className="row" style={{justifyContent: 'center'}}>
          <p style={{fontWeight: 400}}>
            {isBuying ? 
              `$${balance.toFixed(2)} Buying Power Available`
              : 
              `${ownedShares} Shares Available`
            }
          </p>
        </div>

      </div>
    );
  }

  Review() {
    const { shares, error } = this.state;
    let text = ``;
    
    if (error) text = error;
    else if (this.state.isBuying) 
      text = `You are placing a market order for ${shares} ${shares > 1 ? 'shares' : 'share'} of ${this.props.asset.ticker}. Your order will be executed at the best available price.`;
    else
      text = `You are placing a good for day market order to sell ${shares} ${shares > 1 ? 'shares' : 'share'} of ${this.props.asset.ticker}. Your order will be executed at the best available price.`;

    return (
      <div className='review-text'>
        <p>{text}</p>
      </div>
    );
  }

  toggleReview() {
    const { isReviewing } = this.state
    this.setState({isReviewing: !isReviewing, error: !isReviewing ? this.getError() : null});
  }

  getError() {
    const { ownedShares, currentUser, price, asset } = this.props
    const { shares, isBuying } = this.state
    let error = null;
    if (shares === '' || shares === 0) 
      error = 'Please enter a valid number of shares';
    else if (isBuying && shares * price > currentUser.balance) 
      error = `You don’t have enough buying power to buy 1 share of CHK. Please deposit $${Math.abs(currentUser.balance - shares * price)} to purchase 1 share at market price.`;
    else if (!isBuying && shares > ownedShares) 
      error = `Not enough shares. You can only sell ${ownedShares} ${ownedShares > 1 ? 'shares' : 'share'} of ${asset.ticker}.`;

    return error
  }

  handleSubmit() {
    this.props.createPortfolioAction({
      shares: Number(this.state.shares),
      asset_id: this.props.asset.id,
      action: this.state.isBuying ? 'buy' : 'sell',
      price: this.props.price,
    })
    .then(() => {
      this.setState({
        shares: '',
        isReviewing: false,
      })
    })
  }

  handleInput(e) {
    const val = e.target.value;
    if (isNaN(val)) return;

    this.setState({shares: val});
  }
}