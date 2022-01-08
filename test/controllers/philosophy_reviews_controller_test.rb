require "test_helper"

class PhilosophyReviewsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @philosophy_review = philosophy_reviews(:one)
  end

  test "should get index" do
    get philosophy_reviews_url
    assert_response :success
  end

  test "should get new" do
    get new_philosophy_review_url
    assert_response :success
  end

  test "should create philosophy_review" do
    assert_difference('PhilosophyReview.count') do
      post philosophy_reviews_url, params: { philosophy_review: { abstract: @philosophy_review.abstract, name_of_paper: @philosophy_review.name_of_paper, title: @philosophy_review.title } }
    end

    assert_redirected_to philosophy_review_url(PhilosophyReview.last)
  end

  test "should show philosophy_review" do
    get philosophy_review_url(@philosophy_review)
    assert_response :success
  end

  test "should get edit" do
    get edit_philosophy_review_url(@philosophy_review)
    assert_response :success
  end

  test "should update philosophy_review" do
    patch philosophy_review_url(@philosophy_review), params: { philosophy_review: { abstract: @philosophy_review.abstract, name_of_paper: @philosophy_review.name_of_paper, title: @philosophy_review.title } }
    assert_redirected_to philosophy_review_url(@philosophy_review)
  end

  test "should destroy philosophy_review" do
    assert_difference('PhilosophyReview.count', -1) do
      delete philosophy_review_url(@philosophy_review)
    end

    assert_redirected_to philosophy_reviews_url
  end
end
