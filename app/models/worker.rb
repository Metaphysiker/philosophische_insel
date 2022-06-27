class Worker < ApplicationRecord
  has_many :worker_workdays
  has_many :workers, :through => :worker_workdays

  def name
    "#{self.first_name} #{self.last_name}"
  end

end
