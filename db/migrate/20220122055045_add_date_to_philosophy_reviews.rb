class AddDateToPhilosophyReviews < ActiveRecord::Migration[6.1]
  def change
    add_column :philosophy_reviews, :date, :date
  end
end
