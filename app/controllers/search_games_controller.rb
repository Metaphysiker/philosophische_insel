class SearchGamesController < ApplicationController
  before_action :set_search_game, only: %i[ show edit update destroy ]

  # GET /search_games or /search_games.json
  def index
    @search_games = SearchGame.all
  end

  # GET /search_games/1 or /search_games/1.json
  def show
  end

  # GET /search_games/new
  def new
    @search_game = SearchGame.new
  end

  # GET /search_games/1/edit
  def edit
  end

  # POST /search_games or /search_games.json
  def create
    @search_game = SearchGame.new(search_game_params)

    respond_to do |format|
      if @search_game.save
        format.html { redirect_to search_game_url(@search_game), notice: "Search game was successfully created." }
        format.json { render :show, status: :created, location: @search_game }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @search_game.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /search_games/1 or /search_games/1.json
  def update
    respond_to do |format|
      if @search_game.update(search_game_params)
        format.html { redirect_to search_game_url(@search_game), notice: "Search game was successfully updated." }
        format.json { render :show, status: :ok, location: @search_game }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @search_game.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /search_games/1 or /search_games/1.json
  def destroy
    @search_game.destroy

    respond_to do |format|
      format.html { redirect_to search_games_url, notice: "Search game was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_search_game
      @search_game = SearchGame.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def search_game_params
      params.require(:search_game).permit(:cookie, :category, :identifier)
    end
end
