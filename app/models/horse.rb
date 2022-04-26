class Horse < ApplicationRecord
  before_save :set_shoeing_deadline
  has_many :horse_comments

  validates :shoeing_interval, presence: true
  validates :last_shoeing_date, presence: true
  validates :name, presence: true

  def horse_comments_reverse_order
    horse_comments.order(:created_at).reverse_order
  end

  private

  def set_shoeing_deadline
    if self.last_shoeing_date && self.shoeing_interval
      self.shoeing_deadline = self.last_shoeing_date + self.shoeing_interval.weeks
    end
  end
end
