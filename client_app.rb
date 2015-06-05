require 'sinatra/base'
require 'sinatra-websocket'

class ClientApp < Sinatra::Base
  get '/' do
    erb :index
  end

  get '/socket' do
    not_found unless request.websocket?
    request.websocket do |ws|
      ws.onopen do

      end
      ws.onmessage do |msg|
        puts msg
      end
      ws.onclose do

      end
    end
  end
end
