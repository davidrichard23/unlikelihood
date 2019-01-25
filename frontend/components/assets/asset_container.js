import { connect } from 'react-redux';
import Asset from './asset';
import { fetchAsset } from '../../actions/assets_actions';
import { fetchChartData } from '../../actions/chart_data_actions';

const msp = (state, ownProps) => {

  const chartData = {};
  let chartHigh = -Infinity;
  let chartLow = Infinity;

  state.entities.chartData.forEach(d => {
    if (d.close && d.close !== -1) {
      chartData[d.label] = d.close;
      if (d.high > chartHigh) chartHigh = d.high;
      if (d.low < chartLow) chartLow = d.low;
    }
  });

  // alphaadvantage.co
  // Object.keys(state.entities.chartData).forEach(key => {
  //   const data = state.entities.chartData[key];
  //   chartData[key] = Number(data['4. close']);
  //   if (Number(data['2. high']) > chartHigh) chartHigh = Number(data['2. high']);
  //   if (Number(data['3. low']) < chartLow) chartLow = Number(data['3. low']);
  // });

  return {
    asset: state.entities.assets[ownProps.match.params.assetId],
    chartData: chartData,
    chartHigh: chartHigh,
    chartLow: chartLow,
  };
};

const mdp = dispatch => ({
  fetchAsset: id => dispatch(fetchAsset(id)),
  fetchChartData: (ticker, range) => dispatch(fetchChartData(ticker, range))
});

export default connect(msp, mdp)(Asset);