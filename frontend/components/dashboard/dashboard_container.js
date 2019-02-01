import { connect } from 'react-redux';
import { merge } from 'lodash';
import Dashboard from './dashboard';
import { logout } from '../../actions/user_actions';
import { fetchMultipleChartData } from '../../actions/chart_data_actions';
import { fetchPortfolioChartData } from '../../actions/portfolio_chart_data_actions';
import { fetchAllNews } from '../../actions/news_actions';

const msp = state => {
  const assets = Object.values(state.entities.assets);
  const ownedAssetSymbols = Object.keys(state.entities.portfolioActions);
  const ownedAssets = assets.filter(asset => ownedAssetSymbols.includes(asset.symbol.toString()));
  const watchedAssets = assets.filter(asset => state.entities.user.watchedAssetSymbols.includes(asset.symbol));
  const portfolioChartData = state.entities.portfolioChartData;

  return {
    currentUser: state.entities.user,
    ownedAssets: ownedAssets,
    watchedAssets: watchedAssets,
    chartData: state.entities.chartData,
    portfolioChartData: portfolioChartData,
    articles: state.entities.news.all || [],
  };
};

const mdp = dispatch => ({
  logout: () => dispatch(logout()),
  fetchMultipleChartData: (symbols, range) => dispatch(fetchMultipleChartData(symbols, range)),
  fetchPortfolioActions: () => dispatch(fetchPortfolioActions()),
  fetchPortfolioChartData: range => dispatch(fetchPortfolioChartData(range)),
  fetchAllNews: () => dispatch(fetchAllNews()),
});

export default connect(msp, mdp)(Dashboard);



