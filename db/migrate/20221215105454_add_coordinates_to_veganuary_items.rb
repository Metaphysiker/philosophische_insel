class AddCoordinatesToVeganuaryItems < ActiveRecord::Migration[6.1]
  def change
    add_column :veganuary_items, :coordinates, :text, default: ""
  end
end
