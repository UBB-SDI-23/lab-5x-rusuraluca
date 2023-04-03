class User < ApplicationRecord
  has_many :portfolios

  validates :first_name, :last_name, :email, :password, presence: true
  validates :email, uniqueness: true
end