import * as IexApiUtil from '../util/iex_api_util';

export const RECEIVE_STOCK_NEWS = 'RECEIVE_STOCK_NEWS';
export const RECEIVE_ALL_NEWS = 'RECEIVE_ALL_NEWS';

const receiveStockNews = (name, news) => ({
  type: RECEIVE_STOCK_NEWS,
  name,
  news,
});

const receiveAllNews = news => ({
  type: RECEIVE_ALL_NEWS,
  news
});


export const fetchStockNews = name => dispatch => {
  const searchName = name.toLowerCase().replace(' inc.', '');
  return IexApiUtil.fetchStockNews(searchName)
    .then(news => {
      return dispatch(receiveStockNews(name, news.articles));
    });
};

export const fetchAllNews = () => dispatch => {
  return IexApiUtil.fetchAllNews()
    .then(news => {
      console.log(news.articles)
      return dispatch(receiveAllNews(news.articles));
    });
};