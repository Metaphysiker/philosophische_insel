class AddNextShoeingDeadlineToHorses < ActiveRecord::Migration[6.1]
  def change
    add_column :horses, :shoeing_deadline, :date
  end
end
