class CreatePages < ActiveRecord::Migration[6.1]
  def change
    create_table :pages do |t|
      t.string :title, default: ""
      t.text :description, default: ""
      t.text :content, default: ""

      t.timestamps
    end
  end
end
