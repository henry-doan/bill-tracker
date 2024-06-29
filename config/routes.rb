Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'api/auth'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  namespace :api do
    resources :bills do 
      resources :payments
    end

    resources :payments, only: [] do
      resources :notes
    end
  end
end
