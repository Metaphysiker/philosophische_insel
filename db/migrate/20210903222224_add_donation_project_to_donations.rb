class AddDonationProjectToDonations < ActiveRecord::Migration[6.1]
  def change
    add_reference :donations, :donation_project, foreign_key: true
  end
end
