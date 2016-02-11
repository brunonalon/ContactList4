# Homepage (Root path)
get '/' do
  erb :index
end


get '/users' do
  User.all.to_json
end

post '/users' do
  results = {result: false}
  user = User.create(name: params['name'], email: params['email'], phone_number: params['phone_number'])
  if user.save
    results[:result] = true
    results[:id] = user.id
  end
  results.to_json
end
