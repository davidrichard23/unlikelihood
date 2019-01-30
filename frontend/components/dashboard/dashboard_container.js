import { connect } from 'react-redux';
import { merge } from 'lodash';
import Dashboard from './dashboard';
import { logout } from '../../actions/user_actions';
import { fetchAssets } from '../../actions/assets_actions';
import { fetchMultipleChartData } from '../../actions/chart_data_actions';
import { fetchPortfolioActions } from '../../actions/portfolio_actions';
import { fetchPortfolioChartData } from '../../actions/portfolio_chart_data_actions';

const msp = state => {
  const assets = Object.values(state.entities.assets);
  const ownedAssetIds = Object.keys(state.entities.portfolioActions);
  const ownedAssets = assets.filter(asset => ownedAssetIds.includes(asset.id.toString()));
  const watchedAssets = assets.filter(asset => state.entities.user.watchedAssetIds.includes(asset.id));
  const portfolioChartData = state.entities.portfolioChartData;
  
  return {
    currentUser: state.entities.user,
    ownedAssets: ownedAssets,
    ownedAssetIds: ownedAssetIds,
    watchedAssets: watchedAssets,
    chartData: state.entities.chartData,
    portfolioChartData: portfolioChartData,
  };
};

const mdp = dispatch => ({
  logout: () => dispatch(logout()),
  fetchAssets: ids => dispatch(fetchAssets(ids)),
  fetchMultipleChartData: (tickers, range) => dispatch(fetchMultipleChartData(tickers, range)),
  fetchPortfolioActions: () => dispatch(fetchPortfolioActions()),
  fetchPortfolioChartData: range => dispatch(fetchPortfolioChartData(range)),
});

export default connect(msp, mdp)(Dashboard);



