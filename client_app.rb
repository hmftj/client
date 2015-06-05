require 'sinatra/base'
require 'sinatra-websocket'

class ClientApp < Sinatra::Base
  get '/' do
    "hello world"
  end
end
