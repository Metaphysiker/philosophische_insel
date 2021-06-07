class AddOrderToPages < ActiveRecord::Migration[6.1]
  def change
    add_column :pages, :order, :integer
  end
end
