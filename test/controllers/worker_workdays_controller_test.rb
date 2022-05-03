require "test_helper"

class WorkerWorkdaysControllerTest < ActionDispatch::IntegrationTest
  setup do
    @worker_workday = worker_workdays(:one)
  end

  test "should get index" do
    get worker_workdays_url
    assert_response :success
  end

  test "should get new" do
    get new_worker_workday_url
    assert_response :success
  end

  test "should create worker_workday" do
    assert_difference('WorkerWorkday.count') do
      post worker_workdays_url, params: { worker_workday: {  } }
    end

    assert_redirected_to worker_workday_url(WorkerWorkday.last)
  end

  test "should show worker_workday" do
    get worker_workday_url(@worker_workday)
    assert_response :success
  end

  test "should get edit" do
    get edit_worker_workday_url(@worker_workday)
    assert_response :success
  end

  test "should update worker_workday" do
    patch worker_workday_url(@worker_workday), params: { worker_workday: {  } }
    assert_redirected_to worker_workday_url(@worker_workday)
  end

  test "should destroy worker_workday" do
    assert_difference('WorkerWorkday.count', -1) do
      delete worker_workday_url(@worker_workday)
    end

    assert_redirected_to worker_workdays_url
  end
end
