class ChatMessage < ApplicationRecord
  has_ancestry

  def self.chatter_options
    ["computer", "user"]
  end
end
