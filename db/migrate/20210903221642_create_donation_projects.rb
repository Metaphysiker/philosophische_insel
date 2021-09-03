class CreateDonationProjects < ActiveRecord::Migration[6.1]
  def change
    create_table :donation_projects do |t|
      t.string :title
      t.text :description
      t.decimal :amount_needed_total
      t.decimal :amount_already_received

      t.timestamps
    end
  end
end
