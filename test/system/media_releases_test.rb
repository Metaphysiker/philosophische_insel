require "application_system_test_case"

class MediaReleasesTest < ApplicationSystemTestCase
  setup do
    @media_release = media_releases(:one)
  end

  test "visiting the index" do
    visit media_releases_url
    assert_selector "h1", text: "Media Releases"
  end

  test "creating a Media release" do
    visit media_releases_url
    click_on "New Media Release"

    fill_in "Content", with: @media_release.content
    fill_in "Date", with: @media_release.date
    fill_in "Title", with: @media_release.title
    click_on "Create Media release"

    assert_text "Media release was successfully created"
    click_on "Back"
  end

  test "updating a Media release" do
    visit media_releases_url
    click_on "Edit", match: :first

    fill_in "Content", with: @media_release.content
    fill_in "Date", with: @media_release.date
    fill_in "Title", with: @media_release.title
    click_on "Update Media release"

    assert_text "Media release was successfully updated"
    click_on "Back"
  end

  test "destroying a Media release" do
    visit media_releases_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Media release was successfully destroyed"
  end
end
