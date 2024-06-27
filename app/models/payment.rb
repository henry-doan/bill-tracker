class Payment < ApplicationRecord
  belongs_to :bill

  validates :amount, :duedate, presence: true
end