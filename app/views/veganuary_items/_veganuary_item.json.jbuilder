json.extract! veganuary_item, :id, :company_name, :company_description, :url, :offer, :addresses, :created_at, :updated_at
json.url veganuary_item_url(veganuary_item, format: :json)
