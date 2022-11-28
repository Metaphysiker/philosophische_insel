class CreateVeganuaryItems < ActiveRecord::Migration[6.1]
  def change
    create_table :veganuary_items do |t|
      t.string :company_name, default: ""
      t.text :company_description, default: ""
      t.string :url, default: ""
      t.text :offer, default: ""
      t.text :addresses, default: ""

      t.timestamps
    end
  end
end
