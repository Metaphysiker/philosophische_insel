class DonationProject < ApplicationRecord
  has_many :donations
  extend FriendlyId
  friendly_id :title, use: :slugged
  has_many_attached :images

  def amount_already_received
    amount = 0.0
    self.donations.each do |donation|
      amount = amount + donation.amount
    end
    amount
  end

  def into_json
    {
      id: self.id,
      title: self.title,
      description: self.description,
      amount_needed_total: self.amount_needed_total,
      amount_already_received: self.amount_already_received
    }.to_json
  end
end
