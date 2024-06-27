class CreatePayments < ActiveRecord::Migration[7.0]
  def change
    create_table :payments do |t|
      t.float :amount
      t.datetime :whenpaid
      t.datetime :duedate
      t.string :status
      t.belongs_to :bill, null: false, foreign_key: true

      t.timestamps
    end
  end
end
