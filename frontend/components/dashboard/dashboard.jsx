import React, { Component } from 'react';
import Nav from './nav_bar';
import AssetChart from '../shared/asset_chart';
import MiniAssetChart from '../shared/mini_asset_chart';
import News from '../shared/news';
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
    const watchedAssetSymbols = this.props.watchedAssets.map(asset => asset.symbol);
    const ownedAssetSymbols = this.props.ownedAssets.map(asset => asset.symbol);
    if (watchedAssetSymbols.length > 0 || ownedAssetSymbols.length > 0) {
      this.fetchData();
    }

    this.props.fetchAllNews();
  }
  
  componentDidUpdate(prevProps) {
    if (prevProps.watchedAssets.length !== this.props.watchedAssets.length || prevProps.ownedAssets.length !== this.props.ownedAssets.length)
      this.fetchData();
  }

  fetchData() {
    const ownedAssetSymbols = this.props.ownedAssets.map(asset => asset.symbol);
    const watchedAssetSymbols = this.props.watchedAssets.map(asset => asset.symbol);

    if (watchedAssetSymbols.length > 0)
      this.props.fetchMultipleChartData(watchedAssetSymbols, '1D');
    if (ownedAssetSymbols.length > 0)
      this.props.fetchMultipleChartData(ownedAssetSymbols, '1D')
        .then(() => this.props.fetchPortfolioChartData('1D'));
  }

  render() {
    const { currentUser, portfolioChartData, articles } = this.props;

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

              <News articles={articles} />
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
    const symbol = asset.symbol.toUpperCase();
    
    if (!this.props.chartData[symbol]) return null;

    const chartData = this.props.chartData[symbol]['1D'];

    const keys = Object.keys(chartData.data);
    const currentprice = chartData.data[keys[keys.length - 1]];
    const color = chartData.open > chartData.close ? RED : GREEN;

    return (
      <Link to={`assets/${asset.symbol}`} key={symbol} className='watchlist-item'>
        <h3>{symbol}</h3>
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
    const ownedAssetSymbols = this.props.ownedAssets.map(asset => asset.symbol);
    if (ownedAssetSymbols.length === 0) return

    this.props.fetchMultipleChartData(ownedAssetSymbols, newRange)
    .then(() => {
      this.props.fetchPortfolioChartData(newRange);
    });
  }
}