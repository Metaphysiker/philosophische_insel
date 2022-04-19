class HorsesController < ApplicationController
  before_action :set_horse, only: %i[ show edit update destroy shoeing_happened_today]
  after_action :verify_authorized

  def shoeing_happened_today
    authorize @horse
    @horse.update(last_shoeing_date: Date.today, next_shoeing_date: nil)
    redirect_to horses_path, notice: "Datum wurde aktualisiert!"
  end

  # GET /horses or /horses.json
  def index
    authorize Horse
    @horses = Horse.all
    render layout: "application_empty"

  end

  # GET /horses/1 or /horses/1.json
  def show
    authorize @horse
    render layout: "application_empty"
  end

  # GET /horses/new
  def new
    @horse = Horse.new
    authorize @horse
    @horse.shoeing_interval = 10
    render layout: "application_empty"
  end

  # GET /horses/1/edit
  def edit
    authorize @horse
    render layout: "application_empty"
  end

  # POST /horses or /horses.json
  def create
    @horse = Horse.new(horse_params)
    authorize @horse

    respond_to do |format|
      if @horse.save
        format.html { redirect_to horses_url, notice: "Pferd wurde erstellt." }
        format.json { render :show, status: :created, location: @horse }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @horse.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /horses/1 or /horses/1.json
  def update
    authorize @horse
    respond_to do |format|
      if @horse.update(horse_params)
        format.html { redirect_to horses_url, notice: "Pferd wurde aktualisiert." }
        format.json { render :show, status: :ok, location: @horse }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @horse.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /horses/1 or /horses/1.json
  def destroy
    authorize @horse
    @horse.destroy
    respond_to do |format|
      format.html { redirect_to horses_url, notice: "Pferd wurde entfernt." }
      format.json { head :no_content }
    end
  end

  def get_odt_of_horses
    authorize Horse
    report = ODFReport::Report.new("odts/horses.odt") do |r|

      @horses = Horse.all.order(:shoeing_deadline)

        r.add_section("HORSES", @horses) do |horse|
          horse.add_field :name, :name
          horse.add_field (:shoeing_deadline) { |horse| horse.shoeing_deadline.strftime("%d.%m.%Y")}
          horse.add_field (:shoeing_deadline_in_weeks) { |horse| ((horse.shoeing_deadline - Date.today).to_f / 7).truncate(1) }
          horse.add_field (:last_shoeing_date) { |horse| horse.last_shoeing_date.strftime("%d.%m.%Y") }
          horse.add_field :comment, :comment
        end

    end

      send_data report.generate,
                type: 'application/vnd.oasis.opendocument.text',
                disposition: 'attachment',
                filename: "hufbeschlagung-#{I18n.l(DateTime.now).parameterize}.odt"

  end

    def get_pdf_of_horses
      authorize Horse
      report = ODFReport::Report.new("odts/horses.odt") do |r|

        @horses = Horse.all.order(:shoeing_deadline)

          r.add_section("HORSES", @horses) do |horse|
            horse.add_field :name, :name
            horse.add_field (:shoeing_deadline) { |horse| horse.shoeing_deadline.strftime("%d.%m.%Y")}
            horse.add_field (:shoeing_deadline_in_weeks) { |horse| ((horse.shoeing_deadline - Date.today).to_f / 7).truncate(1) }
            horse.add_field (:last_shoeing_date) { |horse| horse.last_shoeing_date.strftime("%d.%m.%Y") }
            horse.add_field :comment, :comment
          end

      end

      file = File.new(Rails.root.join('odts', 'saved', "horses.odt"), "w+", encoding: 'ascii-8bit')
      file.write(report.generate)
      file.rewind
      file.close

      Libreconv.convert(Rails.root.join('odts', 'saved', "horses.odt"), Rails.root.join('odts', 'pdfs', "horses.pdf"))

        send_file Rails.root.join('odts', 'pdfs', "horses.pdf"),
                  type: 'application/pdf',
                  disposition: 'attachment',
                  filename: "hufbeschlagung-#{I18n.l(DateTime.now).parameterize}.pdf"

    end


    def get_word_of_horses
      authorize Horse
      report = ODFReport::Report.new("odts/horses.odt") do |r|

        @horses = Horse.all.order(:shoeing_deadline)

          r.add_section("HORSES", @horses) do |horse|
            horse.add_field :name, :name
            horse.add_field (:shoeing_deadline) { |horse| horse.shoeing_deadline.strftime("%d.%m.%Y")}
            horse.add_field (:shoeing_deadline_in_weeks) { |horse| ((horse.shoeing_deadline - Date.today).to_f / 7).truncate(1) }
            horse.add_field (:last_shoeing_date) { |horse| horse.last_shoeing_date.strftime("%d.%m.%Y") }
            horse.add_field :comment, :comment
          end

      end

      file = File.new(Rails.root.join('odts', 'saved', "horses.odt"), "w+", encoding: 'ascii-8bit')
      file.write(report.generate)
      file.rewind
      file.close

      Libreconv.convert(Rails.root.join('odts', 'saved', "horses.odt"), Rails.root.join('odts', 'words', "horses.docx"))

      send_file Rails.root.join('odts', 'words', "horses.docx"),
                type: 'application/ vnd.openxmlformats-officedocument. wordprocessingml.document',
                disposition: 'attachment',
                filename: "hufbeschlagung-#{I18n.l(DateTime.now).parameterize}.docx"

    end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_horse
      @horse = Horse.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def horse_params
      params.require(:horse).permit(:name, :next_shoeing_date, :comment, :shoeing_interval, :last_shoeing_date, :shoeing_deadline)
    end
end
