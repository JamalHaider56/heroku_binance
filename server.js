import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

// Binance uses

const Binance = require('node-binance-api');

const binance = new Binance().options({
  APIKEY:'Big4iFN6TYAMwPZobCxN7s5CEeIilV8EGs1qOV8FM4stDOSFVPHSa8jpiQstRKgS',
  APISECRET:'PODHcpXrvbmekAerJV8tS8Ramwb8RWhjgohC9jj9SCmGjdNSrWcE007PPWpevElE'
});

const app = express();
const router = express.Router();
const url = "https://api.binance.com/api/v3/ticker/price";

const get_data = async(url) => {
    try {
        const response = await fetch(url);
        const json = await response.json();
        // console.log(json)
        return json;
    } catch (error) {
        // console.log(error)
        return error;
    }
};
app.use(cors());
app.use(bodyParser.json());

app.post('/auth', (req, res, next) => {
   
    key = req.body.apiKey,
    secret = req.body.secretKey,

// console.log("auth ", req.body.apiKey);
get_data(url).then(result => {
        // console.log(result)     onchange="func()"
        res.status(200).send( { status:'Successfully found!',result });
        res.render("./set_order", { result })
    }

);
});

router.route('/binance').get((req, res) => {
    Issue.find((err, issues) => {
        if (err)
            console.log(err);
        else
        binance.useServerTime((error, ticker) => {
              console.log("useServerTime", ticker);
            });
        // binance.useServerTime((error, ticker) => {
        //       console.log("useServerTime", ticker);
        //     });
//        binance.bookTickers((error, ticker) => {
//   console.log("bookTickers", ticker);
// });


// binance.prices((error, ticker) => {
//     console.log("prices", ticker);
//   });

// binance.balance({timestamp: Date.now()}, (err, issue) => {
//     if (err)
//         console.log(err);
//     else
//         res.json(issue);
// });


             res.json(issues);
    });
});
// var app = require('express')();
// var server = require('http').Server(app);
// var io = require('socket.io')(server);

// io.on('connection', function (socket) {
//     console.log("A user connected");
//     socket.emit('test event', 'THIS is SOME NEW DATA!!!');
// });

// server.listen(4000, () => {
//     console.log("Socket.io server is listening on port 3000");
// });

app.use('/', router);

app.listen(4000, () => console.log('Express server running on port 4000'));