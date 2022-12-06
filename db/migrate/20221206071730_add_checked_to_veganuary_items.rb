class AddCheckedToVeganuaryItems < ActiveRecord::Migration[6.1]
  def change
    add_column :veganuary_items, :checked, :string, default: ""
  end
end
