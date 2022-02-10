class CreateVeganVisits < ActiveRecord::Migration[6.1]
  def change
    create_table :vegan_visits do |t|
      t.string :url, default: ""
      t.string :fullpath, default: ""

      t.timestamps
    end
  end
end
