class CreateMedia < ActiveRecord::Migration[6.1]
  def change
    create_table :media do |t|
      t.string :paper
      t.string :title
      t.text :content
      t.string :hyperlink
      t.date :date

      t.timestamps
    end
  end
end
