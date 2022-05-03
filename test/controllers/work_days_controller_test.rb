require "test_helper"

class WorkDaysControllerTest < ActionDispatch::IntegrationTest
  setup do
    @work_day = work_days(:one)
  end

  test "should get index" do
    get work_days_url
    assert_response :success
  end

  test "should get new" do
    get new_work_day_url
    assert_response :success
  end

  test "should create work_day" do
    assert_difference('WorkDay.count') do
      post work_days_url, params: { work_day: { date: @work_day.date } }
    end

    assert_redirected_to work_day_url(WorkDay.last)
  end

  test "should show work_day" do
    get work_day_url(@work_day)
    assert_response :success
  end

  test "should get edit" do
    get edit_work_day_url(@work_day)
    assert_response :success
  end

  test "should update work_day" do
    patch work_day_url(@work_day), params: { work_day: { date: @work_day.date } }
    assert_redirected_to work_day_url(@work_day)
  end

  test "should destroy work_day" do
    assert_difference('WorkDay.count', -1) do
      delete work_day_url(@work_day)
    end

    assert_redirected_to work_days_url
  end
end
