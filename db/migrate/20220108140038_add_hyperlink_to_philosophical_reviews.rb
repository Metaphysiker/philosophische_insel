class AddHyperlinkToPhilosophicalReviews < ActiveRecord::Migration[6.1]
  def change
    add_column :philosophy_reviews, :hyperlink, :string, default: ""
  end
end
