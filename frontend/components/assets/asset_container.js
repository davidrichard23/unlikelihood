import { connect } from 'react-redux';
import Asset from './asset';
import { fetchAssetInfo } from '../../actions/assets_actions';
import { fetchChartData } from '../../actions/chart_data_actions';
import { addAssetToWatchlist, removeAssetFromWatchlist } from '../../actions/user_actions';
import { createPortfolioAction } from '../../actions/portfolio_actions';
import { fetchStockNews } from '../../actions/news_actions';

const msp = (state, ownProps) => {
  
  const symbol = ownProps.match.params.assetSymbol;
  const portfolioActions = state.entities.portfolioActions[symbol] || [];
  const ownedShares = portfolioActions.reduce((total, portfolioAction) => {
    if (portfolioAction.action === 'buy') return total + portfolioAction.shares;
    if (portfolioAction.action === 'sell') return total - portfolioAction.shares;
  }, 0);
  
  const chartData = state.entities.chartData[symbol] || {
    ['1D']: {
      high: 10,
      low: 0,
      close: 0,
      data: {},
    }
  };
  
  return {
    currentUser: state.entities.user,
    asset: state.entities.assets[symbol],
    chartData: chartData,
    ownedShares: ownedShares,
    articles: state.entities.news[symbol] || [],
  };
};

const mdp = dispatch => ({
  fetchAssetInfo: symbol => dispatch(fetchAssetInfo(symbol)),
  fetchChartData: (symbol, range) => dispatch(fetchChartData(symbol, range)),
  addAssetToWatchlist: symbol => dispatch(addAssetToWatchlist(symbol)),
  removeAssetFromWatchlist: symbol => dispatch(removeAssetFromWatchlist(symbol)),
  createPortfolioAction: formData => dispatch(createPortfolioAction(formData)),
  fetchStockNews: symbol => dispatch(fetchStockNews(symbol)),
});

export default connect(msp, mdp)(Asset);