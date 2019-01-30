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
      selectedTimeRange: '1D',
    };

    this.handleMouseHover = this.handleMouseHover.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  componentDidMount() {
    // this.props.fetchChartData(this.props.asset.ticker, this.state.selectedTimeRange);

    const node = ReactDOM.findDOMNode(this);
    this.chart = node.querySelector('#chart');
    this.forceUpdate();
  }
  
  componentDidUpdate(prevProps) {
    
    // if (prevProps.asset.ticker !== this.props.asset.ticker) {
      // this.props.fetchChartData(this.props.asset.ticker, this.state.selectedTimeRange);
    // }

    if (prevProps.chartData && this.props.chartData && this.props.chartData[this.state.selectedTimeRange] && prevProps.chartData[this.state.selectedTimeRange] !== this.props.chartData[this.state.selectedTimeRange]) {
      this.setState({currentDataIndex: Object.keys(this.props.chartData[this.state.selectedTimeRange].data).length - 1});
    }
  }
  
  render() {
    return (
      <div className="asset-chart-container">
        {this.Chart()}
      </div>
    );
  }
  
  Chart() {
    const { chartData, color } = this.props;

    return (
      <div>
        { this.Header() }

        <div className='asset-chart'>
          { this.Tooltip() }
          <div id="chart" onMouseLeave={this.handleMouseLeave}>
            <AssetLineChart
              chartData={chartData}
              handleMouseHover={this.handleMouseHover}
              color={color}
              range={this.state.selectedTimeRange}
              />
            </div >
        { this.TimeRange() }
        </div >
      </div>
    )
  }
  
  Header() {
    const { asset, chartData } = this.props;

    if (!chartData || !chartData[this.state.selectedTimeRange]) return null

    const chartValues = Object.values(chartData[this.state.selectedTimeRange].data) || [];
    
    let startPrice = chartValues[0] || 0;
    let currentPrice = chartValues[this.state.currentDataIndex] || 0;
    let priceDiff = Math.abs(currentPrice - startPrice).toFixed(2);
    
    if (currentPrice < startPrice) {
      priceDiff = '-$' + priceDiff;
      priceDiff += ` (-${((startPrice - currentPrice) / startPrice * 100).toFixed(2)}%)`;
    }
    else {
      priceDiff = '+$' + priceDiff;
      if (startPrice > 0) 
        priceDiff += ` (${((currentPrice - startPrice) / startPrice * 100).toFixed(2)}%)`;
      else
        priceDiff += ` (0.00%)`;
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
    const label = Object.keys(this.props.chartData[this.state.selectedTimeRange].data)[this.state.currentDataIndex] + ' ET';
    
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

  TimeRange() {
    const { selectedTimeRange } = this.state;
    const selectedClass = ' selected ' + (this.props.color === GREEN ? 'green' : 'red')

    return (
      <div className='time-range-container'>
        <button className={'btn' + (selectedTimeRange === '1D' ? selectedClass : '')} style={{ marginLeft: 0 }} onClick={this.changeTimeRange('1D')}>1D</button>
        <button className={'btn' + (selectedTimeRange === '1M' ? selectedClass : '')} onClick={this.changeTimeRange('1M')}>1M</button>
        <button className={'btn' + (selectedTimeRange === '3M' ? selectedClass : '')} onClick={this.changeTimeRange('3M')}>3M</button>
        <button className={'btn' + (selectedTimeRange === '1Y' ? selectedClass : '')} onClick={this.changeTimeRange('1Y')}>1Y</button>
        <button className={'btn' + (selectedTimeRange === '5Y' ? selectedClass : '')} onClick={this.changeTimeRange('5Y')}>5Y</button>
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
      currentDataIndex: Object.keys(this.props.chartData[this.state.selectedTimeRange].data).length - 1 
    });
  }

  changeTimeRange(range) {
    return () => {
      this.setState({ selectedTimeRange: range });
      this.props.onRangeChange(range);
    }
  }
}








class AssetLineChart extends Component {

  shouldComponentUpdate(nextProps) {
    if (this.props.chartData !== nextProps.chartData) return true;
    return false;
  }

  render() {
    
    const { chartData, handleMouseHover, color, range } = this.props;

    if (!chartData || !chartData[range]) return null
    
    const actualPointCount = Object.keys(chartData[range].data).length;
    const maxPointCount = this.props.range === '1D' && actualPointCount < 40 ? 78 : actualPointCount
    const adjustedWidth = CHART_WIDTH / maxPointCount * actualPointCount;

    return (
      <LineChart
        width={adjustedWidth}
        height={196}
        data={chartData[range].data}
        min={chartData[range].low}
        max={chartData[range].high + chartData[range].high * 0.002}
        curve={false}
        dataset={{
          pointRadius: 0,
          borderColor: color,
          pointHoverRadius: 6,
          pointHoverBackgroundColor: color,
          pointBorderColor: 'rgb(255,255,255)',
          pointHoverBorderColor: 'rgb(255,255,255)',
        }}
        library={{
          onHover: handleMouseHover
        }}
      />
    );
  }
}