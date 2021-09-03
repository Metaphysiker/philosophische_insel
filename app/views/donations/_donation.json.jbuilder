json.extract! donation, :id, :amount, :project, :created_at, :updated_at
json.url donation_url(donation, format: :json)
