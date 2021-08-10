class PagesController < ApplicationController
  before_action :set_page, only: %i[ show edit update destroy ]
  after_action :verify_authorized, except: %i[index show]

  # GET /pages or /pages.json
  def index
    @pages = Page.all
  end

  # GET /pages/1 or /pages/1.json
  def show
  end

  # GET /pages/new
  def new
    @page = Page.new
    authorize @page
  end

  # GET /pages/1/edit
  def edit
    authorize @page
  end

  # POST /pages or /pages.json
  def create
    @page = Page.new(page_params)
    authorize @page

    respond_to do |format|
      if @page.save
        format.html { redirect_to @page, notice: "Page was successfully created." }
        format.json { render :show, status: :created, location: @page }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @page.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /pages/1 or /pages/1.json
  def update
    authorize @page
    respond_to do |format|
      if @page.update(page_params)
        format.html { redirect_to @page, notice: "Page was successfully updated." }
        format.json { render :show, status: :ok, location: @page }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @page.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /pages/1 or /pages/1.json
  def destroy
    authorize @page
    @page.destroy
    respond_to do |format|
      format.html { redirect_to pages_url, notice: "Page was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_page
      @page = Page.friendly.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def page_params
      params.require(:page).permit(:title, :description, :content, :cover, :slug, :order)
    end
end
