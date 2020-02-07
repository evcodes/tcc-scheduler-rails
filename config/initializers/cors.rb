Rails.application.config.middleware.insert_before 0, Rack::Cors do
    allow do
        origins "http://localhost:3000"
        resource "*", headers: :any, methods:[:get,:post,:put, :patch, :delete, :options, :head], credentials: true
    end

    #Where the production app is going to exist.
    allow do
        origins "https://tcc-scheduler-app-react.heroku.app.com"
        resource "*", headers: :any, methods:[:get,:post,:put, :patch, :delete, :options, :head], credentials: true
    end
end