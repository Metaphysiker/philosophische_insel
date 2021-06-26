class AddStartingPointToChatMessage < ActiveRecord::Migration[6.1]
  def change
    add_column :chat_messages, :starting_point, :string, default:  ""
  end
end
