class Note < ApplicationRecord
  belongs_to :payment

  validates :subject, :body, presence: true
end
