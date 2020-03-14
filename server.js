const express =  require('express');
const cors =  require('cors');
const bodyParser =  require('body-parser');

// Binance uses

// const Binance = require('node-binance-api');

// const binance = new Binance().options({
//   APIKEY:'Big4iFN6TYAMwPZobCxN7s5CEeIilV8EGs1qOV8FM4stDOSFVPHSa8jpiQstRKgS',
//   APISECRET:'PODHcpXrvbmekAerJV8tS8Ramwb8RWhjgohC9jj9SCmGjdNSrWcE007PPWpevElE'
// });

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

// router.route('/binance').get((req, res) => {
//     Issue.find((err, issues) => {
//         if (err)
//             console.log(err);
//         else
//         binance.useServerTime((error, ticker) => {
//               console.log("useServerTime", ticker);
//             });
//         // binance.useServerTime((error, ticker) => {
//         //       console.log("useServerTime", ticker);
//         //     });
// //        binance.bookTickers((error, ticker) => {
// //   console.log("bookTickers", ticker);
// // });


// // binance.prices((error, ticker) => {
// //     console.log("prices", ticker);
// //   });

// // binance.balance({timestamp: Date.now()}, (err, issue) => {
// //     if (err)
// //         console.log(err);
// //     else
// //         res.json(issue);
// // });


//              res.json(issues);
//     });
// });





app.use('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(process.env.PORT || 3000, () => console.log('Express server running on port 4000'));