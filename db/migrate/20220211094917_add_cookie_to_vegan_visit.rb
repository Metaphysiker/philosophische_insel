class AddCookieToVeganVisit < ActiveRecord::Migration[6.1]
  def change
    add_column :vegan_visits, :cookie, :string, default: ""
  end
end
