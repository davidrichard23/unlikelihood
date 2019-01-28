export const fetchPortfolioActions = () => {
  return $.ajax({
    method: 'GET',
    url: '/api/portfolio_actions'
  });
};
