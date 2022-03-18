class Horse < ApplicationRecord
  before_save :set_shoeing_deadline

  validates :shoeing_interval, presence: true
  validates :last_shoeing_date, presence: true
  validates :name, presence: true

  private

  def set_shoeing_deadline
    if self.last_shoeing_date && self.shoeing_interval
      self.shoeing_deadline = self.last_shoeing_date + self.shoeing_interval.weeks
    end
  end
end
