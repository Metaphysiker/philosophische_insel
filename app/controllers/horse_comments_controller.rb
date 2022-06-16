class HorseCommentsController < ApplicationController
  before_action :set_horse_comment, only: %i[ show edit update destroy ]

  # GET /horse_comments or /horse_comments.json
  def index
    @horse_comments = HorseComment.all
    render layout: "application_empty"
  end

  # GET /horse_comments/1 or /horse_comments/1.json
  def show
    render layout: "application_empty"
  end

  # GET /horse_comments/new
  def new
    @horse_comment = HorseComment.new
    render layout: "application_empty"
  end

  # GET /horse_comments/1/edit
  def edit
    render layout: "application_empty"
  end

  # POST /horse_comments or /horse_comments.json
  def create
    @horse_comment = HorseComment.new(horse_comment_params)

    respond_to do |format|
      if @horse_comment.save
        format.html { redirect_to horses_url, notice: "Kommentar wurde erstellt." }
        #format.html { redirect_to horse_comment_url(@horse_comment), notice: "Horse comment was successfully created." }
        format.json { render :show, status: :created, location: @horse_comment }
        format.js
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @horse_comment.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /horse_comments/1 or /horse_comments/1.json
  def update
    respond_to do |format|
      if @horse_comment.update(horse_comment_params)
        format.html { redirect_to horses_url, notice: "Kommentar wurde aktualisiert." }
        #format.html { redirect_to horse_comment_url(@horse_comment), notice: "Horse comment was successfully updated." }
        format.json { render :show, status: :ok, location: @horse_comment }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @horse_comment.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /horse_comments/1 or /horse_comments/1.json
  def destroy
    @horse_comment.destroy

    respond_to do |format|
      format.html { redirect_to horses_url, notice: "Kommentar wurde entfernt." }
      format.json { head :no_content }
      format.js
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_horse_comment
      @horse_comment = HorseComment.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def horse_comment_params
      params.require(:horse_comment).permit(:content, :horse_id, :created_at)
    end
end
