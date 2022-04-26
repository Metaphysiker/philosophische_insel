require "application_system_test_case"

class HorseCommentsTest < ApplicationSystemTestCase
  setup do
    @horse_comment = horse_comments(:one)
  end

  test "visiting the index" do
    visit horse_comments_url
    assert_selector "h1", text: "Horse Comments"
  end

  test "creating a Horse comment" do
    visit horse_comments_url
    click_on "New Horse Comment"

    fill_in "Content", with: @horse_comment.content
    click_on "Create Horse comment"

    assert_text "Horse comment was successfully created"
    click_on "Back"
  end

  test "updating a Horse comment" do
    visit horse_comments_url
    click_on "Edit", match: :first

    fill_in "Content", with: @horse_comment.content
    click_on "Update Horse comment"

    assert_text "Horse comment was successfully updated"
    click_on "Back"
  end

  test "destroying a Horse comment" do
    visit horse_comments_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Horse comment was successfully destroyed"
  end
end
