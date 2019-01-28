import React, { Component } from 'react';
import Nav from './nav_bar';
import MiniAssetChart from '../shared/mini_asset_chat';
import { Link } from 'react-router-dom';

const GREEN = 'rgb(33, 206, 153)';
const RED = 'rgb(255, 99, 64)';


export default class Dashboard extends Component {

  constructor(props) {
    super(props);

    this.WatchedItem = this.WatchedItem.bind(this);
  }

  componentDidMount() {
    this.props.fetchPortfolioActions();
    this.props.fetchAssets(this.props.currentUser.watchedAssetIds)
    .then(() => {
      const tickers = this.props.watchedAssets.map(asset => asset.ticker);
      this.props.fetchMultipleChartData(tickers, '1D');
    });
  }

  render() {
    const { currentUser } = this.props;

    return (
      <div className='dashboard-page'>
        <Nav />
        <div className="wrapper">
          <div className="inner">
            <div className="main-content">
              {/* <AssetChart
                asset={asset}
                chartData={chartData}
                chartHigh={chartHigh}
                chartLow={chartLow}
                range={selectedTimeRange}
              /> */}
            </div>
            <div className="sidebar">
              {this.Watchlist()}
            </div>
          </div>
        </div>
      </div>
    );
  }

  Watchlist() {

    const { watchedAssets } = this.props

    return (
      <div className='watchlist'>
        <div className="watchlist-heading">
          <h2>Watchlist</h2>
        </div>
        {watchedAssets.map(this.WatchedItem)}
      </div>
    );
  }

  WatchedItem(asset) {
    const ticker = asset.ticker.toUpperCase();
    const chartData = this.props.chartData[ticker];
    
    if (!chartData) return null;

    const keys = Object.keys(chartData.data);
    const currentprice = chartData.data[keys[keys.length - 1]];
    const color = chartData.open > chartData.close ? RED : GREEN;

    return (
      <Link to={`assets/${asset.id}`} key={ticker} className='watchlist-item'>
        <h3>{ticker}</h3>
        <div style={{width: 60}}>
          <MiniAssetChart 
            chartData={chartData} 
            color={color}
          />
        </div>
        <p>{currentprice.toFixed(2)}</p>
      </Link>
    );
  }
}