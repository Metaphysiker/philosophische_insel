class StaticPagesPolicy < ApplicationPolicy

  def visits?
    is_user_admin?(@user)
  end

  def serial_letter?
    is_user_admin?(@user) || is_user_claudia?(@user)
  end

  def serial_letter_upload_csv?
    is_user_admin?(@user) || is_user_claudia?(@user)
  end

  def claudia_dashboard?
    is_user_admin?(@user) || is_user_claudia?(@user)
  end

  def iframer?
    true
  end

end
