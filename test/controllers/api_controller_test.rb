require "test_helper"

class ApiControllerTest < ActionDispatch::IntegrationTest
  test "should get google_sheets" do
    get api_google_sheets_url
    assert_response :success
  end
end
