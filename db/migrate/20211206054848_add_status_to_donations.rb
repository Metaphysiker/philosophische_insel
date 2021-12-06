class AddStatusToDonations < ActiveRecord::Migration[6.1]
  def change
    add_column :donations, :status, :string, default: ""
  end
end
