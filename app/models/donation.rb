class Donation < ApplicationRecord
  belongs_to :donation_project
  validates :transaction_id, uniqueness: true
end
