class VeganuaryItemsController < ApplicationController
  before_action :set_veganuary_item, only: %i[ show edit update destroy edit_for_user update_for_user]
  skip_before_action :verify_authenticity_token


  # GET /veganuary_items or /veganuary_items.json
  def index
    response.headers["X-FRAME-OPTIONS"] = "ALLOW-FROM https://vegan.ch/"

    authorize(VeganuaryItem)
    @veganuary_items = VeganuaryItem.where(published: "true", checked: "true")
    render layout: "application_empty"

  end

  # GET /veganuary_items/1 or /veganuary_items/1.json
  def show
    response.headers["X-FRAME-OPTIONS"] = "ALLOW-FROM https://vegan.ch/"

    authorize @veganuary_item
    render layout: "application_empty"

  end

  def all_items
    @veganuary_items = VeganuaryItem.all
    render layout: "application_empty"
  end

  def published_items
    @veganuary_items = VeganuaryItem.where(published: "true")
    render layout: "application_empty"
  end

  def checked_items
    @veganuary_items = VeganuaryItem.where(published: "true", checked: "true")
    render layout: "application_empty"
  end

  def checked_items_html
    @veganuary_items = VeganuaryItem.where(published: "true", checked: "true")

    if params[:category].present?
      @veganuary_items = @veganuary_items.where(category: params[:category])
    end

    if params[:canton].present?
      @veganuary_items = @veganuary_items.ilike_cantons(params[:canton])
    end

    render layout: false
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

  def edit_for_user

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

  def update_for_user

    authorize @veganuary_item

    respond_to do |format|
      if @veganuary_item.update(veganuary_item_params)
        format.html {

          if @veganuary_item.checked == "true"
            redirect_to checked_items_veganuary_items_path and return
          elsif @veganuary_item.published == "true"
            redirect_to published_items_veganuary_items_path and return
          else
            redirect_to all_items_veganuary_items_path and return
          end



          redirect_to (:back), notice: "Eintrag wurde aktualisiert."
        }
        format.json { render :show, status: :ok, location: @veganuary_item }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @veganuary_item.errors, status: :unprocessable_entity }
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

    @veganuary_items = VeganuaryItem.where(published: "true", checked: "true")

    @special_category_items = nil

    if params[:search_input][:category].present?
      @veganuary_items = @veganuary_items.where(category: params[:search_input][:category])
    else
      #always show brand and chain_of_stores unless a category is selected
      @special_category_items = VeganuaryItem.where(category: "brand").or(VeganuaryItem.where(category: "chain_of_stores"))

    end

    if params[:search_input][:canton].present?
      @veganuary_items = @veganuary_items.ilike_cantons(params[:search_input][:canton])

      if params[:search_input][:canton] == "brand" || params[:search_input][:canton] == "chain_of_stores"
        @special_category_items = VeganuaryItem.where(category: "brand").or(VeganuaryItem.where(category: "chain_of_stores"))
      end
    end

    unless @special_category_items.nil?
      @veganuary_items = @veganuary_items.or(@special_category_items)
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
      params.require(:veganuary_item).permit(:company_name, :company_description, :url, :offer, :addresses, :company_logo, :category, :offer_images1, :offer_images2, :offer_images3, :comment, :checked, :disclaimer1)
    end
end
