class AddSlugToDonationProject < ActiveRecord::Migration[6.1]
  def change
    add_column :donation_projects, :slug, :string
    add_index :donation_projects, :slug, unique: true
  end
end
