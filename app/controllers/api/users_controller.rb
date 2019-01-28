class Api::UsersController < ApplicationController
  def create
    @user = User.new(user_params).include(:watched_assets)
    
    if @user.save
      login!(@user)
      render :create
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def user_params
    params.require(:user).permit(:first_name, :last_name, :password, :email, :balance)
  end
end