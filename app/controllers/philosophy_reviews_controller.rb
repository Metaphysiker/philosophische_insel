class PhilosophyReviewsController < ApplicationController
  before_action :set_philosophy_review, only: %i[ show edit update destroy ]

  # GET /philosophy_reviews or /philosophy_reviews.json
  def index
    @philosophy_reviews = PhilosophyReview.all
  end

  # GET /philosophy_reviews/1 or /philosophy_reviews/1.json
  def show
  end

  # GET /philosophy_reviews/new
  def new
    @philosophy_review = PhilosophyReview.new
  end

  # GET /philosophy_reviews/1/edit
  def edit
  end

  # POST /philosophy_reviews or /philosophy_reviews.json
  def create
    @philosophy_review = PhilosophyReview.new(philosophy_review_params)

    respond_to do |format|
      if @philosophy_review.save
        format.html { redirect_to @philosophy_review, notice: "Philosophy review was successfully created." }
        format.json { render :show, status: :created, location: @philosophy_review }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @philosophy_review.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /philosophy_reviews/1 or /philosophy_reviews/1.json
  def update
    respond_to do |format|
      if @philosophy_review.update(philosophy_review_params)
        format.html { redirect_to @philosophy_review, notice: "Philosophy review was successfully updated." }
        format.json { render :show, status: :ok, location: @philosophy_review }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @philosophy_review.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /philosophy_reviews/1 or /philosophy_reviews/1.json
  def destroy
    @philosophy_review.destroy
    respond_to do |format|
      format.html { redirect_to philosophy_reviews_url, notice: "Philosophy review was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_philosophy_review
      @philosophy_review = PhilosophyReview.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def philosophy_review_params
      params.require(:philosophy_review).permit(:title, :name_of_paper, :abstract, :hyperlink)
    end
end
