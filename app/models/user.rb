class User < ApplicationRecord
  has_many :user_roles
  has_many :roles, through: :user_roles
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

   def admin?
     roles.where(name: "admin").exists?
   end

   # the authenticate method from devise documentation
    def self.authenticate(email, password)
      user = User.find_for_authentication(email: email)
      user&.valid_password?(password) ? user : nil
    end

end
