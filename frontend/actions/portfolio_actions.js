import * as PortfolioActionsApiUtil from '../util/portfolio_actions_api_util';

export const RECEIVE_PORTFOLIO_ACTIONS = 'RECEIVE_PORTFOLIO_ACTIONS';


const receivePortfolioActions = portfolioActions => ({
  type: RECEIVE_PORTFOLIO_ACTIONS,
  portfolioActions,
});


export const fetchPortfolioActions = () => dispatch => {
  return PortfolioActionsApiUtil.fetchPortfolioActions()
  .then(portfolioActions => dispatch(receivePortfolioActions(portfolioActions)));
};