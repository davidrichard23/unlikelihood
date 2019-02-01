import * as IexApiUtil from '../util/iex_api_util';

export const RECEIVE_ALL_ASSETS = 'RECEIVE_ALL_ASSETS'; 
export const RECEIVE_ASSET_INFO = 'RECEIVE_ASSET_INFO'; 

const receiveAllAssets = assets => ({
  type: RECEIVE_ALL_ASSETS,
  assets
});

const receiveAssetInfo = assetInfo => ({
  type: RECEIVE_ASSET_INFO,
  assetInfo
});


export const fetchAllAssets = () => dispatch => {
  return IexApiUtil.fetchAllAssets()
  .then(assets => {
    const formattedAssets = {};
    assets.forEach(asset => formattedAssets[asset.symbol] = asset);
    return dispatch(receiveAllAssets(formattedAssets));
  });
};

export const fetchAssetInfo = symbol => dispatch => {
  return IexApiUtil.fetchAssetInfo(symbol)
  .then(assetInfo => dispatch(receiveAssetInfo(assetInfo)));
};