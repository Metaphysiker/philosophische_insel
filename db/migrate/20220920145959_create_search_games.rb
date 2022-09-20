class CreateSearchGames < ActiveRecord::Migration[6.1]
  def change
    create_table :search_games do |t|
      t.string :cookie, default: ""
      t.string :category, default: ""
      t.string :identifier, default: ""

      t.timestamps
    end
  end
end
