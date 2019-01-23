class Api::SessionsController < ApplicationController
  def create
    @user = User.find_by_credentials(user_params[:username], user_params[:password])

    if @user
      render json: @user
    else
      render json: ['Invalid username or password'], status: 422
    end
  end

  def destroy
    if !current_user
      render json: {}
    else
      logout!
      render json: {}, status: 422
    end
  end

  def user_params
    params.require(:user).permit(:username, :password)
  end
end