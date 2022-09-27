class AddCookieToSearchGameSubmissions < ActiveRecord::Migration[6.1]
  def change
    add_column :search_game_submissions, :cookie, :string, default: ""
  end
end
