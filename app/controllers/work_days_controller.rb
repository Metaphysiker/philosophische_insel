class WorkDaysController < ApplicationController
  before_action :set_work_day, only: %i[ show edit update destroy ]

  def generate_work_plan
    date_range = Date.today.beginning_of_month..Date.today.end_of_month

    WorkDay.delete_all

    date_range.each do |day|
      work_day =  WorkDay.create(date: day)

      work_day.workers << Worker.find(Worker.pluck(:id).sample)
      work_day.workers << Worker.find(Worker.pluck(:id).sample)
    end

    redirect_to "http://localhost:3000/static_pages/work_plan"

  end

  def check_if_worker_is_on_weekend(worker, date)

  end

  def check_if_worker_has_hours(worker, date)
    #date_range = date
    #worker.work_days.where(date: )
    #WorkDay.where()
  end

  # GET /work_days or /work_days.json
  def index
    @work_days = WorkDay.all
  end

  # GET /work_days/1 or /work_days/1.json
  def show
  end

  # GET /work_days/new
  def new
    @work_day = WorkDay.new
  end

  # GET /work_days/1/edit
  def edit
  end

  # POST /work_days or /work_days.json
  def create
    @work_day = WorkDay.new(work_day_params)

    respond_to do |format|
      if @work_day.save
        format.html { redirect_to work_day_url(@work_day), notice: "Work day was successfully created." }
        format.json { render :show, status: :created, location: @work_day }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @work_day.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /work_days/1 or /work_days/1.json
  def update
    respond_to do |format|
      if @work_day.update(work_day_params)
        format.html { redirect_to work_day_url(@work_day), notice: "Work day was successfully updated." }
        format.json { render :show, status: :ok, location: @work_day }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @work_day.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /work_days/1 or /work_days/1.json
  def destroy
    @work_day.destroy

    respond_to do |format|
      format.html { redirect_to work_days_url, notice: "Work day was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_work_day
      @work_day = WorkDay.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def work_day_params
      params.require(:work_day).permit(:date)
    end
end
