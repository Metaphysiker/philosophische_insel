class CreateHorses < ActiveRecord::Migration[6.1]
  def change
    create_table :horses do |t|
      t.string :name, default: ""
      t.date :next_shoeing_date
      t.text :comment, default: ""

      t.timestamps
    end
  end
end
