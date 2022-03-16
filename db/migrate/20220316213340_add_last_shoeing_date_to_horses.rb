class AddLastShoeingDateToHorses < ActiveRecord::Migration[6.1]
  def change
    add_column :horses, :last_shoeing_date, :date
  end
end
