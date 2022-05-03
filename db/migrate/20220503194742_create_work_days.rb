class CreateWorkDays < ActiveRecord::Migration[6.1]
  def change
    create_table :work_days do |t|
      t.date :date

      t.timestamps
    end
  end
end
