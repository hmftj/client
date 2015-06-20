require 'sinatra/base'
require 'sinatra-websocket'
require 'json'
require 'matrix'
require 'eventmachine'

EventMachine.next_tick do
  $conn = EventMachine.connect_unix_domain("/tmp/drone-ctrl.sock")
end

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
        $conn.send_data(msg)
      end
      ws.onclose do
      end
    end
  end
end
