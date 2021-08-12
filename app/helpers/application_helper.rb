module ApplicationHelper

  def application_name
    "Philosophische Insel"
  end

  def is_user_admin?(user)
    return false if user.nil?
    user.admin?
  end

end
