module ApplicationHelper

  def application_name
    "Philosophische Insel"
  end

  def is_user_admin?(user)
    return false if user.nil?
    user.admin?
  end

  def is_user_claudia?(user)
    return false if user.nil?
    user.claudia?
  end

  def resource_name
  :user
end

def resource
  @resource ||= User.new
end

def resource_class
  User
end

def devise_mapping
  @devise_mapping ||= Devise.mappings[:user]
end

end
