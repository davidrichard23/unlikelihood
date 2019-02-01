import { fetchAssets } from './assets_actions';

export const RECEIVE_SEARCH_ASSETS = 'RECEIVE_SEARCH_ASSETS';


const receiveSearchAssets = assetSymbols => ({
  type: RECEIVE_SEARCH_ASSETS,
  assetSymbols
});


export const searchAssets = text => (dispatch, getState) => {
  if (text === '') return dispatch(receiveSearchAssets([]));
  const state = getState();
  const allAssets = Object.values(state.entities.assets);
  const searchedAssets = allAssets.filter(asset => asset.name.toLowerCase().includes(text.toLowerCase()) || asset.symbol.toLowerCase().includes(text.toLowerCase()));
  const symbols = searchedAssets.slice(0,5).map(asset => asset.symbol);
  return dispatch(receiveSearchAssets(symbols));
};