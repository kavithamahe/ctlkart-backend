var express = require('express');
   
var router = express.Router();

var multer = require('multer');  

var AuthController = require('../controllers/auth.controller');

var MasterController = require('../controllers/master.controller');

var ProductController = require('../controllers/product.controller');

var storage = multer.diskStorage({ 
    destination: function (req, file, cb) {     
      cb(null, './uploads')  
    },  
      filename: function (req, file, cb) {
        
      cb(null,file.originalname) 
    }
  })
var upload = multer({ storage: storage}); 

router.post('/register', AuthController.register);

router.post('/adminregister', AuthController.adminregister);

router.post('/login', AuthController.authenticate); 

router.post('/deleteaccount', AuthController.deleteaccount); 

router.post('/adminlogin', AuthController.adminlogin); 

router.post('/onetimepassword', AuthController.onetimepassword);

router.post('/password/forgot', AuthController.forgotPassword); 

router.post('/password/change', AuthController.changePassword);

router.post('/getprofile', AuthController.getprofile);

router.post('/editprofile',upload.single('profile_image'), AuthController.editprofile);

router.post('/getsinglecategory', MasterController.getsinglecategory);

router.post('/getsinglesubcategory', MasterController.getsinglesubcategory);

router.post('/getsinglesubsubcategory', MasterController.getsinglesubsubcategory);

router.post('/getcategory', MasterController.getcategory);

router.post('/getcategorysearch', MasterController.getcategorysearch);

router.post('/getsubcategory', MasterController.getsubcategory);

router.post('/getsubcategorysearch', MasterController.getsubcategorysearch);

router.post('/getsubsubcategory', MasterController.getsubsubcategory);

router.post('/getsubsubcategorysearch', MasterController.getsubsubcategorysearch);

router.post('/getproductlist', ProductController.getproductlist);

router.post('/getproductlistsearch', ProductController.getproductlistsearch);

router.post('/viewsingleproduct', ProductController.viewsingleproduct);

router.post('/productcheckout', ProductController.productcheckout);

router.post('/productcheckoutformcart', ProductController.productcheckoutformcart);

router.post('/addaddress', ProductController.addaddress);

router.post('/getaddress', ProductController.getaddress);

router.post('/viewsingleaddress', ProductController.viewsingleaddress);

router.post('/editaddress', ProductController.editaddress);

router.post('/removeaddress', ProductController.removeaddress);

router.post('/getmyorders', ProductController.getmyorders);

router.post('/getordersforreport', ProductController.getordersforreport);

router.post('/viewsingleorder', ProductController.viewsingleorder);

router.post('/addtocart', ProductController.addtocart);

router.post('/getcartproduct', ProductController.getcartproduct);

router.post('/removecartproduct', ProductController.removecartproduct);

router.post('/updatecartquantity', ProductController.updatecartquantity);

router.post('/ordercancelbyuser', ProductController.ordercancelbyuser);

router.post('/getpendingorder', ProductController.getpendingorder);

router.post('/getprocessingorder', ProductController.getprocessingorder);

router.post('/getdeliveredorder', ProductController.getdeliveredorder);

router.post('/getcancelledorder', ProductController.getcancelledorder);

router.post('/getcompletedorder',ProductController.getcompletedorder);

router.post('/searchprocessing', ProductController.searchmyorderproduct);

router.post('/searchdelivered', ProductController.searchdelivered);

router.post('/searchcancelled', ProductController.searchcancelled);

router.post('/searchorderhistory', ProductController.searchorderhistory);

router.post('/productreview', ProductController.productreview);

router.post('/getcurrency', AuthController.getcurrency);

router.post('/quantityavailcheck', ProductController.quantityavailcheck);

// .......................Admin..................................................

router.post('/addcategory',upload.single('category_image'), MasterController.addcategory);

router.post('/addsubcategory',upload.single('subcategory_image'), MasterController.addsubcategory);

router.post('/addsubsubcategory',upload.single('subsubcategory_image'), MasterController.addsubsubcategory);

router.post('/editcategory',upload.single('category_image'), MasterController.editcategory);

router.post('/editsubcategory',upload.single('subcategory_image'), MasterController.editsubcategory);

router.post('/editsubsubcategory',upload.single('subsubcategory_image'), MasterController.editsubsubcategory);

router.post('/deletecategory', MasterController.deletecategory);

router.post('/deletesubcategory', MasterController.deletesubcategory);

router.post('/deletesubsubcategory', MasterController.deletesubsubcategory);

/* ------- Currency APIS Start ------------- */

router.post('/addCurrencies',MasterController.addCurrencies);

router.post('/getCurrencyList',MasterController.getCurrencyLists);

router.post('/getcurrencysearch',MasterController.getCurrencySearch);

router.post('/getsinglecurrency',MasterController.getSingleCurrency);

router.post('/updateCurrency',MasterController.updateCurrency);

router.post('/deletecurrency',MasterController.deleteCurrency);

/* ------- Currency APIS End ------------- */

/* ------- Currency APIS Start ------------- */

router.post('/addstocksettings',MasterController.addStockSettings);

router.post('/addcurrencySettings',MasterController.addcurrencySettings);

router.post('/getSettings',MasterController.getSettings);

/* ------- Currency APIS End ------------- */


router.post('/addproduct',upload.single('productimage'), ProductController.addproduct);

router.post('/editsingleproduct',upload.single('productimage'), ProductController.editsingleproduct);

router.post('/removesingleproduct', ProductController.removesingleproduct);

router.post('/statuschangefororder', ProductController.statuschangefororder);

router.post('/getusers', AuthController.getusers);

router.post('/getuserssearch', AuthController.getuserssearch);

router.post('/getproductreview', ProductController.getproductreview);

router.post('/getsingleproductreview', ProductController.getsingleproductreview);

router.post('/viewsingleproductreview', ProductController.viewsingleproductreview);

router.post('/categoryactivestatus', ProductController.categoryactivestatus);

router.post('/subcategoryactivestatus', ProductController.subcategoryactivestatus);

router.post('/subsubcategoryactivestatus', ProductController.subsubcategoryactivestatus);

router.post('/adduserszipcode', AuthController.adduserszipcode);

router.post('/getuserszipcode', AuthController.getuserszipcode);

router.post('/getsinglezipcode', AuthController.getsinglezipcode);

router.post('/edituserszipcode', AuthController.edituserszipcode);

router.post('/removeuserszipcode', AuthController.removeuserszipcode);

router.post('/searchuserszipcode', AuthController.searchuserszipcode);

router.post('/addunits', AuthController.addunits);

router.post('/editunits', AuthController.editunit);

router.post('/removeunits', AuthController.removeunits);

router.post('/getallunits', AuthController.getallunits);

router.post('/getsingleunit', AuthController.getsingleunit);









module.exports = router;