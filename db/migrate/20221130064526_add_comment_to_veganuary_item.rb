class AddCommentToVeganuaryItem < ActiveRecord::Migration[6.1]
  def change
    add_column :veganuary_items, :comment, :text, default: ""
  end
end
