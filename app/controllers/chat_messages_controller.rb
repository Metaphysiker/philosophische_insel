class ChatMessagesController < ApplicationController
  before_action :set_chat_message, only: %i[ show edit update destroy ]
  after_action :verify_authorized

  # GET /chat_messages or /chat_messages.json
  def index
    @chat_messages = ChatMessage.all
  end

  # GET /chat_messages/1 or /chat_messages/1.json
  def show
  end

  # GET /chat_messages/new
  def new
    @chat_message = ChatMessage.new
  end

  # GET /chat_messages/1/edit
  def edit
  end

  # POST /chat_messages or /chat_messages.json
  def create
    @chat_message = ChatMessage.new(chat_message_params)

    respond_to do |format|
      if @chat_message.save
        format.html { redirect_to @chat_message, notice: "Chat message was successfully created." }
        format.json { render :show, status: :created, location: @chat_message }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @chat_message.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /chat_messages/1 or /chat_messages/1.json
  def update
    respond_to do |format|
      if @chat_message.update(chat_message_params)
        format.html { redirect_to @chat_message, notice: "Chat message was successfully updated." }
        format.json { render :show, status: :ok, location: @chat_message }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @chat_message.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /chat_messages/1 or /chat_messages/1.json
  def destroy
    @chat_message.destroy
    respond_to do |format|
      format.html { redirect_to chat_messages_url, notice: "Chat message was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  def visual

    if params[:id].present?
      @chat_message = ChatMessage.find(params[:id])
      if @chat_message.has_parent?
        @chat_message = @chat_message.parent
      end
    else
      @chat_message = ChatMessage.find_by_starting_point("vegan")
    end
    render layout: "application_chat"
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_chat_message
      @chat_message = ChatMessage.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def chat_message_params
      params.require(:chat_message).permit(:content, :chatter, :parent_id, :loading_time, :get_next_time, :starting_point)
    end
end
