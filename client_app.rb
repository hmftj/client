require 'sinatra/base'
require 'sinatra-websocket'

class ClientApp < Sinatra::Base
  get '/' do
    erb :index
  end
end
