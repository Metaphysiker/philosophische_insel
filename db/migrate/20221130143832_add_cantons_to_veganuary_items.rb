class AddCantonsToVeganuaryItems < ActiveRecord::Migration[6.1]
  def change
    add_column :veganuary_items, :cantons, :string, default: ""
  end
end
