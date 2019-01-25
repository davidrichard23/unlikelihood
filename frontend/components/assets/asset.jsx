import React, { Component } from 'react';
import ReactDOM from "react-dom";
import Nav from '../dashboard/nav_bar';
import AssetChart from '../shared/asset_chart';



export default class Dashboard extends Component {

  

  componentDidMount() {
    this.props.fetchAsset(this.props.match.params.assetId)
    .then(() => {
      this.props.fetchChartData(this.props.asset.ticker);
    });

  }

  render() {
    const { asset, chartData, chartHigh, chartLow } = this.props;

    if (!asset || !chartData) return null;

    return (
      <div className='asset-page'>
        <Nav />
        <div className="wrapper">
          <div className="inner">
            <AssetChart asset={asset} chartData={chartData} chartHigh={chartHigh} chartLow={chartLow} />
          </div>
        </div>

      </div>
    );
  }

}
