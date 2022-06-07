class VeganVisitPolicy < ApplicationPolicy

  def index?
    is_user_admin?(@user)
  end

  def show?
    is_user_admin?(@user)
  end

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

  def visual?
    is_user_admin?(@user)
  end

  def analytics?
    is_user_admin?(@user)
  end


  class Scope < Scope
    def resolve
      scope.all
    end
  end
end
