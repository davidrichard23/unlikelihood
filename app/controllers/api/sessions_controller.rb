class Api::SessionsController < ApplicationController
  def create
    @user = User.find_by_credentials(user_params[:email], user_params[:password])

    if @user
      login!(@user)
      render 'api/users/show.json'
    else
      render json: ['Invalid email or password'], status: 422
    end
  end

  def destroy
    if !current_user
      render json: {}, status: 422
    else
      logout!
      render json: {}
    end
  end

  def user_params
    params.require(:user).permit(:email, :password)
  end
end