class DonationsController < ApplicationController
  before_action :set_donation, only: %i[ show edit update destroy ]
  after_action :verify_authorized, except: %i[new create]

  skip_before_action :verify_authenticity_token, only: %i[create]

  # GET /donations or /donations.json
  def index
    @donations = Donation.all
    authorize Donation
  end

  # GET /donations/1 or /donations/1.json
  def show
    authorize @donation
  end

  # GET /donations/new
  def new
    @donation = Donation.new
  end

  # GET /donations/1/edit
  def edit
    authorize @donation
  end

  # POST /donations or /donations.json
  def create
    @donation = Donation.new(donation_params)

    respond_to do |format|
      if @donation.save
        format.html { redirect_to @donation, notice: "Donation was successfully created." }
        format.json { render :show, status: :created, location: @donation }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @donation.errors, status: :unprocessable_entity }
      end
    end

  end

  # PATCH/PUT /donations/1 or /donations/1.json
  def update
    authorize @donation

    respond_to do |format|
      if @donation.update(donation_params)
        format.html { redirect_to @donation, notice: "Donation was successfully updated." }
        format.json { render :show, status: :ok, location: @donation }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @donation.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /donations/1 or /donations/1.json
  def destroy
    authorize @donation

    @donation.destroy
    respond_to do |format|
      format.html { redirect_to donations_url, notice: "Donation was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_donation
      @donation = Donation.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def donation_params
      params.require(:donation).permit(:amount, :project, :transaction_id, :donation_project_id, :status, :first_name, :last_name, :email)
    end
end
