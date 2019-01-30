import { connect } from 'react-redux';
import Asset from './asset';
import { fetchAsset } from '../../actions/assets_actions';
import { fetchChartData } from '../../actions/chart_data_actions';
import { addAssetToWatchlist, removeAssetFromWatchlist } from '../../actions/user_actions';
import { createPortfolioAction, fetchPortfolioActions } from '../../actions/portfolio_actions';

const msp = (state, ownProps) => {

  const id = Number(ownProps.match.params.assetId);
  const portfolioActions = state.entities.portfolioActions[id] || [];
  const ownedShares = portfolioActions.reduce((total, portfolioAction) => {
    if (portfolioAction.action === 'buy') return total + portfolioAction.shares;
    if (portfolioAction.action === 'sell') return total - portfolioAction.shares;
  }, 0);

  return {
    currentUser: state.entities.user,
    asset: state.entities.assets[id],
    chartData: state.entities.chartData,
    ownedShares: ownedShares,
  };
};

const mdp = dispatch => ({
  fetchAsset: id => dispatch(fetchAsset(id)),
  fetchChartData: (ticker, range) => dispatch(fetchChartData(ticker, range)),
  addAssetToWatchlist: id => dispatch(addAssetToWatchlist(id)),
  removeAssetFromWatchlist: id => dispatch(removeAssetFromWatchlist(id)),
  createPortfolioAction: formData => dispatch(createPortfolioAction(formData)),
  fetchPortfolioActions: () => dispatch(fetchPortfolioActions()),
});

export default connect(msp, mdp)(Asset);