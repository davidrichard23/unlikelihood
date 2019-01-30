import React, { Component } from 'react';
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

export default class MiniAssetChart extends Component {

  render() {

    if (!this.props.chartData) return null;

    const { chartData, color } = this.props;
    const actualPointCount = Object.keys(this.props.chartData).length;
    const maxPointCount = actualPointCount < 60 ? 78 : actualPointCount
    const adjustedWidth = 60 / actualPointCount * actualPointCount;

    return (
      <div>
        <LineChart
          width={adjustedWidth}
          height={25}
          data={chartData.data}
          min={chartData.low}
          max={chartData.high}
          curve={false}
          dataset={{
            pointRadius: 0,
            borderColor: color,
            borderWidth: 1,
            pointHoverRadius: 0,
            pointHoverBackgroundColor: color,
            pointBorderColor: 'rgb(255,255,255)',
            pointHoverBorderColsor: 'rgb(255,255,255)',
          }}
        />
      </div>
    );
  }
}