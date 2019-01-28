class Api::WatchedAssetsController < ApplicationController
  def index
    @watched_assets = current_user.watched_assets.joins(:asset)
  end

  def create
    @watched_asset = WatchedAsset.new(watched_asset_params)
    @watched_asset[:user_id] = current_user[:id]

    if @watched_asset.save
      render json: @watched_asset.asset_id
    else
      render json: @watched_asset.errors.full_messages, status: 422
    end
  end

  def destroy
    current_user.watched_assets.where(asset_id: params[:id]).destroy_all
    render json: params[:id]
  end


  def watched_asset_params
    params.require(:asset).permit(:asset_id)
  end
end