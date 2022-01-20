class CreateMediaReleases < ActiveRecord::Migration[6.1]
  def change
    create_table :media_releases do |t|
      t.date :date
      t.string :title, default: ""
      t.text :content, default: ""

      t.timestamps
    end
  end
end
