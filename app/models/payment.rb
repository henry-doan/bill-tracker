class Payment < ApplicationRecord
  belongs_to :bill
  has_many :notes, dependent: :destroy

  validates :amount, :duedate, presence: true
end