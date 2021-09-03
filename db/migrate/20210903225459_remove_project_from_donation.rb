class RemoveProjectFromDonation < ActiveRecord::Migration[6.1]
  def change
    remove_column :donations, :project
    remove_column :donation_projects, :amount_already_received
  end
end
