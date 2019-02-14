
export const RECEIVE_PORTFOLIO_CHART_DATA = 'RECEIVE_PORTFOLIO_CHART_DATA';

const receivePortfolioChartData = chartData => ({
  type: RECEIVE_PORTFOLIO_CHART_DATA,
  chartData
});


export const fetchPortfolioChartData = range => (dispatch, getState) => {

  const state = getState();
  const assets = Object.values(state.entities.assets);
  const ownedAssetIds = Object.keys(state.entities.portfolioActions);
  const ownedAssets = assets.filter(asset => ownedAssetIds.includes(asset.symbol.toString()));
  const portfolioActions = state.entities.portfolioActions;
  
  const portfolioChartData = {
    [range]: {
      high: -Infinity,
      low: Infinity,
      close: null,
      data: {},
    }
  };

  ownedAssets.forEach(asset => {
    const assetChartData = state.entities.chartData[asset.symbol][range].data;
    const assetActions = Object.values(portfolioActions[asset.symbol]);
    const timePoints = Object.keys(assetChartData);
    const latestTimePoint = timePoints[timePoints.length - 1];

    timePoints.forEach((timePoint, i) => {
      const shares = getShareCount(timePoint, latestTimePoint, assetActions);

      if (!portfolioChartData[range].data[timePoint])
        portfolioChartData[range].data[timePoint] = assetChartData[timePoint] * shares;
      else
        portfolioChartData[range].data[timePoint] += assetChartData[timePoint] * shares;
      
      if (portfolioChartData[range].data[timePoint] > portfolioChartData[range].high) 
        portfolioChartData[range].high = portfolioChartData[range].data[timePoint];
      if (portfolioChartData[range].data[timePoint] < portfolioChartData[range].low) 
        portfolioChartData[range].low = portfolioChartData[range].data[timePoint];

      if (i === timePoints.length - 1) portfolioChartData[range].close = portfolioChartData[range].data[timePoint];
    });
  });

  return dispatch(receivePortfolioChartData(portfolioChartData));
};

const getShareCount = (timePoint, latestTimePoint, portfolioActions) => {
  const timePointDate = new Date(timePoint);
  const latestTimePointDate = new Date(latestTimePoint);
  const shares = portfolioActions.reduce((total, pAction) => {
    const createdAt = new Date(pAction.created_at);
    if (pAction.action === 'buy' && (timePointDate >= createdAt || (timePointDate.toString() == latestTimePointDate.toString() && createdAt >= latestTimePointDate)))
      return total + pAction.shares;
    if (pAction.action === 'sell' && (timePointDate >= createdAt || (timePointDate.toString() == latestTimePointDate.toString() && createdAt >= latestTimePointDate)))
      return total - pAction.shares;

    return total;
  }, 0);

  return shares;
}