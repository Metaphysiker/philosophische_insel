require 'csv'

class StaticPagesController < ApplicationController
  after_action :verify_authorized, except: %i[welcome about essays stinah pferdefutter impressum iframer cockpit cockpit_start google_sheets donation_buttons compare_lists swiss_vegan_awards_jury_query claudia_login work_plan download_public_file]

  if Rails.env.development?
    require 'rmagick'
    include Magick

    def rmagick
      source_image = Image.read("#{Rails.root}/app/assets/images/philosophie/184_philo.jpg").first
      thumbnail_image = thumb(source_image, '300x300', 8)
      thumbnail_image.write("#{Rails.root}/app/assets/images/philosophie/bagsyx.png")
    end
  end

  def welcome
    set_meta_tags title: 'Die philosophische Insel',
              description: 'Auf der philosophischen Insel findest du Inhalte, Spiele und Werkzeuge, die Philosophie und Ethik vermitteln.',
              keywords: 'Philosophie, Ethik, Veganismus'

    set_meta_tags og: {
      title: :title,
      description: :description,
      type: "website",
      image: ActionController::Base.helpers.image_url("philosophische-insel-logo-cut.webp"),
      url: root_url
    }
  end

  def claudia_dashboard
    authorize :static_pages
    render layout: "application_empty"
  end

  def download_public_file
    send_file("#{Rails.root}/public/#{params[:location]}")
  end

  def serial_letter
    authorize :static_pages
    render layout: "application_empty"

  end

  def serial_letter_upload_csv

    authorize :static_pages

    file = params[:csv]
    template = params[:template]

    csv = CSV.new(File.read(file), :headers => true, :header_converters => :symbol, :converters => :all)
    #csv = csv.encode("UTF-8")
    csv = csv.to_a.map {|row| row.to_hash }
    puts "INSPECT!"
    puts csv.inspect

    report = ODFReport::Report.new("odts/" + template + ".odt") do |r|

        r.add_section("ROW", csv) do |row|
          #row.add_field (:first_name) { |row| row[:first_name]}
          row.add_field (:first_name) { |row| row[:first_name]}
          row.add_field (:last_name) { |row| row[:last_name]}
          row.add_field (:street) { |row| row[:street]}
          row.add_field (:plz) { |row| row[:plz]}
          row.add_field (:location) { |row| row[:location]}
          row.add_field (:donation) { |row| sprintf('%.2f', row[:donation]) }

        end

    end

    file = File.new(Rails.root.join('odts', 'saved', template + ".odt"), "w+", encoding: 'ascii-8bit')
    file.write(report.generate)
    file.rewind
    file.close

    Libreconv.convert(Rails.root.join('odts', 'saved', template + ".odt"), Rails.root.join('odts', 'pdfs', template + ".pdf"))

      send_file Rails.root.join('odts', 'pdfs', template + ".pdf"),
                type: 'application/pdf',
                disposition: 'attachment',
                filename: "#{template}-#{I18n.l(DateTime.now).parameterize}.pdf"


  end

  def about

    set_meta_tags title: 'Sandro R??ss',
              description: 'Sandro R??ss ist ein Frontend-Entwickler, Philosoph und Aktivist.',
              keywords: 'Sandro R??ss'

    set_meta_tags og: {
      title: :title,
      description: :description,
      type: "website",
      image: ActionController::Base.helpers.image_url("raess-sandro-standing1.webp"),
      url: root_url
    }

  end

  def essays
  end

  def claudia_login
    render layout: "application_empty"
  end

  def work_plan
    render layout: "application_empty"
  end

  def compare_lists

  end

  def impressum

  end

  def swiss_vegan_awards_jury_query
    render layout: "application_jury"
  end

  def visits
    authorize :static_pages
  end

  def pferdefutter

    set_meta_tags title: 'Wizard braucht Seniorenfutter. Magst du helfen?',
              description: 'Mit seinen bald 34 Jahren ist Wizard auf Spezialfutter angewiesen. Magst du Futtersackpate werden? Mach eine Spende und erm??gliche Wizard ein gl??ckliches Leben!',
              keywords: 'Wizard, Wallach, Stinah, Stiftung Tiere in Not Animal Help, Spezialfutter, Futtersack, Spende'

    set_meta_tags og: {
      title: :title,
      description: :description,
      type: "website",
      image: ActionController::Base.helpers.image_url("wizardstanding.webp"),
      url: pferdefutter_url
    }

    @donation_project = DonationProject.find_by_title("Wizard braucht etwas zum Mampfen!")
    render layout: "application_blank"

  end

  def image_url(name)
    URI.join(root_url, ActionController::Base.helpers.image_url(name))
  end

  def iframer
    render layout: "application_empty"
  end

  def cockpit_start
    render layout: "application_empty"
  end

  def cockpit
    @request = {dateRanges: []}
    @start_date = Date.new(2021, 01)
    @end_date = Date.today

    first_day_of_month_array = (@start_date..@end_date).select {|d| d.day == 1}
    last_day_of_month_array = (@start_date..@end_date).select {|d| d.day == 1}.map {|d| d - 1}.drop(1)

    first_day_of_month_array.each  do |first_day_of_month|
      @request[:dateRanges].push({startDate: first_day_of_month, endDate: first_day_of_month.end_of_month})
    end

    #@request = @request.to_json

    render layout: "application_google_analytics"
  end

  def google_sheets
    render layout: "application_blank"
  end

  def donation_buttons
    if params.dig(:donation_buttons, :pitch).present?
      @pitch = params.dig(:donation_buttons, :pitch)
    else
      @pitch = "Hat dir dieser Beitrag gefallen? M??chtest du mehr ??ber die vegane Lebensweise erfahren? Dann bist du bei der Veganen Gesellschaft Schweiz goldrichtig! Denn die Vegane Gesellschaft Schweiz hat es sich zum Ziel gesetzt, die vegane Lebensweise im Alltag zu erleichtern."
    end

    if params.dig(:donation_buttons, :cta).present?.present?
      @cta = params.dig(:donation_buttons, :cta)
    else
      @cta = "Werde Mitglied und erhalte unser begehrtes Willkommens-Paket mit vielen leckeren veganen Goodies! Greif zu!"
    end
    render layout: "application_blank"

  end


  private

  def thumb(source_image, geometry_string, radius = 10)
    source_image.change_geometry(geometry_string) do |cols, rows, img|

      # Make a resized copy of the image
      thumb = img.resize(cols, rows)

      # Set a transparent background: pixels that are transparent will be
      # discarded from the source image.
      mask = Image.new(cols, rows) {self.background_color = 'transparent'}

      # Create a white rectangle with rounded corners. This will become the
      # mask for the area you want to retain in the original image.
      Draw.new.stroke('none').stroke_width(0).fill('white').
          circle(cols/2, rows/2, cols/2, 1).
          draw(mask)

      #Draw.new.stroke('none').stroke_width(0).fill('white').
      #    roundrectangle(0, 0, cols, rows, radius, radius).
      #    draw(mask)

      # Apply the mask and write it out
      thumb.composite!(mask, 0, 0, Magick::CopyAlphaCompositeOp)
      thumb
    end
  end


end
