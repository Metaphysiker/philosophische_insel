class VeganuaryItemPolicy < ApplicationPolicy

  def index?
    true
  end

  def show?
    #is_user_admin?(@user)
    true
  end

  def new?
    #is_user_admin?(@user)
    true
  end

  def edit?
    is_user_admin?(@user)
  end

  def create?
    #is_user_admin?(@user)
    true
  end

  def update?
    is_user_admin?(@user)
  end

  def destroy?
    is_user_admin?(@user)
  end

  class Scope < Scope
    # NOTE: Be explicit about which records you allow access to!
    # def resolve
    #   scope.all
    # end
  end
end
