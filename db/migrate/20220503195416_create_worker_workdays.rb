class CreateWorkerWorkdays < ActiveRecord::Migration[6.1]
  def change
    create_table :worker_workdays do |t|

      t.belongs_to :work_day
      t.belongs_to :worker

      t.timestamps
    end
  end
end
