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
    const symbol = this.props.match.params.assetSymbol;
    this.props.fetchAssetInfo(symbol);
    this.props.fetchChartData(symbol, '1D');
  }

  componentDidUpdate(prevProps) {
    const symbol = this.props.match.params.assetSymbol;
    if (prevProps.match.params.assetSymbol !== symbol) {
      this.props.fetchAssetInfo(symbol);
      this.props.fetchChartData(symbol, '1D');
    }
  }

  
  render() {

    const { currentUser, asset, chartData, ownedShares } = this.props;

    if (!asset) return null;

    const isWatching = currentUser.watchedAssetSymbols.includes(asset.symbol);
    const watchListText = isWatching ? 'Remove from Watchlist' : 'Add to Watchlist';
    const watchListAction = isWatching ? this.props.removeAssetFromWatchlist : this.props.addAssetToWatchlist;

    const color = chartData && chartData.open > chartData.close ? RED : GREEN;

    return (
      <div className='asset-page'>
        <Nav />
        <div className="wrapper">
          <div className="inner">
            <div className="main-content">
              <AssetChart 
                asset={asset} 
                chartData={chartData} 
                onRangeChange={this.onChartRangeChange} 
                color={color}
              />
              {this.About()}
            </div>
            <div className="sidebar">
              <OrderForm 
                asset={asset} 
                price={chartData ? chartData['1D'].close : 0} 
                ownedShares={ownedShares}
                currentUser={currentUser} 
                createPortfolioAction={this.props.createPortfolioAction}
              />
              <button className="btn outline-btn watchlist-btn" onClick={() => watchListAction(asset.symbol)}>{watchListText}</button>
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
    this.props.fetchChartData(this.props.asset.symbol, newRange);
  }
}
