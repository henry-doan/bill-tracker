class Note < ApplicationRecord
  belongs_to :payment

  validates :subject, :duedate, presence: true
end
