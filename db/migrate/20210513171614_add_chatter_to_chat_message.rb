class AddChatterToChatMessage < ActiveRecord::Migration[6.1]
  def change
    add_column :chat_messages, :chatter, :string, default: "computer"
  end
end
