class VeganVisitsController < ApplicationController
  before_action :set_vegan_visit, only: %i[ show edit update destroy ]

  # GET /vegan_visits or /vegan_visits.json
  def index
    @vegan_visits = VeganVisit.all
  end

  # GET /vegan_visits/1 or /vegan_visits/1.json
  def show
  end

  # GET /vegan_visits/new
  def new
    @vegan_visit = VeganVisit.new
  end

  # GET /vegan_visits/1/edit
  def edit
  end

  # POST /vegan_visits or /vegan_visits.json
  def create
    @vegan_visit = VeganVisit.new(vegan_visit_params)

    respond_to do |format|
      if @vegan_visit.save
        format.html { redirect_to @vegan_visit, notice: "Vegan visit was successfully created." }
        format.json { render :show, status: :created, location: @vegan_visit }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @vegan_visit.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /vegan_visits/1 or /vegan_visits/1.json
  def update
    respond_to do |format|
      if @vegan_visit.update(vegan_visit_params)
        format.html { redirect_to @vegan_visit, notice: "Vegan visit was successfully updated." }
        format.json { render :show, status: :ok, location: @vegan_visit }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @vegan_visit.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /vegan_visits/1 or /vegan_visits/1.json
  def destroy
    @vegan_visit.destroy
    respond_to do |format|
      format.html { redirect_to vegan_visits_url, notice: "Vegan visit was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_vegan_visit
      @vegan_visit = VeganVisit.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def vegan_visit_params
      params.require(:vegan_visit).permit(:url, :fullpath)
    end
end