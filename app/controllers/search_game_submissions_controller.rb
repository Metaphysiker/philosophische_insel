class SearchGameSubmissionsController < ApplicationController
  before_action :set_search_game_submission, only: %i[ show edit update destroy ]

  # GET /search_game_submissions or /search_game_submissions.json
  def index
    @search_game_submissions = SearchGameSubmission.all
  end

  # GET /search_game_submissions/1 or /search_game_submissions/1.json
  def show
  end

  # GET /search_game_submissions/new
  def new
    @search_game_submission = SearchGameSubmission.new
  end

  # GET /search_game_submissions/1/edit
  def edit
  end

  # POST /search_game_submissions or /search_game_submissions.json
  def create
    response.headers['Access-Control-Allow-Origin'] = request.headers['Origin'] || 'https://vegan.ch/' # the domain you're making the request from

    @search_game_submission = SearchGameSubmission.new(search_game_submission_params)

    respond_to do |format|
      if @search_game_submission.save
        format.html { redirect_to search_game_submission_url(@search_game_submission), notice: "Search game submission was successfully created." }
        format.js
        format.json { render :show, status: :created, location: @search_game_submission }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @search_game_submission.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /search_game_submissions/1 or /search_game_submissions/1.json
  def update
    respond_to do |format|
      if @search_game_submission.update(search_game_submission_params)
        format.html { redirect_to search_game_submission_url(@search_game_submission), notice: "Search game submission was successfully updated." }
        format.json { render :show, status: :ok, location: @search_game_submission }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @search_game_submission.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /search_game_submissions/1 or /search_game_submissions/1.json
  def destroy
    @search_game_submission.destroy

    respond_to do |format|
      format.html { redirect_to search_game_submissions_url, notice: "Search game submission was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_search_game_submission
      @search_game_submission = SearchGameSubmission.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def search_game_submission_params
      params.require(:search_game_submission).permit(:email, :subscribe_to_newsletter, :first_name)
    end
end
