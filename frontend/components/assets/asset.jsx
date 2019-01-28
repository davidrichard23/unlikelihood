import React, { Component } from 'react';
import ReactDOM from "react-dom";
import Nav from '../dashboard/nav_bar';
import AssetChart from '../shared/asset_chart';

const GREEN = 'rgb(33, 206, 153)';
const RED = 'rgb(255, 99, 64)';


export default class Asset extends Component {

  componentDidMount() {
    this.props.fetchAsset(this.props.match.params.assetId)
    .then(() => {
      
    });
  }

  

  render() {
    const { user, asset, chartData, fetchChartData } = this.props;

    if (!asset) return null;

    const isWatching = user.watchedAssetIds.includes(asset.id);
    const watchListText = isWatching ? 'Remove from Watchlist' : 'Add to Watchlist';
    const watchListAction = isWatching ? this.props.removeAssetFromWatchlist : this.props.addAssetToWatchlist;

    const data = chartData[asset.ticker.toUpperCase()];
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
