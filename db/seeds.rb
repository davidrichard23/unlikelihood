# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Asset.destroy_all

Asset.create({name: 'Bitcoin', ticker: 'BTC', description: 'Description of Bitcoin'})
Asset.create({name: 'Tesla', ticker: 'TSLA', description: 'Description of Tesla'})
Asset.create({name: 'Apple', ticker: 'APPL', description: 'Description of Apple'})
Asset.create({name: 'Netflix', ticker: 'NFLX', description: 'Description of Netflix'})
Asset.create({name: 'Microsoft', ticker: 'MSFT', description: 'Description of Microsoft'})
Asset.create({name: 'Disney', ticker: 'DIS', description: 'Description of Disney'})