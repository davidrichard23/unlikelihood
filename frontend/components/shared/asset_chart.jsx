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

const CHART_WIDTH = 676;
const GREEN = 'rgb(33, 206, 153)';
const RED = 'rgb(255, 99, 64)';


export default class AssetChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isShowingTooltip: false,
      tooltipLeft: 30,
      currentDataIndex: 0,
      color: GREEN,
    };

    this.handleMouseHover = this.handleMouseHover.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  componentDidMount() {
    const node = ReactDOM.findDOMNode(this);
    this.chart = node.querySelector('#chart');
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
    const { chartData, chartHigh, chartLow, range } = this.props;
    
    return (
      <div className="asset-chart-container">
        {this.Header()}

        <div className='asset-chart' onMouseLeave={this.handleMouseLeave}>
          {this.Tooltip()}
          <div id="chart">
            <AssetLineChart 
              chartData={chartData} 
              chartHigh={chartHigh} 
              chartLow={chartLow} 
              handleMouseHover={this.handleMouseHover} 
              color={this.state.color}
              range={range}
              />
          </div>
        </div>
      </div>
    );
  }
  
  
  Header() {
    const { asset, chartData } = this.props;
    const chartValues = Object.values(chartData);
    
    let startPrice = chartValues[0] || 0;
    let currentPrice = chartValues[this.state.currentDataIndex] || 0;
    let priceDiff = Math.abs(currentPrice - startPrice).toFixed(2);
    
    if (currentPrice < startPrice) {
      priceDiff = '-$' + priceDiff;
      priceDiff += ` (-${((startPrice - currentPrice) / startPrice * 100).toFixed(2)}%)`;
    }
    else {
      priceDiff = '+$' + priceDiff;
      priceDiff += ` (${((currentPrice - startPrice) / startPrice * 100).toFixed(2)}%)`;
    }
    
    if (!this.state.isShowingTooltip) 
      priceDiff = <p>{priceDiff} <span style={{ color: 'rgba(0,0,0,0.2)' }}> Today</span></p>;
    else
      priceDiff = <p>{priceDiff}</p>;
    
    return (
      <div>
        <h1>{asset.name}</h1>
        <h2>${currentPrice.toFixed(2)}</h2>
        {priceDiff}
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
    if (!el[0]) return;

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
    
    let pointCount = this.findRangePointCount(this.props.range)
    const adjustedWidth = CHART_WIDTH / pointCount * Object.keys(this.props.chartData).length;

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
          borderColor: this.props.color,
          pointHoverRadius: 6,
          pointHoverBackgroundColor: this.props.color,
          pointBorderColor: 'rgb(255,255,255)',
          pointHoverBorderColor: 'rgb(255,255,255)',
        }}
        library={{
          onHover: this.props.handleMouseHover
        }}
      />
    );
  }


  findRangePointCount(range) {
    switch (range) {
      case '1D':
        return 78;
      case '1M':
        return 21;
      case '3M':
        return 62;
      case '1Y':
        return 252;
      case '5Y':
        return 1258;
    }
  }
}