class WorkerWorkdaysController < ApplicationController
  before_action :set_worker_workday, only: %i[ show edit update destroy ]

  # GET /worker_workdays or /worker_workdays.json
  def index
    @worker_workdays = WorkerWorkday.all
  end

  # GET /worker_workdays/1 or /worker_workdays/1.json
  def show
  end

  # GET /worker_workdays/new
  def new
    @worker_workday = WorkerWorkday.new
  end

  # GET /worker_workdays/1/edit
  def edit
  end

  # POST /worker_workdays or /worker_workdays.json
  def create
    @worker_workday = WorkerWorkday.new(worker_workday_params)

    respond_to do |format|
      if @worker_workday.save
        format.html { redirect_to worker_workday_url(@worker_workday), notice: "Worker workday was successfully created." }
        format.json { render :show, status: :created, location: @worker_workday }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @worker_workday.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /worker_workdays/1 or /worker_workdays/1.json
  def update
    respond_to do |format|
      if @worker_workday.update(worker_workday_params)
        format.html { redirect_to worker_workday_url(@worker_workday), notice: "Worker workday was successfully updated." }
        format.json { render :show, status: :ok, location: @worker_workday }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @worker_workday.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /worker_workdays/1 or /worker_workdays/1.json
  def destroy
    @worker_workday.destroy

    respond_to do |format|
      format.html { redirect_to worker_workdays_url, notice: "Worker workday was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_worker_workday
      @worker_workday = WorkerWorkday.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def worker_workday_params
      params.fetch(:worker_workday, {})
    end
end
