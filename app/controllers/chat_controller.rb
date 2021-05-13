class ChatController < ApplicationController
  def chat
    response.headers["X-FRAME-OPTIONS"] = "ALLOWALL"
    render layout: "application_chat"
  end

  def select_option
    if params[:id].present?
      @chat_message = ChatMessage.find(params[:id])
    end
  end
end
