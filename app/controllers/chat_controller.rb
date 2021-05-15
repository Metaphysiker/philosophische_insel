class ChatController < ApplicationController
  def chat
    response.headers["X-FRAME-OPTIONS"] = "ALLOWALL"
    render layout: "application_chat"
  end

  def get_next_chat_message
    if params[:id].present?
      @chat_message = ChatMessage.find(params[:id])
    end
  end

  def get_next_chat_button
    if params[:id].present?
      @chat_message = ChatMessage.find(params[:id])
    end
  end

end
