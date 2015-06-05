require 'sinatra/base'
require 'sinatra-websocket'
require 'json'
require 'matrix'

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
        event = JSON.parse(msg, symbolize_names: true)
        #puts event
        case event[:event]
        when 'devicemotion'
          handle_devicemotion(event[:data])
        when 'deviceorientation'
          handle_deviceorientation(event[:data])
        end
      end
      ws.onclose do

      end
    end
  end
end

def handle_devicemotion(event)
  x, y, z = event[:accelerationIncludingGravity].values_at(:x, :y, :z)

  alpha, beta, gamma = event[:rotationRate]
    .values_at(:alpha, :beta, :gamma)


  acceleration = Vector[x, y, z]
  rotation = Vector[alpha, beta, gamma]
  puts acceleration
  puts rotation
end

def handle_deviceorientation(event)
  heading = event[:webkitCompassHeading]
  puts heading
end
