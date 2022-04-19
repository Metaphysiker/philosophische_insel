class Role < ApplicationRecord
  has_many :user_roles
  has_many :roles, through: :user_roles

  def self.roles
    ["admin", "claudia"]
  end
end
