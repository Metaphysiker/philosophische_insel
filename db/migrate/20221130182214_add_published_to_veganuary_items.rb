class AddPublishedToVeganuaryItems < ActiveRecord::Migration[6.1]
  def change
    add_column :veganuary_items, :published, :string, default: "false"
  end
end
