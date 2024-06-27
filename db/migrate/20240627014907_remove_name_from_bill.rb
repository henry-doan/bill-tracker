class RemoveNameFromBill < ActiveRecord::Migration[7.0]
  def change
    remove_column :bills, :name, :string
  end
end
