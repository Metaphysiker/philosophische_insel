class DonationProjectPolicy < ApplicationPolicy

  def new?
    is_user_admin?(@user)
  end

  def edit?
    is_user_admin?(@user)
  end

  def create?
    is_user_admin?(@user)
  end

  def update?
    is_user_admin?(@user)
  end

  def destroy?
    is_user_admin?(@user)
  end
  
  class Scope < Scope
    def resolve
      scope.all
    end
  end
end
