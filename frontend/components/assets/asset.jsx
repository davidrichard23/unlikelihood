import React, { Component } from 'react';
import ReactDOM from "react-dom";
import Nav from '../dashboard/nav_bar';
import AssetChart from '../shared/asset_chart';
import OrderForm from './order_form';

const GREEN = 'rgb(33, 206, 153)';
const RED = 'rgb(255, 99, 64)';


export default class Asset extends Component {

  componentDidMount() {
    this.props.fetchAsset(this.props.match.params.assetId)
    .then(() => {
      
    });
  }

  

  render() {
    const { currentUser, asset, chartData, fetchChartData } = this.props;

    if (!asset) return null;

    const isWatching = currentUser.watchedAssetIds.includes(asset.id);
    const watchListText = isWatching ? 'Remove from Watchlist' : 'Add to Watchlist';
    const watchListAction = isWatching ? this.props.removeAssetFromWatchlist : this.props.addAssetToWatchlist;

    const data = chartData[asset.ticker.toUpperCase()];
    // const keys = Object.keys(data || {});
    // console.log(keys)
    // const price = data[keys[keys.length - 1]].close;
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
                fetchChartData={fetchChartData} 
                color={color}
              />
              {this.About()}
            </div>
            <div className="sidebar">
              <OrderForm asset={asset} price={data ? data.close : 0} currentUser={currentUser} />
              <button className="btn outline-btn" onClick={() => watchListAction(asset.id)}>{watchListText}</button>
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


}
