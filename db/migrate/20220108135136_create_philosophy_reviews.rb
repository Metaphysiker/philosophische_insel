class CreatePhilosophyReviews < ActiveRecord::Migration[6.1]
  def change
    create_table :philosophy_reviews do |t|
      t.string :title, default: ""
      t.string :name_of_paper, default: ""
      t.text :abstract, default: ""

      t.timestamps
    end
  end
end
