class AddHyperlinkToMediaReleases < ActiveRecord::Migration[6.1]
  def change
    add_column :media_releases, :hyperlink, :string, default: ""
  end
end
