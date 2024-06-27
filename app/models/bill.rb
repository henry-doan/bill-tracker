class Bill < ApplicationRecord
  belongs_to :user
  has_many :payments, dependent: :destroy

  validates :category, presence: true
end
