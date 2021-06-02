class AddLoadingTimeToChatMessage < ActiveRecord::Migration[6.1]
  def change
    add_column :chat_messages, :loading_time, :integer, default: 1000
    add_column :chat_messages, :get_next_time, :integer, default: 1000
  end
end
