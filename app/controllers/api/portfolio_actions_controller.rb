class PortfolioActionsController < ApplicationController
  def index
    @portfolio_actions = current_user.portfolio_actions
    render json: @portfolio_actions
  end

  def create
  end
end