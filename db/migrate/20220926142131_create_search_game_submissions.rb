class CreateSearchGameSubmissions < ActiveRecord::Migration[6.1]
  def change
    create_table :search_game_submissions do |t|
      t.string :email, default: ""
      t.string :subscribe_to_newsletter, default: ""

      t.timestamps
    end
  end
end
