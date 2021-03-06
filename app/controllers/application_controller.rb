class ApplicationController < ActionController::Base
  include Pundit
  after_action :track_action

  rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized

  protected

  def track_action
    ahoy.track "Ran action", request.path_parameters
  end

  private

  def user_not_authorized
    flash[:alert] = "You are not authorized to perform this action."
    redirect_to(root_path)
  end

  def after_sign_in_path_for(resource)
      #if resource.is_a?(User) && resource.can_publish?
      if resource.claudia?
        #horses_path
        claudia_dashboard_path
      else
        root_path
      end
  end

end
