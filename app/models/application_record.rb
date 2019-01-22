class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true

  helper_method :current_user
  
  def current_user
    @current_user ||= User.find_by(session_token: session[:session_token])
  end
end
