export const fetchPortfolioActions = () => {
  return $.ajax({
    method: 'GET',
    url: '/api/portfolio_actions'
  });
};
export const createPortfolioAction = portfolio_action => {
  return $.ajax({
    method: 'POST',
    url: '/api/portfolio_actions',
    data: {portfolio_action}
  });
};
