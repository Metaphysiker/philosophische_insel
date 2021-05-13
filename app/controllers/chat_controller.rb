class ChatController < ApplicationController
  def chat
    response.headers["X-FRAME-OPTIONS"] = "ALLOWALL"
    render layout: "application_chat"
  end
end
