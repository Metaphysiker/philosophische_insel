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

  def pferdefutter_data
    #calculate bags, a bag is around 25 francs
    bags = amount_already_received / 25

    # a horse needs 300 bags per year, 25 per month
    months_done = bags / 25

    if months_done >= 0
      months_done = 1
    end

    nodes = []

    (1..months_done).each do |number|
      node = {
              node_id: number,
              month_name: I18n.t("date.month_names")[1],
              got_text: "#{bags} erhalten",
              needed_text: "y noch nötig",
              x: 0,
              y: number,
            }

     nodes.push(node)
    end

    {
      nodes: nodes,
      links: [
        {"source": 1, "target": 2}
      ]
    }
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
