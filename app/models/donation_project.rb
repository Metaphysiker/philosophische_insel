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
    cost_of_a_bag = 25 #francs
    bags_needed_per_month = 25
    total_number_of_received_bags = (amount_already_received / cost_of_a_bag).to_i

    # a horse needs 300 bags per year, 25 per month
    months_done = total_number_of_received_bags / bags_needed_per_month


    puts "months_done: #{months_done}"

    nodes = []
    lines = []

    (1..(months_done + 1)).each do |number|

      if total_number_of_received_bags >= (number * bags_needed_per_month)
        bags_received_in_this_month = bags_needed_per_month
        html_content = html_for_successful_funded_months(I18n.t("date.month_names")[number % 12], bags_needed_per_month)
      else
        bags_received_in_this_month = total_number_of_received_bags - ((number - 1) * bags_needed_per_month)
        html_content = html_for_to_be_funded_months(I18n.t("date.month_names")[number % 12], bags_received_in_this_month, bags_needed_per_month)
      end

      node = {
              node_id: number,
              month_name: I18n.t("date.month_names")[number % 12],
              html_content: html_content,
              got_text: "#{bags_received_in_this_month} Futtersäcke erhalten!",
              needed_text: "#{bags_needed_per_month - bags_received_in_this_month} noch nötig",
              x: 0,
              y: number-1,
            }

     nodes.push(node)

     if number > 1
       lines.push({"source": number-1, "target": number})
     end

    end

    extra_node = {
            node_id: nodes.length + 1,
            month_name: "",
            html_content: "",
            got_text: "",
            needed_text: "",
            x: 0,
            y: nodes.length,
          }
    nodes.push(extra_node)
    lines.push({"source": nodes.length - 1, "target": nodes.length})

    {
      nodes: nodes,
      links: lines
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

  def html_for_successful_funded_months(month_name, bags_needed_per_month)

    str = <<-HEREDOC
    <div class="border border-success border-3 card text-dark bg-light mb-3">
      <div class="card-header">
        #{month_name} <i class="bi bi-check-lg"></i>
      </div>
      <div class="card-body">
        <p class="card-text">#{bags_needed_per_month} bereits Säcke erhalten</p>
        <p class="card-text">Wizard sagt Danke!</p>

      </div>
    </div>
      HEREDOC
      return str
  end

  def html_for_to_be_funded_months(month_name, bags_received, bags_needed_per_month)

    str = <<-HEREDOC
<div class="card text-dark bg-light mb-3">
  <div class="card-header">
    #{month_name}
  </div>
  <div class="card-body">
    <p class="card-text">#{bags_received} bereits Säcke erhalten</p>
    <p class="card-text">#{bags_needed_per_month - bags_received} werden noch benötigt</p>
    <p class="card-text">Möchtest du einen Sack beitragen? <i class="bi bi-arrow-down"></i></p>
  </div>
</div>
      HEREDOC
      return str
  end

end
