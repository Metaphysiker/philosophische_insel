class AddCategoryToVeganuaryItems < ActiveRecord::Migration[6.1]
  def change
    add_column :veganuary_items, :category, :string, default: ""
  end
end
