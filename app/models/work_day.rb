class WorkDay < ApplicationRecord
  has_many :worker_workdays
  has_many :workers, :through => :worker_workdays
end
