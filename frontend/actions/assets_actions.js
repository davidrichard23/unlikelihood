import * as AssetsApiUtil from '../util/assets_api_util';

export const RECEIVE_ASSETS = 'RECEIVE_ASSETS'; 
export const RECEIVE_ASSET = 'RECEIVE_ASSET'; 

const receiveAssets = assets => ({
  type: RECEIVE_ASSETS,
  assets
});

const receiveAsset = asset => ({
  type: RECEIVE_ASSET,
  asset
});


export const fetchAssets = (query) => dispatch => {
  console.log(query)
  return AssetsApiUtil.fetchAssets(query)
  .then(assets => dispatch(receiveAssets(assets)));
};

export const fetchAsset = id => dispatch => {
  return AssetsApiUtil.fetchAsset(id)
  .then(asset => dispatch(receiveAsset(asset)));
};
