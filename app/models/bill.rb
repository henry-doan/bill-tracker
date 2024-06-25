class Bill < ApplicationRecord
  validates :name, :category, presence: true
end
