import { fetchAssets } from './assets_actions';

export const RECEIVE_SEARCH_ASSETS = 'RECEIVE_SEARCH_ASSETS';


const receiveSearchAssets = assetIds => ({
  type: RECEIVE_SEARCH_ASSETS,
  assetIds
});


export const searchAssets = text => dispatch => {
  if (text === '') return dispatch(receiveSearchAssets([]));
  
  return dispatch(fetchAssets(text))
  .then(data => {
    console.log(data)
    const ids = Object.keys(data.assets);
    return dispatch(receiveSearchAssets(ids));
  });
};