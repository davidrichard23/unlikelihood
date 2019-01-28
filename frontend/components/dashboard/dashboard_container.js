import { connect } from 'react-redux';
import Dashboard from './dashboard';
import { logout } from '../../actions/user_actions';
import { fetchAssets } from '../../actions/assets_actions';
import { fetchMultipleChartData } from '../../actions/chart_data_actions';

const msp = state => ({
  currentUser: state.entities.user,
  watchedAssets: Object.values(state.entities.assets).filter(asset => state.entities.user.watchedAssetIds.includes(asset.id)),
  chartData: state.entities.chartData,
});

const mdp = dispatch => ({
  logout: () => dispatch(logout()),
  fetchAssets: ids => dispatch(fetchAssets(ids)),
  fetchMultipleChartData: (tickers, range) => dispatch(fetchMultipleChartData(tickers, range)),
});

export default connect(msp, mdp)(Dashboard);