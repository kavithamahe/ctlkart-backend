require('rootpath')(); 

var express = require('express');

var app = express(); 

var bodyParser = require('body-parser');

var cors = require('cors');

var expressJwt = require('express-jwt');

var db = require('./shared/config'); 

var path = require('path');

var FCM = require('firebase');

var config = db.config;   

// var FCM = require('fcm-push');

// var serverKey = 'AAAAy33CCWE:APA91bGKP5fJ9HW4ocjdJnt58rrr97IwLgrvvmLsb7ADEFj81TU03S2M51ZbfHxqzHJVlJUUIfMAke_9KD5Uy1-pYq24IePRQya02cldUPNJvrVTS4CgMgD0nJdH0yAN8S8njuXfZQec';
// var fcm = new FCM(serverKey);

app.use(cors()); 

app.use(bodyParser.urlencoded({ extended: false }));


app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// var serverKey = 'AAAAy33CCWE:APA91bGKP5fJ9HW4ocjdJnt58rrr97IwLgrvvmLsb7ADEFj81TU03S2M51ZbfHxqzHJVlJUUIfMAke_9KD5Uy1-pYq24IePRQya02cldUPNJvrVTS4CgMgD0nJdH0yAN8S8njuXfZQec';
// var fcm = new FCM(serverKey);
// const message = {
//     to: "cvwPyfKjkz0:APA91bEzOuhOUdcWLE908Y3lNpPz94QGLCRqWzyQxu3zogtB3nk5y2OJIPjTUPo2_p7Jk9hLRQVLLiY_L51_4zGSaWiKA9wsuL3aY1Ywuw5YrXnG0OcFja9D6LQj16KymFRPtYJn0BhL",
//     data: {
//         your_custom_data_key: "accepted_invitation"
//     },
//     notification: {
//         title: "Title of your push notification",
//         body: "Body of your push notification"
//     },
// };
// fcm.send(message)
// .then(function(response){
//     console.log("Successfully sent with response: ", response);
// })
// .catch(function(err){
//     console.log("Something has gone wrong!");
//     console.error(err);
// });

app.get('/', function (req, res, next) {

  res.json({msg: 'This is CORS-enabled for all origins!'})  
  
})
app.use(express.static(path.join(__dirname, './uploads')));

app.get('/main', function(req, res) {

    fs.readFile('/', function(error, content) {
        if (error) {
            res.writeHead(500);
            res.end();
        }
        else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(content, 'utf-8');
        }
    });

});

app.use(expressJwt({
  secret: config.secret,
  credentialsRequired: true,
  getToken: function (req) {
      if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
          return req.headers.authorization.split(' ')[1];
      } else if (req.query && req.query.token) {
          return req.query.token;
      }
      return null;
  } 

}).unless({ path: ['/api/login', '/api/register','/api/password/forgot','/api/addcategory','/api/addsubcategory','/api/getcategory','/api/getcategorysearch','/api/getsubcategorysearch','/api/getsubcategory','/api/onetimepassword','/api/viewsingleaddress','/api/editaddress','/api/productcheckoutformcart','/api/updatecartquantity','/api/adminregister','/api/adminlogin'
,'/api/addproduct','/api/editsingleproduct','/api/getproductlist','/api/viewsingleproduct','/api/addaddress','/api/getaddress','/api/productcheckout','/api/addsubsubcategory','/api/getproductlistsearch','/api/getsubsubcategory','/api/addtocart','/api/getcartproduct','/api/removecartproduct','/api/getsubsubcategorysearch','/api/categorystatuschange','/api/quantityavailcheck',
'/api/getuserszipcode','/api/getpendingorder','/api/getusers','/api/addunits','/api/editunits','/api/removeunits','/api/getallunits','/api/getsingleunit','/api/viewsingleorder','/api/getsinglecategory','/api/getsinglecategory','/api/editcategory','/api/getmyorders','/api/statuschangefororder','/api/addCurrencies','/api/getCurrencyList','/api/getcurrencysearch','/api/getsinglecurrency','/api/updateCurrency','/api/deletecurrency','/api/addstocksettings','/api/addcurrencySettings','/api/getSettings','/api/removesingleproduct'] }));


app.use(function (err, req, res, next) {
//   console.log(err.name);    
    if (err.name === 'UnauthorizedError') {
    //   console.log(err);
      return res.status(401).send(err);
    
    }
  });


// Get the API route ...
var api = require('./routes/api.routes')
app.use('/api', api);

// start server

var port = process.env.NODE_ENV === 'production' ? 3000 : 3000;     

var server = app.listen(port, function () {
    console.log('Server listening on port ' + port); 
});

module.exports = app;
