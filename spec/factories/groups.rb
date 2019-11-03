FactoryBot.define do
  factory :group do
    groupname {Faker::Team.name}
  end
end