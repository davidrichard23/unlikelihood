import * as PortfolioActionsApiUtil from '../util/portfolio_actions_api_util';
import { addBalance, subtractBalance } from './user_actions';

export const RECEIVE_PORTFOLIO_ACTIONS = 'RECEIVE_PORTFOLIO_ACTIONS';
export const RECEIVE_PORTFOLIO_ACTION = 'RECEIVE_PORTFOLIO_ACTION';


const receivePortfolioActions = portfolioActions => ({
  type: RECEIVE_PORTFOLIO_ACTIONS,
  portfolioActions,
});

const receivePortfolioAction = portfolioAction => ({
  type: RECEIVE_PORTFOLIO_ACTION,
  portfolioAction,
});


export const fetchPortfolioActions = () => dispatch => {
  return PortfolioActionsApiUtil.fetchPortfolioActions()
  .then(portfolioActions => dispatch(receivePortfolioActions(portfolioActions)));
};

export const createPortfolioAction = formData => dispatch => {
  return PortfolioActionsApiUtil.createPortfolioAction(formData)
  .then(portfolioAction => {
    if (formData.action === 'buy') {
      dispatch(subtractBalance(formData.price * formData.shares));
    }
    if (formData.action === 'sell') {
      dispatch(addBalance(formData.price * formData.shares));
    }
    return dispatch(receivePortfolioAction(portfolioAction));
  });
};