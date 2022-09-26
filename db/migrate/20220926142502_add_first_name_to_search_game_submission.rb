class AddFirstNameToSearchGameSubmission < ActiveRecord::Migration[6.1]
  def change
    add_column :search_game_submissions, :first_name, :string
  end
end
