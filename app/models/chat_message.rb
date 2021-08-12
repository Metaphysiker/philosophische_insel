class ChatMessage < ApplicationRecord
  has_ancestry

  def self.chatter_options
    ["computer", "user"]
  end

  def to_node2(n)
    if n > 6
      last_node = {
            "name" => ActionController::Base.helpers.strip_tags(self.content.to_s),
            "id_of_message" => self.id,
            "chatter" =>self.chatter
          }
      return last_node
    end

    n = n + 1

    #target_message = ChatMessage.where(id: self.target_message_id).map { |c| c.to_node2(n) }
    children = self.children.map { |c| c.to_node2(n) }

    #both = target_message + children

    { "name" => ActionController::Base.helpers.strip_tags(self.content.to_s),
      "id_of_message" => self.id,
      "chatter" =>self.chatter,
      "children" => children
      #{}"children"   => self.children.map { |c| c.to_node }
    }

  end


end
