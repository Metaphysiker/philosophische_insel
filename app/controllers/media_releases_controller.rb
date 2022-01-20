class MediaReleasesController < ApplicationController
  before_action :set_media_release, only: %i[ show edit update destroy ]

  # GET /media_releases or /media_releases.json
  def index
    @media_releases = MediaRelease.all
  end

  # GET /media_releases/1 or /media_releases/1.json
  def show
  end

  # GET /media_releases/new
  def new
    @media_release = MediaRelease.new
  end

  # GET /media_releases/1/edit
  def edit
  end

  # POST /media_releases or /media_releases.json
  def create
    @media_release = MediaRelease.new(media_release_params)

    respond_to do |format|
      if @media_release.save
        format.html { redirect_to @media_release, notice: "Media release was successfully created." }
        format.json { render :show, status: :created, location: @media_release }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @media_release.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /media_releases/1 or /media_releases/1.json
  def update
    respond_to do |format|
      if @media_release.update(media_release_params)
        format.html { redirect_to @media_release, notice: "Media release was successfully updated." }
        format.json { render :show, status: :ok, location: @media_release }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @media_release.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /media_releases/1 or /media_releases/1.json
  def destroy
    @media_release.destroy
    respond_to do |format|
      format.html { redirect_to media_releases_url, notice: "Media release was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_media_release
      @media_release = MediaRelease.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def media_release_params
      params.require(:media_release).permit(:date, :title, :content, :hyperlink)
    end
end
