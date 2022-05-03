class CreateWorkers < ActiveRecord::Migration[6.1]
  def change
    create_table :workers do |t|
      t.string :first_name, default: ""
      t.string :last_name, default: ""
      t.decimal :hours_per_week, default: "55.00"

      t.timestamps
    end
  end
end
