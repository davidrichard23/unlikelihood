import * as IexApiUtil from '../util/iex_api_util';

export const RECEIVE_STOCK_NEWS = 'RECEIVE_STOCK_NEWS';
export const RECEIVE_ALL_NEWS = 'RECEIVE_ALL_NEWS';

const receiveStockNews = (symbol, news) => ({
  type: RECEIVE_STOCK_NEWS,
  symbol,
  news,
});

const receiveAllNews = news => ({
  type: RECEIVE_ALL_NEWS,
  news
});


export const fetchStockNews = symbol => dispatch => {
  return IexApiUtil.fetchStockNews(symbol)
    .then(news => {
      return dispatch(receiveStockNews(symbol, news));
    });
};

export const fetchAllNews = () => dispatch => {
  return IexApiUtil.fetchAllNews()
    .then(news => {
      return dispatch(receiveAllNews(news));
    });
};