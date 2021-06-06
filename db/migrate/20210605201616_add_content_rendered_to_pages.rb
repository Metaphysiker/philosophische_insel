class AddContentRenderedToPages < ActiveRecord::Migration[6.1]
  def change
    add_column :pages, :content_rendered, :text, default:  ""
  end
end
