import React, { Component } from 'react';
import Nav from './nav_bar';
import AssetChart from '../shared/asset_chart';
import MiniAssetChart from '../shared/mini_asset_chart';
import { Link } from 'react-router-dom';

const GREEN = 'rgb(33, 206, 153)';
const RED = 'rgb(255, 99, 64)';


export default class Dashboard extends Component {

  constructor(props) {
    super(props);

    this.WatchedItem = this.WatchedItem.bind(this);
    this.handleTimeRangeChange = this.handleTimeRangeChange.bind(this);
  }

  componentDidMount() {
    this.props.fetchPortfolioActions()
    .then(() => {
      return this.props.fetchAssets([...this.props.ownedAssetIds, ...this.props.currentUser.watchedAssetIds]);
    })
    .then(() => {
      const watchedAssetTickers = this.props.watchedAssets.map(asset => asset.ticker);
      const ownedAssetTickers = this.props.ownedAssets.map(asset => asset.ticker);
      return this.props.fetchMultipleChartData([...watchedAssetTickers, ...ownedAssetTickers], '1D');
    })
    .then(() => {
      this.props.fetchPortfolioChartData('1D');
    });
  }

  render() {
    const { currentUser, portfolioChartData } = this.props;

    return (
      <div className='dashboard-page'>
        <Nav />
        <div className="wrapper">
          <div className="inner">
            <div className="main-content">
              <AssetChart
                asset={{name: `${currentUser.firstName} ${currentUser.lastName}'s Portfolio`}}
                chartData={portfolioChartData}
                color={GREEN}
                onRangeChange={this.handleTimeRangeChange}
              />
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

    const { ownedAssets, watchedAssets } = this.props

    return (
      <div className='watchlist'>
        <div className="watchlist-heading">
          <h2>Stocks</h2>
        </div>
        {ownedAssets.map(this.WatchedItem)}
        <div className="watchlist-heading">
          <h2>Watchlist</h2>
        </div>
        {watchedAssets.map(this.WatchedItem)}
      </div>
    );
  }

  WatchedItem(asset) {
    const ticker = asset.ticker.toUpperCase();
    
    if (!this.props.chartData[ticker]) return null;

    const chartData = this.props.chartData[ticker]['1D'];

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

  handleTimeRangeChange(newRange) {
    const ownedAssetTickers = this.props.ownedAssets.map(asset => asset.ticker);
    this.props.fetchMultipleChartData(ownedAssetTickers, newRange)
    .then(() => {
      this.props.fetchPortfolioChartData(newRange);
    });
  }
}