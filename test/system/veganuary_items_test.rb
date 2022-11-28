require "application_system_test_case"

class VeganuaryItemsTest < ApplicationSystemTestCase
  setup do
    @veganuary_item = veganuary_items(:one)
  end

  test "visiting the index" do
    visit veganuary_items_url
    assert_selector "h1", text: "Veganuary Items"
  end

  test "creating a Veganuary item" do
    visit veganuary_items_url
    click_on "New Veganuary Item"

    fill_in "Addresses", with: @veganuary_item.addresses
    fill_in "Company description", with: @veganuary_item.company_description
    fill_in "Company name", with: @veganuary_item.company_name
    fill_in "Offer", with: @veganuary_item.offer
    fill_in "Url", with: @veganuary_item.url
    click_on "Create Veganuary item"

    assert_text "Veganuary item was successfully created"
    click_on "Back"
  end

  test "updating a Veganuary item" do
    visit veganuary_items_url
    click_on "Edit", match: :first

    fill_in "Addresses", with: @veganuary_item.addresses
    fill_in "Company description", with: @veganuary_item.company_description
    fill_in "Company name", with: @veganuary_item.company_name
    fill_in "Offer", with: @veganuary_item.offer
    fill_in "Url", with: @veganuary_item.url
    click_on "Update Veganuary item"

    assert_text "Veganuary item was successfully updated"
    click_on "Back"
  end

  test "destroying a Veganuary item" do
    visit veganuary_items_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Veganuary item was successfully destroyed"
  end
end
