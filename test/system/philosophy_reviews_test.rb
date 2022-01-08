require "application_system_test_case"

class PhilosophyReviewsTest < ApplicationSystemTestCase
  setup do
    @philosophy_review = philosophy_reviews(:one)
  end

  test "visiting the index" do
    visit philosophy_reviews_url
    assert_selector "h1", text: "Philosophy Reviews"
  end

  test "creating a Philosophy review" do
    visit philosophy_reviews_url
    click_on "New Philosophy Review"

    fill_in "Abstract", with: @philosophy_review.abstract
    fill_in "Name of paper", with: @philosophy_review.name_of_paper
    fill_in "Title", with: @philosophy_review.title
    click_on "Create Philosophy review"

    assert_text "Philosophy review was successfully created"
    click_on "Back"
  end

  test "updating a Philosophy review" do
    visit philosophy_reviews_url
    click_on "Edit", match: :first

    fill_in "Abstract", with: @philosophy_review.abstract
    fill_in "Name of paper", with: @philosophy_review.name_of_paper
    fill_in "Title", with: @philosophy_review.title
    click_on "Update Philosophy review"

    assert_text "Philosophy review was successfully updated"
    click_on "Back"
  end

  test "destroying a Philosophy review" do
    visit philosophy_reviews_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Philosophy review was successfully destroyed"
  end
end
