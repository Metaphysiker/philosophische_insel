# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
#roles
Role.roles.each do |role|
  Role.create(name: role)
end

#admin
admin = User.create(email: "admin@gmail.com", password: "123456", password_confirmation: "123456")
admin.roles << Role.find_by_name("admin") unless admin.roles.where(name: "admin").exists?
