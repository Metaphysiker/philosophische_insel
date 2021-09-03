json.extract! donation_project, :id, :title, :description, :amount_needed_total, :amount_already_received, :created_at, :updated_at
json.url donation_project_url(donation_project, format: :json)
