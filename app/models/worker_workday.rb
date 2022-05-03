class WorkerWorkday < ApplicationRecord
  belongs_to :worker
  belongs_to :work_day
end
