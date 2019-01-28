import { connect } from 'react-redux';
import Asset from './asset';
import { fetchAsset } from '../../actions/assets_actions';
import { fetchChartData } from '../../actions/chart_data_actions';
import { addAssetToWatchlist, removeAssetFromWatchlist } from '../../actions/user_actions';

const msp = (state, ownProps) => {

  

  // alphaadvantage.co
  // Object.keys(state.entities.chartData).forEach(key => {
  //   const data = state.entities.chartData[key];
  //   chartData[key] = Number(data['4. close']);
  //   if (Number(data['2. high']) > chartHigh) chartHigh = Number(data['2. high']);
  //   if (Number(data['3. low']) < chartLow) chartLow = Number(data['3. low']);
  // });

  return {
    currentUser: state.entities.user,
    asset: state.entities.assets[ownProps.match.params.assetId],
    chartData: state.entities.chartData,
  };
};

const mdp = dispatch => ({
  fetchAsset: id => dispatch(fetchAsset(id)),
  fetchChartData: (ticker, range) => dispatch(fetchChartData(ticker, range)),
  addAssetToWatchlist: id => dispatch(addAssetToWatchlist(id)),
  removeAssetFromWatchlist: id => dispatch(removeAssetFromWatchlist(id)),
});

export default connect(msp, mdp)(Asset);