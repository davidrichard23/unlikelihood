class Api::AssetsController < ApplicationController 
  def index
    str = "%#{asset_params[:text]}%"
    @assets = Asset.where("name ILIKE ?", str)
            .or(Asset.where("ticker ILIKE ?", str))
    render :index
  end

  def show 
    @asset = Asset.find(params[:id])
  end


  def asset_params
    params.permit(:text)
  end
end