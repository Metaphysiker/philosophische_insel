class CreateDonations < ActiveRecord::Migration[6.1]
  def change
    create_table :donations do |t|
      t.decimal :amount
      t.string :project

      t.timestamps
    end
  end
end
