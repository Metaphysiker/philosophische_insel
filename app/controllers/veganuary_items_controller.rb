class VeganuaryItemsController < ApplicationController
  before_action :set_veganuary_item, only: %i[ show edit update destroy ]
  skip_before_action :verify_authenticity_token


  # GET /veganuary_items or /veganuary_items.json
  def index
    response.headers["X-FRAME-OPTIONS"] = "ALLOW-FROM https://vegan.ch/"

    authorize(VeganuaryItem)
    @veganuary_items = VeganuaryItem.where(published: "true")
    render layout: "application_empty"

  end

  # GET /veganuary_items/1 or /veganuary_items/1.json
  def show
    response.headers["X-FRAME-OPTIONS"] = "ALLOW-FROM https://vegan.ch/"

    authorize @veganuary_item
    render layout: "application_empty"

  end

  # GET /veganuary_items/new
  def new
    @veganuary_item = VeganuaryItem.new(
      company_name: "Lorem Ipsum",
      category: "restaurant",
      company_description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum...",
      url: "https://www.unternehmen-webseite.ch",
      offer: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum...",
      addresses: "Marktküche, Feldstrasse 98, 8004 Zürich"
    )
    authorize @veganuary_item
    render layout: "application_empty"
  end

  def new_veganuary_item

    response.headers["X-FRAME-OPTIONS"] = "ALLOW-FROM https://vegan.ch/"


    random_id = rand(10000000000...100000000000)

    while VeganuaryItem.where(id: random_id).present?
      random_id = rand(10000000000...100000000000)
    end

    @veganuary_item = VeganuaryItem.create(
      id: random_id,
      company_name: "Lorem Ipsum",
      category: "restaurant",
      company_description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum...",
      url: "https://www.unternehmen-webseite.ch",
      offer: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum...",
      addresses: "Marktküche, Feldstrasse 98, 8004 Zürich"
    )
    authorize @veganuary_item

    redirect_to veganuary_item_path(@veganuary_item)
  end

  # GET /veganuary_items/1/edit
  def edit
    response.headers["X-FRAME-OPTIONS"] = "ALLOW-FROM https://vegan.ch/"

    authorize @veganuary_item

  end

  # POST /veganuary_items or /veganuary_items.json
  def create
    response.headers["X-FRAME-OPTIONS"] = "ALLOW-FROM https://vegan.ch/"

    @veganuary_item = VeganuaryItem.new(veganuary_item_params)
    authorize @veganuary_item

    respond_to do |format|
      if @veganuary_item.save
        format.html { redirect_to veganuary_item_url(@veganuary_item), notice: "Eintrag wurde erstellt" }
        format.json { render :show, status: :created, location: @veganuary_item }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @veganuary_item.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /veganuary_items/1 or /veganuary_items/1.json
  def update
    response.headers["X-FRAME-OPTIONS"] = "ALLOW-FROM https://vegan.ch/"

    authorize @veganuary_item

    if params[:save_and_close].present?
      @veganuary_item.published = "true"
    end

    respond_to do |format|
      if @veganuary_item.update(veganuary_item_params)
        format.html { redirect_to veganuary_item_url(@veganuary_item), notice: "Eintrag wurde aktualisiert." }
        format.json { render :show, status: :ok, location: @veganuary_item }
        format.js
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @veganuary_item.errors, status: :unprocessable_entity }
        format.js
      end
    end
  end

  # DELETE /veganuary_items/1 or /veganuary_items/1.json
  def destroy
    authorize @veganuary_item

    @veganuary_item.destroy

    respond_to do |format|
      format.html { redirect_to veganuary_items_url, notice: "Veganuary item was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  def search_veganuary_items
    response.headers["X-FRAME-OPTIONS"] = "ALLOW-FROM https://vegan.ch/"

    authorize VeganuaryItem

    @veganuary_items = VeganuaryItem.where(published: "true")

    if params[:search_input][:category].present?
      @veganuary_items = @veganuary_items.where(category: params[:search_input][:category])
    end

    if params[:search_input][:canton].present?
      @veganuary_items = @veganuary_items.ilike_cantons(params[:search_input][:canton])
    end


    respond_to do |format|
      format.js
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_veganuary_item
      @veganuary_item = VeganuaryItem.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def veganuary_item_params
      params.require(:veganuary_item).permit(:company_name, :company_description, :url, :offer, :addresses, :company_logo, :category, :offer_images1, :offer_images2, :offer_images3, :comment)
    end
end
