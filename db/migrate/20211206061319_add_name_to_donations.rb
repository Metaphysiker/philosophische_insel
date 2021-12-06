class AddNameToDonations < ActiveRecord::Migration[6.1]
  def change
    add_column :donations, :first_name, :string, default: ""
    add_column :donations, :last_name, :string, default: ""
    add_column :donations, :email, :string, default: ""
  end
end
