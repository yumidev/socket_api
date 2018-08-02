const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const WebSocket = require('ws')
const request = require('request');


server.listen(80);

app.get('/', function (req, res, err) {
  res.sendfile('/index.html');

  if (err) {
    console.log(err)
  }
});

function getSymbol() {
  return new Promise((resolve, reject) => {
    request('https://api.binance.com/api/v1/ticker/24hr', { json: true }, (err, res, body) => {
      if (err) { return console.log(err); }
      if (res.statusCode != 200) {
        reject('Invalid status code <' + response.statusCode + '>');
      }
      resolve(body);
    });
  })
}

function retrieveStream(symbols) {
  io.on('connection', function (socket) {
    let streamQuery = ''
    symbols.forEach((pair) => {
      streamQuery += pair.toLowerCase() + '@aggTrade' + '/'
    })

    const uri = 'wss://stream.binance.com:9443/stream?streams=' + streamQuery
    const originUri = 'wss://stream.binance.com:9443'

    const ws = new WebSocket(uri, {origin: originUri});
    ws.onmessage = function (event) {
      const data = JSON.parse(event.data)
      const symbol = data.data.s
      const price = data.data.p
      socket.emit('price_data', { symbol, price });
    }
  });
}

async function buildSymbolQuery() {
  try {
    const body = await getSymbol()
    var symbols = [];
    var data = JSON.parse(JSON.stringify(body))

    var i;
    for (i=0; i<data.length; i++){
      symbols.push(data[i].symbol);
    }

    retrieveStream(symbols)
  } catch(err) {
    console.log(err);
  }
}

buildSymbolQuery()


// console.log(test());
