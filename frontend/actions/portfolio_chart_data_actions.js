
export const RECEIVE_PORTFOLIO_CHART_DATA = 'RECEIVE_PORTFOLIO_CHART_DATA';

const receivePortfolioChartData = chartData => ({
  type: RECEIVE_PORTFOLIO_CHART_DATA,
  chartData
});


export const fetchPortfolioChartData = range => (dispatch, getState) => {

  const state = getState();
  const assets = Object.values(state.entities.assets);
  const ownedAssetIds = Object.keys(state.entities.portfolioActions);
  const ownedAssets = assets.filter(asset => ownedAssetIds.includes(asset.id.toString()));
  const portfolioActions = state.entities.portfolioActions;
  
  const portfolioChartData = {
    [range]: {
      high: -Infinity,
      low: Infinity,
      data: {},
    }
  };

  const repairedPrices = [];
  let keys = [];

  // get all the date/time keys so that they can be sorted
  ownedAssets.forEach((asset, i) => {
    const chartData = state.entities.chartData[asset.ticker];
    if (!chartData) return;

    Object.keys(chartData[range].data).forEach(key => {
      if (!keys.includes(key)) keys.push(key);
    });
  });
  // keys = keys.sort((a, b) => {
  //   if (timeToDate(a) > timeToDate(b)) return 1;
  //   if (timeToDate(a) < timeToDate(b)) return -1;
  //   return 0;
  // });
  keys.forEach(key => portfolioChartData[range].data[key] = 0);
  
  
  const latestDate = new Date(keys[keys.length - 1]);
  // get price data for each date/time key and account for missing data
  keys.forEach((key, i) => {
    const marketPrices = {};
    const portfolioPrices = {};
    
    ownedAssets.forEach((asset) => {
      const chartData = state.entities.chartData[asset.ticker];
      if (!chartData) return;
      
      let price = chartData[range].data[key];
      if (!chartData[range].data[key]) {
        price = repairedPrices[i - 1][asset.ticker];
      }
      
      const dateKey = new Date(key);
      const shares = Object.values(portfolioActions[asset.id]).reduce((total, pAction) => {
        const createdAt = new Date(pAction.created_at);
        if (pAction.action === 'buy' && (dateKey >= createdAt || (dateKey.toString() == latestDate.toString() && createdAt >= latestDate))) 
          return total + pAction.shares;
        if (pAction.action === 'sell' && (dateKey >= createdAt || (dateKey.toString() == latestDate.toString() && createdAt >= latestDate))) 
          return total - pAction.shares;

        return total;
      }, 0);

      marketPrices[asset.ticker] = price;
      portfolioPrices[asset.ticker] = price * shares;
    });

    repairedPrices.push(marketPrices);
    portfolioChartData[range].data[key] = Object.values(portfolioPrices).reduce((total, n) => total + n);

    if (portfolioChartData[range].data[key] > portfolioChartData[range].high)
      portfolioChartData[range].high = portfolioChartData[range].data[key];
    if (portfolioChartData[range].data[key] < portfolioChartData[range].low)
      portfolioChartData[range].low = portfolioChartData[range].data[key];
  });

  const portfolioChartDataKeys = Object.keys(portfolioChartData[range].data);
  portfolioChartData[range].open = portfolioChartData[range].data[portfolioChartDataKeys[0]];
  portfolioChartData[range].close = portfolioChartData[range].data[portfolioChartDataKeys[portfolioChartDataKeys.length - 1]];

  dispatch(receivePortfolioChartData(portfolioChartData));
};