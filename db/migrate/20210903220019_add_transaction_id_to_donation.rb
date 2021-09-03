class AddTransactionIdToDonation < ActiveRecord::Migration[6.1]
  def change
    add_column :donations, :transaction_id, :string, default: ""
  end
end
