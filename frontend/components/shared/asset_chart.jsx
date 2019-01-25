import React, { Component } from 'react';
import ReactDOM from "react-dom";

import ReactChartkick, { LineChart } from 'react-chartkick'
import Chart from 'chart.js';

Chart.defaults.scale.gridLines.display = false;
Chart.defaults.scale.gridLines.drawBorder = false;
Chart.defaults.scale.ticks.display = false;
Chart.defaults.global.hover.intersect = false;
Chart.defaults.global.tooltips.enabled = false;
ReactChartkick.addAdapter(Chart);


export default class AssetChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isShowingTooltip: false,
      tooltipLeft: 30,
      currentDataIndex: 0,
    };

    this.handleMouseHover = this.handleMouseHover.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  componentDidMount() {
    const node = ReactDOM.findDOMNode(this);
    this.chart = node.querySelector('#chart-1');
    this.forceUpdate();
  }

  componentDidUpdate(prevProps) {
    const prevChartData = Object.keys(prevProps.chartData);
    const chartData = Object.keys(this.props.chartData);
    if (prevChartData.length !== chartData.length) {
      this.setState({currentDataIndex: chartData.length - 1});
    }
  }

  render() {
    const { asset, chartData, chartHigh, chartLow } = this.props;
    const chartValues = Object.values(chartData);

    let startPrice = chartValues[0] || 0;
    let currentPrice = chartValues[this.state.currentDataIndex] || 0;
    let priceDiff = Math.abs(currentPrice - startPrice).toFixed(2);
    let percentDiff

    if (currentPrice < startPrice) {
      priceDiff = '-$' + priceDiff;
      priceDiff += ` (-${((startPrice - currentPrice) / startPrice * 100).toFixed(2)}%)`;
    }
    else {
      priceDiff = '+$' + priceDiff;
      priceDiff += ` (${((currentPrice - startPrice) / startPrice * 100).toFixed(2)}%)`;
    }

    if (!this.state.isShowingTooltip) priceDiff += ' Today';

    return (
      <div className="asset-chart-container">
        <h1>{asset.name}</h1>
        <h2>${currentPrice.toFixed(2)}</h2>
        <p>{priceDiff}</p>

        <div className='asset-chart' onMouseLeave={this.handleMouseLeave}>
          {this.Tooltip()}
          <AssetLineChart chartData={chartData} chartHigh={chartHigh} chartLow={chartLow} handleMouseHover={this.handleMouseHover} />
        </div>
      </div>
    );
  }

  Tooltip() {
    if (!this.chart || !this.state.isShowingTooltip) return null

    const { top, bottom, left, right, width, height } = this.chart.getBoundingClientRect();
    const label = Object.keys(this.props.chartData)[this.state.currentDataIndex] + ' ET';

    return (
      <div>
        <p style={{
          position: 'absolute',
          top: top - 20,
          left: left + this.state.tooltipLeft - 37.5,
          color: 'rgb(200,200,200)',
          fontSize: 13,
          zIndex: -1,
        }}>{label}</p>
        <div style={{
          position: 'absolute',
          top,
          left: left + this.state.tooltipLeft,
          height,
          width: 1,
          backgroundColor: 'rgb(200,200,200)',
          zIndex: -1,
        }}></div>
      </div>
    );
  }

  
  handleMouseHover(e, el) {
    this.setState({
      currentDataIndex: el[0]._index,
      tooltipLeft: el[0]._model.x,
      isShowingTooltip: true,
    })
  }

  handleMouseLeave() {

    this.setState({ 
      isShowingTooltip: false,
      currentDataIndex: Object.keys(this.props.chartData).length - 1 
    });
  }
}



class AssetLineChart extends Component {

  shouldComponentUpdate(nextProps) {
    if (this.props.chartData !== nextProps.chartData) return true;
    return false;
  }

  render() {
    const fullWidth = 676;
    const adjustedWidth = fullWidth / 40 * Object.keys(this.props.chartData).length;

    return (
      <LineChart
        width={adjustedWidth}
        height={196}
        data={this.props.chartData}
        min={this.props.chartLow}
        max={this.props.chartHigh + this.props.chartHigh * 0.002}
        curve={false}
        dataset={{
          pointRadius: 0,
          borderColor: 'rgb(33, 206, 153)',
          pointHoverRadius: 6,
          pointHoverBackgroundColor: 'rgb(33, 206, 153)',
          pointBorderColor: 'rgb(255,255,255)',
          pointHoverBorderColor: 'rgb(255,255,255)',
        }}
        library={{

          onHover: this.props.handleMouseHover

        }}
      />
    );
  }
}