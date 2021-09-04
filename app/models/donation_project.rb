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

  def goal_achieved?
    self.amount_needed_total <= self.amount_already_received
  end

  def bar_chart_data
    amount_still_needed = amount_needed_total - amount_already_received
    amount_still_needed = 0 if amount_still_needed < 0

    [
      {
        name: "bereits erhalten",
        value: amount_already_received,
        color: "#00A36C"
      },
      {
        name: "wird noch benötigt",
        value: amount_still_needed,
        color: "#FF4500"
      },
      {
        name: "total",
        value: amount_needed_total,
        color: "steelblue"
      }
    ]
  end
end
