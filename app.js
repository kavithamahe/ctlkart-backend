require('rootpath')(); 

var express = require('express');

var app = express(); 

var bodyParser = require('body-parser');

var cors = require('cors');

var expressJwt = require('express-jwt');

var db = require('./shared/config'); 

var path = require('path');

// var FCM = require('firebase');

var FCM = require('fcm-push');

var config = db.config;   

app.use(cors()); 

app.use(bodyParser.urlencoded({ extended: false }));


app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


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

}).unless({ path: ['/api/login', '/api/register','/api/password/forgot','/api/addcategory','/api/addsubcategory','/api/getcategory','/api/getcategorysearch','/api/getsubcategorysearch','/api/getsubcategory','/api/onetimepassword','/api/viewsingleaddress','/api/editaddress','/api/productcheckoutformcart','/api/updatecartquantity','/api/adminregister','/api/adminlogin','/api/deletecategory','/api/deletesubcategory',
,'/api/addproduct','/api/editsingleproduct','/api/getproductlist','/api/viewsingleproduct','/api/addaddress','/api/getaddress','/api/productcheckout','/api/addsubsubcategory','/api/getproductlistsearch','/api/getsubsubcategory','/api/addtocart','/api/getcartproduct','/api/removecartproduct','/api/getsubsubcategorysearch','/api/categorystatuschange','/api/quantityavailcheck','/api/getordersforreport','/api/deletesubsubcategory',
'/api/getuserszipcode','/api/getpendingorder','/api/getusers','/api/addunits','/api/editunits','/api/removeunits','/api/getallunits','/api/getsingleunit','/api/viewsingleorder','/api/getsinglecategory','/api/getsinglecategory','/api/getsinglesubcategory','/api/searchorderhistory','/api/getprofile','/api/getsinglesubsubcategory','/api/editsubcategory','/api/editsubsubcategory',
'/api/editcategory','/api/getmyorders','/api/statuschangefororder','/api/addCurrencies','/api/getCurrencyList','/api/getcurrencysearch','/api/getsinglecurrency','/api/updateCurrency','/api/deletecurrency','/api/addstocksettings','/api/addcurrencySettings','/api/getSettings','/api/removesingleproduct','/api/updatepages','/api/getpages','/api/getsinglepages'] }));


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

var port = process.env.NODE_ENV === 'production' ? 5003 : 5003;     

var server = app.listen(port, function () {
    console.log('Server listening on port ' + port); 
});

module.exports = app;
