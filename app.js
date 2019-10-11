require('rootpath')(); 

var express = require('express');

var app = express(); 

var bodyParser = require('body-parser');

var cors = require('cors');

var expressJwt = require('express-jwt');

var db = require('./shared/config'); 

var path = require('path');

var config = db.config;   



app.use(cors()); 

app.use(bodyParser.urlencoded({ extended: false }));


app.use(bodyParser.json());


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
,'/api/addproduct','/api/getproductlist','/api/viewsingleproduct','/api/addaddress','/api/getaddress','/api/productcheckout','/api/addsubsubcategory','/api/getproductlistsearch','/api/getsubsubcategory','/api/getmyorders','/api/addtocart','/api/getcartproduct','/api/removecartproduct','/api/getsubsubcategorysearch','/api/categorystatuschange','/api/quantityavailcheck',
'/api/getuserszipcode','/api/getpendingorder'] }));


app.use(function (err, req, res, next) {
  console.log("err");    
    if (err.name === 'UnauthorizedError') {
      console.log(err);
      return res.status(401).send(err);
    
    }
  });


// Get the API route ...
var api = require('./routes/api.routes')
app.use('/api', api);

// start server

var port = process.env.NODE_ENV === 'development' ? 3000 : 3000;     

var server = app.listen(port, function () {
    console.log('Server listening on port ' + port); 
});

module.exports = app;
