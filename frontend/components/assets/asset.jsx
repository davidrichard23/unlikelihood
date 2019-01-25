import React, { Component } from 'react';
import ReactDOM from "react-dom";
import Nav from '../dashboard/nav_bar';
import AssetChart from '../shared/asset_chart';




export default class Dashboard extends Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedTimeRange: '1D',  
    };
  }

  componentDidMount() {
    this.props.fetchAsset(this.props.match.params.assetId)
    .then(() => {
      this.props.fetchChartData(this.props.asset.ticker, this.state.selectedTimeRange);
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.asset && prevProps.asset.id !== this.props.asset.id) {
      this.props.fetchChartData(this.props.asset.ticker, this.state.selectedTimeRange);
    }
  }

  render() {
    const { asset, chartData, chartHigh, chartLow, selectedTimeRange } = this.props;

    if (!asset || !chartData) return null;

    return (
      <div className='asset-page'>
        <Nav />
        <div className="wrapper">
          <div className="inner">
            <div className="left">
              <AssetChart 
                asset={asset} 
                chartData={chartData} 
                chartHigh={chartHigh} 
                chartLow={chartLow} 
                range={selectedTimeRange}
              />
              {this.TimeRange()}
              {this.About()}
            </div>
          </div>
        </div>

      </div>
    );
  }


  TimeRange() {
    const { selectedTimeRange } = this.state;

    return (
      <div className='time-range-container'>
        <button className={'btn' + (selectedTimeRange === '1D' ? ' selected' : '')} style={{marginLeft: 0}} onClick={this.changeTimeRange('1D')}>1D</button>
        <button className={'btn' + (selectedTimeRange === '1M' ? ' selected' : '')} onClick={this.changeTimeRange('1M')}>1M</button>
        <button className={'btn' + (selectedTimeRange === '3M' ? ' selected' : '')} onClick={this.changeTimeRange('3M')}>3M</button>
        <button className={'btn' + (selectedTimeRange === '1Y' ? ' selected' : '')} onClick={this.changeTimeRange('1Y')}>1Y</button>
        <button className={'btn' + (selectedTimeRange === '5Y' ? ' selected' : '')} onClick={this.changeTimeRange('5Y')}>5Y</button>
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


  changeTimeRange(range) {
    return () => {
      this.setState({selectedTimeRange: range});
      this.props.fetchChartData(this.props.asset.ticker, range);
    }
  }

}
