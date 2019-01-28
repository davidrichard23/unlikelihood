class Api::AssetsController < ApplicationController 
  def index
    if params[:query].is_a?(Array)
      @assets = Asset.where(id: params[:query])
    elsif params[:query].is_a?(String)
      str = "%#{params[:query]}%"
      @assets = Asset.where("name ILIKE ?", str)
              .or(Asset.where("ticker ILIKE ?", str))
    else
      @assets = Asset.all
    end

    render :index
  end

  def show 
    @asset = Asset.find(params[:id])
  end
end