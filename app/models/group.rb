class Group < ApplicationRecord
  has_many :group_users
  has_many :users, through: :group_users
  validates :groupname, presence: true, uniqueness: true
  has_many :messages
end
