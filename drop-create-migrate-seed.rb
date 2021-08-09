rails db:drop && rails db:create && rails db:migrate && rails db:seed
rails db:drop DISABLE_DATABASE_ENVIRONMENT_CHECK=1 && rails db:create && rails db:migrate && rails db:seed
