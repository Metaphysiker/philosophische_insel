class StaticPagesPolicy < ApplicationPolicy

  def visits?
    is_user_admin?(@user)
  end

  def iframer?
    true
  end

end
