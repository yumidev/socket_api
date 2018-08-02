// const WebSocket = require('ws')
//
//
// ws.onmessage = function (event) {
// console.log(event.data);
// }
//
//
//
//
// var ws = new WebSocket('wss://stream.binance.com:9443/ws/ethbtc@aggTrade', {origin:'wss://stream.binance.com:9443'});
//
//
// var ws = new WebSocket('wss://stream.binance.com:9443/ /stream?streams=ethbtc@aggTrade/adabtc@aggTrade/xrpbtc@aggTrade’, {origin:'wss://stream.binance.com:9443'});
//
//
//
//
//   // socket.emit('price_data', { hello: 'world' });
//   // socket.on('my other event', function (data) {
//   //   console.log(data);
//   // });
//
//
//
//   <!-- <div class="ETHBTC">
//     <h3 class="ETHBTC">
//       hi
//     </h3>
//     <p class="ETHBTC">
//       hey
//     </p>
//   </div> -->



const request = require('request');
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

async function test() {
  try {

    const body = await getSymbol()
    // console.log(body);
    var symbols = [];

    var data = JSON.parse(JSON.stringify(body))
    // console.log(data);

    var i;
    for (i=0; i<data.length; i++){
      symbols.push(data[i].symbol);
    }
    console.log(symbols);
    return symbols;
  } catch(err) {

  }
}


console.log(test());




// io.on('connection', function (socket) {
//   const streamQuery = ''
//   const uri = 'wss://stream.binance.com:9443/ws/ethbtc@aggTrade'
//   const originUri = 'wss://stream.binance.com:9443'
//
//   const ws = new WebSocket(uri, {origin: originUri});
//
//   ws.onmessage = function (event) {
//     const data = JSON.parse(event.data)
//     const symbol = data.s
//     const price = data.p
//     socket.emit('price_data', { symbol, price });
//   }
// });

// test()



  // console.log(getSymbol());
