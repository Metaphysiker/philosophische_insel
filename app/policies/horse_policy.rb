class HorsePolicy < ApplicationPolicy

  def index?
    is_user_admin?(@user) || is_user_claudia?(@user)
  end

  def get_odt_of_horses?
    is_user_admin?(@user) || is_user_claudia?(@user)
  end

  def get_word_of_horses?
    is_user_admin?(@user) || is_user_claudia?(@user)
  end

  def get_pdf_of_horses?
    is_user_admin?(@user) || is_user_claudia?(@user)
  end

  def show?
    is_user_admin?(@user) || is_user_claudia?(@user)
  end

  def new?
    is_user_admin?(@user) || is_user_claudia?(@user)
  end

  def edit?
    is_user_admin?(@user) || is_user_claudia?(@user)
  end

  def create?
    is_user_admin?(@user) || is_user_claudia?(@user)
  end

  def update?
    is_user_admin?(@user) || is_user_claudia?(@user)
  end

  def destroy?
    is_user_admin?(@user) || is_user_claudia?(@user)
  end

  def shoeing_happened_today?
    is_user_admin?(@user) || is_user_claudia?(@user)
  end


  class Scope < Scope
    def resolve
      scope.all
    end
  end
end
