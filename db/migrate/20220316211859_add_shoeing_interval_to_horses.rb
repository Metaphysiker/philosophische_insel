class AddShoeingIntervalToHorses < ActiveRecord::Migration[6.1]
  def change
    add_column :horses, :shoeing_interval, :integer
  end
end
