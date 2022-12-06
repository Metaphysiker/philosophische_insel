class AddDisclaimer1ToVeganuaryItems < ActiveRecord::Migration[6.1]
  def change
    add_column :veganuary_items, :disclaimer1, :string, default: "false"
  end
end
