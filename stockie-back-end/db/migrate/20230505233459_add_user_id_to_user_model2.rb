class AddUserIdToUserModel2 < ActiveRecord::Migration[7.0]
  def change
    add_reference :users, :user, foreign_key: true
  end
end
