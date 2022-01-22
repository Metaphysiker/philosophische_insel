class StaticPagesController < ApplicationController
  after_action :verify_authorized, except: %i[welcome about essays stinah pferdefutter impressum iframer cockpit cockpit_start google_sheets]

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
  end



  def about
  end

  def essays
  end

  def impressum

  end

  def visits
    authorize :static_pages
  end

  def pferdefutter

    set_meta_tags title: 'Wizard braucht Seniorenfutter',
              description: 'Mit seinen bald 34 Jahren ist Wizard auf Spezialfutter angewiesen. Magst du Futtersackpate werden?',
              keywords: 'Wizard, Wallach, Stinah, Stiftung Tiere in Not Animal Help, Spezialfutter, Futtersack, Spende'

    set_meta_tags og: {
      title: :title,
      description: :description,
      type: "website",
      #image: image_url("wizard3.jpeg"),
      url: pferdefutter_url
    }

    @donation_project = DonationProject.find_by_title("Wizard braucht etwas zum Mampfen!")
    render layout: "application_blank"

  end

  def image_url(source)
    URI.join(root_url, ActionController::Base.helpers.image_url("wizard3.jpeg"))
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
    render layout: "application_empty"
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
