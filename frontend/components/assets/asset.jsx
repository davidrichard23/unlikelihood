import React, { Component } from 'react';
import ReactDOM from "react-dom";
import Nav from '../dashboard/nav_bar';
import AssetChart from '../shared/asset_chart';
import OrderForm from './order_form';

const GREEN = 'rgb(33, 206, 153)';
const RED = 'rgb(255, 99, 64)';


export default class Asset extends Component {

  constructor(props) {
    super(props);

    this.onChartRangeChange = this.onChartRangeChange.bind(this);
  }

  componentDidMount() {
    this.props.fetchAsset(this.props.match.params.assetId)
    .then(() => this.props.fetchChartData(this.props.asset.ticker, '1D'));

    this.props.fetchPortfolioActions();
  }

  
  render() {
    const { currentUser, asset, chartData, fetchChartData, ownedShares } = this.props;

    if (!asset) return null;

    const isWatching = currentUser.watchedAssetIds.includes(asset.id);
    const watchListText = isWatching ? 'Remove from Watchlist' : 'Add to Watchlist';
    const watchListAction = isWatching ? this.props.removeAssetFromWatchlist : this.props.addAssetToWatchlist;

    const data = chartData[asset.ticker];
    const color = data && data.open > data.close ? RED : GREEN;

    return (
      <div className='asset-page'>
        <Nav />
        <div className="wrapper">
          <div className="inner">
            <div className="main-content">
              <AssetChart 
                asset={asset} 
                chartData={data} 
                onRangeChange={this.onChartRangeChange} 
                color={color}
              />
              {this.About()}
            </div>
            <div className="sidebar">
              <OrderForm 
                asset={asset} 
                price={data ? data['1D'].close : 0} 
                ownedShares={ownedShares}
                currentUser={currentUser} 
                createPortfolioAction={this.props.createPortfolioAction}
              />
              <button className="btn outline-btn watchlist-btn" onClick={() => watchListAction(asset.id)}>{watchListText}</button>
            </div>
          </div>
        </div>

      </div>
    );
  }

  About() {

    return (
      <div className="about-container">
        <div className="heading">
          <h2>About</h2>
        </div>
        <p>{this.props.asset.description}</p>
      </div>
    );
  }


  onChartRangeChange(newRange) {
    this.props.fetchChartData(this.props.asset.ticker, newRange);
  }
}
