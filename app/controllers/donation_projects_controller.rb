class DonationProjectsController < ApplicationController
  before_action :set_donation_project, only: %i[ show edit update destroy bar_chart_data]
  after_action :verify_authorized, except: %i[show index bar_chart_data pferdefutter_data]

  # GET /donation_projects or /donation_projects.json
  def index
    @donation_projects = DonationProject.all
  end

  # GET /donation_projects/1 or /donation_projects/1.json
  def show

  end

  def bar_chart_data
    render json: @donation_project.bar_chart_data
  end

  def pferdefutter_data
    @donation_project = DonationProject.find_by_title("Pferdefutter")
    render json: @donation_project.pferdefutter_data
  end

  # GET /donation_projects/new
  def new
    @donation_project = DonationProject.new
    authorize @donation_project
  end

  # GET /donation_projects/1/edit
  def edit
    authorize @donation_project
  end

  # POST /donation_projects or /donation_projects.json
  def create
    @donation_project = DonationProject.new(donation_project_params)
    authorize @donation_project


    respond_to do |format|
      if @donation_project.save
        format.html { redirect_to @donation_project, notice: "Donation project was successfully created." }
        format.json { render :show, status: :created, location: @donation_project }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @donation_project.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /donation_projects/1 or /donation_projects/1.json
  def update
    authorize @donation_project

    respond_to do |format|

      if @donation_project.update(donation_project_params)
        format.html { redirect_to @donation_project, notice: "Donation project was successfully updated." }
        format.json { render :show, status: :ok, location: @donation_project }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @donation_project.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /donation_projects/1 or /donation_projects/1.json
  def destroy
    authorize @donation_project

    @donation_project.destroy
    respond_to do |format|
      format.html { redirect_to donation_projects_url, notice: "Donation project was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_donation_project
      @donation_project = DonationProject.friendly.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def donation_project_params
      params.require(:donation_project).permit(:title, :description, :amount_needed_total, :amount_already_received, images: [])
    end
end
