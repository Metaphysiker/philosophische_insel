class CreateHorseComments < ActiveRecord::Migration[6.1]
  def change
    create_table :horse_comments do |t|
      t.text :content
      t.belongs_to :horse

      t.timestamps
    end
  end
end
