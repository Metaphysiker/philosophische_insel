require "test_helper"

class ChatControllerTest < ActionDispatch::IntegrationTest
  test "should get chat" do
    get chat_chat_url
    assert_response :success
  end
end
