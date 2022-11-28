require "test_helper"

class VeganuaryItemsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @veganuary_item = veganuary_items(:one)
  end

  test "should get index" do
    get veganuary_items_url
    assert_response :success
  end

  test "should get new" do
    get new_veganuary_item_url
    assert_response :success
  end

  test "should create veganuary_item" do
    assert_difference('VeganuaryItem.count') do
      post veganuary_items_url, params: { veganuary_item: { addresses: @veganuary_item.addresses, company_description: @veganuary_item.company_description, company_name: @veganuary_item.company_name, offer: @veganuary_item.offer, url: @veganuary_item.url } }
    end

    assert_redirected_to veganuary_item_url(VeganuaryItem.last)
  end

  test "should show veganuary_item" do
    get veganuary_item_url(@veganuary_item)
    assert_response :success
  end

  test "should get edit" do
    get edit_veganuary_item_url(@veganuary_item)
    assert_response :success
  end

  test "should update veganuary_item" do
    patch veganuary_item_url(@veganuary_item), params: { veganuary_item: { addresses: @veganuary_item.addresses, company_description: @veganuary_item.company_description, company_name: @veganuary_item.company_name, offer: @veganuary_item.offer, url: @veganuary_item.url } }
    assert_redirected_to veganuary_item_url(@veganuary_item)
  end

  test "should destroy veganuary_item" do
    assert_difference('VeganuaryItem.count', -1) do
      delete veganuary_item_url(@veganuary_item)
    end

    assert_redirected_to veganuary_items_url
  end
end
