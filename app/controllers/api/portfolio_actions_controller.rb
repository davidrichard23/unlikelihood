class Api::PortfolioActionsController < ApplicationController
  def index
    @portfolio_actions = current_user.portfolio_actions
    render :index
  end

  def create
    @portfolio_action = PortfolioAction.new(portfolio_action_params)
    @portfolio_action[:user_id] = current_user.id

    if @portfolio_action.save
      if portfolio_action_params[:action] == 'buy'
        current_user[:balance] = current_user.balance - portfolio_action_params[:shares].to_f * portfolio_action_params[:price].to_f
      else
        current_user[:balance] = current_user.balance + portfolio_action_params[:shares].to_f * portfolio_action_params[:price].to_f
      end
      current_user.save
      
      render json: @portfolio_action
    else
      render json: @portfolio_action.errors.full_messages, status: 422
    end
  end


  def portfolio_action_params
    params.require(:portfolio_action).permit(:asset_symbol, :shares, :action, :price)
  end
end