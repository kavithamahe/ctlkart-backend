var _service = require('../services/product.service');  
var validateErr = require('../utils/validateError');

var admin = require("firebase-admin");

exports.addproduct = async function (req, res, next) {

    try {
        var createdRecord = await _service.addproduct(req.body,req)
        return res.status(200).json({
            status: 200,
            data: createdRecord,
            success: true,
            message: "Succesfully Created "
        })
    } catch (e) {
        var err = await validateErr.validateError(e);
        
        return res.status(400).json({
            status: 400,
            success: false,
            message: err
        })
    }
}
exports.editsingleproduct = async function (req, res, next) {

    try {
        var createdRecord = await _service.editsingleproductservice(req.body,req)
        return res.status(200).json({
            status: 200,
            data: createdRecord,
            success: true,
            message: "Edited Succesfully "
        })
    } catch (e) {
        var err = await validateErr.validateError(e);
        
        return res.status(400).json({
            status: 400,
            success: false,
            message: err
        })
    }
}
exports.removesingleproduct = async function (req, res, next) {

    try {
        var createdRecord = await _service.removesingleproductservice(req.body)
        return res.status(200).json({
            status: 200,
            // data: createdRecord,
            success: true,
            message: "Deleted Created "
        })
    } catch (e) {
        var err = await validateErr.validateError(e);
        
        return res.status(400).json({
            status: 400,
            success: false,
            message: err
        })
    }
}

    exports.getproductlist = async function (req,res,next) {
        try{
            var createdRecord = await _service.getproductlistservice(req.body)
            return res.status(200).json({
                status: 200,
                data: createdRecord
            })
        }
        catch(e){
            var err = await validateErr.validateError(e);
            
            return res.status(400).json({
                status: 400,
                success: false,
                message: err
            })
        }
    }
    exports.getproductlistsearch = async function (req,res,next) {
        try{
            var createdRecord = await _service.getproductlistsearchservice(req.body)
            return res.status(200).json({
                status: 200,
                data: createdRecord
            })
        }
        catch(e){
            var err = await validateErr.validateError(e);
            
            return res.status(400).json({
                status: 400,
                success: false,
                message: err
            })
        }
    }
    exports.viewsingleproduct = async function (req,res,next) {
        try{
            var createdRecord = await _service.viewsingleproductservice(req.body)
            return res.status(200).json({
                status: 200,
                data: createdRecord
            })
        }
        catch(e){
            var err = await validateErr.validateError(e);
            
            return res.status(400).json({
                status: 400,
                success: false,
                message: err
            })
        }
    }

    exports.productcheckout = async function (req,res,next) {
        try{
            var createdRecord = await _service.productcheckoutservice(req.body)
            return res.status(200).json({
                status: 200,
                data: createdRecord,
                message: "Your Order Placed Succesfully"
            })
        }
        catch(e){
            var err = await validateErr.validateError(e);
            
            return res.status(400).json({
                status: 400,
                success: false,
                message: err
            })
        }
    }
    exports.productcheckoutformcart = async function (req,res,next) {
        try{
            var createdRecord = await _service.productcheckoutformcartservice(req.body)
            return res.status(200).json({
                status: 200,
                data: createdRecord,
                message: "Your Order Placed Succesfully"
            })
        }
        catch(e){
            var err = await validateErr.validateError(e);
            
            return res.status(400).json({
                status: 400,
                success: false,
                message: err
            })
        }
    }
    exports.addaddress = async function (req,res,next) {
        try{
            var createdRecord = await _service.addaddressservice(req.body)
            return res.status(200).json({
                status: 200,
                data: createdRecord,
                message: "Your Address Added Succesfully"
            })
        }
        catch(e){
            var err = await validateErr.validateError(e);
            
            return res.status(400).json({
                status: 400,
                success: false,
                message: err
            })
        }
    }
    exports.getaddress = async function (req,res,next) {
        try{
            var createdRecord = await _service.getaddressservice(req.body)
            return res.status(200).json({
                status: 200,
                data: createdRecord
            })
        }
        catch(e){
            var err = await validateErr.validateError(e);
            
            return res.status(400).json({
                status: 400,
                success: false,
                message: err
            })
        }
    }
    exports.viewsingleaddress = async function (req,res,next) {
        try{
            var createdRecord = await _service.viewsingleaddressservice(req.body)
            return res.status(200).json({
                status: 200,
                data: createdRecord
            })
        }
        catch(e){
            var err = await validateErr.validateError(e);
            
            return res.status(400).json({
                status: 400,
                success: false,
                message: err
            })
        }
    }
    exports.editaddress = async function (req,res,next) {
        try{
            var createdRecord = await _service.editaddressservice(req.body)
            return res.status(200).json({
                status: 200,
                message: "Edited Successfully"
            })
        }
        catch(e){
            var err = await validateErr.validateError(e);
            
            return res.status(400).json({
                status: 400,
                success: false,
                message: err
            })
        }
    }
    exports.removeaddress = async function (req,res,next) {
        try{
            var createdRecord = await _service.removeaddressservice(req.body)
            return res.status(200).json({
                status: 200,
                message: "Removed Successfully"
            })
        }
        catch(e){
            var err = await validateErr.validateError(e);
            
            return res.status(400).json({
                status: 400,
                success: false,
                message: err
            })
        }
    }
    
    exports.getmyorders = async function (req,res,next) {
        try{
            var createdRecord = await _service.getmyordersservice(req.body)
            return res.status(200).json({
                status: 200,
                data: createdRecord
            })
        }
        catch(e){
            var err = await validateErr.validateError(e);
            
            return res.status(400).json({
                status: 400,
                success: false,
                message: err
            })
        }
    }
    exports.viewsingleorder = async function (req,res,next) {
        try{
            var createdRecord = await _service.viewsingleorderservice(req.body)
            return res.status(200).json({
                status: 200,
                data: createdRecord
            })
        }
        catch(e){
            var err = await validateErr.validateError(e);
            
            return res.status(400).json({
                status: 400,
                success: false,
                message: err
            })
        }
    }
    exports.addtocart = async function (req,res,next) {
        try{
            var createdRecord = await _service.addtocartservice(req.body)
            return res.status(200).json({
                status: 200,
                message: "Added Successfully"
            })
        }
        catch(e){
            var err = await validateErr.validateError(e);
            
            return res.status(400).json({
                status: 400,
                success: false,
                message: err
            })
        }
    }
    exports.getcartproduct = async function (req,res,next) {
        try{
            var createdRecord = await _service.getcartproductservice(req.body)
            return res.status(200).json({
                status: 200,
                data: createdRecord
            })
        }
        catch(e){
            var err = await validateErr.validateError(e);
            
            return res.status(400).json({
                status: 400,
                success: false,
                message: err
            })
        }
    }
    exports.searchmyorderproduct = async function (req,res,next) {
        try{
            var createdRecord = await _service.searchmyorderproductservice(req.body)
            return res.status(200).json({
                status: 200,
                data: createdRecord
            })
        }
        catch(e){
            var err = await validateErr.validateError(e);
            
            return res.status(400).json({
                status: 400,
                success: false,
                message: err
            })
        }
    }
    exports.searchdelivered = async function (req,res,next) {
        try{
            var createdRecord = await _service.searchdeliveredservice(req.body)
            return res.status(200).json({
                status: 200,
                data: createdRecord
            })
        }
        catch(e){
            var err = await validateErr.validateError(e);
            
            return res.status(400).json({
                status: 400,
                success: false,
                message: err
            })
        }
    }
    exports.searchcancelled = async function (req,res,next) {
        try{
            var createdRecord = await _service.searchcancelledservice(req.body)
            return res.status(200).json({
                status: 200,
                data: createdRecord
            })
        }
        catch(e){
            var err = await validateErr.validateError(e);
            
            return res.status(400).json({
                status: 400,
                success: false,
                message: err
            })
        }
    }
    exports.searchorderhistory = async function (req,res,next) {
        try{
            var createdRecord = await _service.searchorderhistoryservice(req.body)
            return res.status(200).json({
                status: 200,
                data: createdRecord
            })
        }
        catch(e){
            var err = await validateErr.validateError(e);
            
            return res.status(400).json({
                status: 400,
                success: false,
                message: err
            })
        }
    }
    exports.removecartproduct = async function (req,res,next) {
        try{
            var createdRecord = await _service.removecartproductservice(req.body)
            return res.status(200).json({
                status: 200,
                message: "Removed Succesfully"
            })
        }
        catch(e){
            console.log(e)
            var err = await validateErr.validateError(e);
            
            return res.status(400).json({
                status: 400,
                success: false,
                message: err
            })
        }
    }
    exports.updatecartquantity  = async function (req,res,next) {
        try{
            var createdRecord = await _service.updatecartquantityservice(req.body)
            return res.status(200).json({
                status: 200,
                message: "Updated Succesfully"
            })
        }
        catch(e){
            console.log(e)
            var err = await validateErr.validateError(e);
            
            return res.status(400).json({
                status: 400,
                success: false,
                message: err
            })
        }
    }
    exports.statuschangefororder  = async function (req,res,next) {
        try{
            var createdRecord = await _service.statuschangefororderservice(req.body)
            return res.status(200).json({
                data:createdRecord,
                status: 200,
                message: "Updated Succesfully"
            })
        }
        catch(e){
            console.log(e)
            var err = await validateErr.validateError(e);
            
            return res.status(400).json({
                status: 400,
                success: false,
                message: err
            })
        }
    }
    exports.ordercancelbyuser  = async function (req,res,next) {
        try{
            var createdRecord = await _service.ordercancelbyuserservice(req.body)
            return res.status(200).json({
                status: 200,
                message: "Your Order Cancelled Succesfully"
            })
        }
        catch(e){
            console.log(e)
            var err = await validateErr.validateError(e);
            
            return res.status(400).json({
                status: 400,
                success: false,
                message: err
            })
        }
    }
    exports.getpendingorder = async function (req,res,next) {
        try{
            var createdRecord = await _service.getpendingorderservice(req.body)
            return res.status(200).json({
                status: 200,
                data: createdRecord
            })
        }
        catch(e){
            var err = await validateErr.validateError(e);
            
            return res.status(400).json({
                status: 400,
                success: false,
                message: err
            })
        }
    }
   exports.getprocessingorder = async function (req,res,next) {
        try{
            var createdRecord = await _service.getprocessingorderservice(req.body)
            return res.status(200).json({
                status: 200,
                data: createdRecord
            })
        }
        catch(e){
            var err = await validateErr.validateError(e);
            
            return res.status(400).json({
                status: 400,
                success: false,
                message: err
            })
        }
    }
    exports.getdeliveredorder = async function (req,res,next) {
        try{
            var createdRecord = await _service.getdeliveredorderservice(req.body)
            return res.status(200).json({
                status: 200,
                data: createdRecord
            })
        }
        catch(e){
            var err = await validateErr.validateError(e);
            
            return res.status(400).json({
                status: 400,
                success: false,
                message: err
            })
        }
    }
    exports.getcancelledorder = async function (req,res,next) {
        try{
            var createdRecord = await _service.getcancelledorderservice(req.body)
            return res.status(200).json({
                status: 200,
                data: createdRecord
            })
        }
        catch(e){
            var err = await validateErr.validateError(e);
            
            return res.status(400).json({
                status: 400,
                success: false,
                message: err
            })
        }
    }
    exports.getcompletedorder = async function (req,res,next) {
        try{
            var createdRecord = await _service.getcompletedorderservice(req.body)
            return res.status(200).json({
                status: 200,
                message: createdRecord
            })
        }
        catch(e){
            var err = await validateErr.validateError(e);
            
            return res.status(400).json({
                status: 400,
                success: false,
                message: err
            })
        }
    }
    exports.productreview = async function (req,res,next) {
        try{
            var createdRecord = await _service.productreviewservice(req.body)
            return res.status(200).json({
                status: 200,
                data: "Your review is placed successfully"
            })
        }
        catch(e){
            var err = await validateErr.validateError(e);
            
            return res.status(400).json({
                status: 400,
                success: false,
                message: err
            })
        }
    }
    exports.getproductreview = async function (req,res,next) {
        try{
            var createdRecord = await _service.getproductreviewservice(req.body)
            return res.status(200).json({
                status: 200,
                data: createdRecord
            })
        }
        catch(e){
            var err = await validateErr.validateError(e);
            
            return res.status(400).json({
                status: 400,
                success: false,
                message: err
            })
        }
    }
    exports.viewsingleproductreview = async function (req,res,next) {
        try{
            var createdRecord = await _service.viewsingleproductreviewservice(req.body)
            return res.status(200).json({
                status: 200,
                data: createdRecord
            })
        }
        catch(e){
            var err = await validateErr.validateError(e);
            
            return res.status(400).json({
                status: 400,
                success: false,
                message: err
            })
        }
    }
    exports.categoryactivestatus = async function (req,res,next) {
        try{
            var createdRecord = await _service.categoryactivestatusservice(req.body)
            return res.status(200).json({
                status: 200,
                message: createdRecord
            })
        }
        catch(e){
            var err = await validateErr.validateError(e);
            
            return res.status(400).json({
                status: 400,
                success: false,
                message: err
            })
        }
    }
    exports.subcategoryactivestatus= async function (req,res,next) {
        try{
            var createdRecord = await _service.subcategoryactivestatusservice(req.body)
            return res.status(200).json({
                status: 200,
                message: createdRecord
            })
        }
        catch(e){
            var err = await validateErr.validateError(e);
            
            return res.status(400).json({
                status: 400,
                success: false,
                message: err
            })
        }
    }
    exports.subsubcategoryactivestatus = async function (req,res,next) {
        try{
            var createdRecord = await _service.subsubcategoryactivestatusservice(req.body)
            return res.status(200).json({
                status: 200,
                message: createdRecord
            })
        }
        catch(e){
            var err = await validateErr.validateError(e);
            
            return res.status(400).json({
                status: 400,
                success: false,
                message: err
            })
        }
    }
    exports.quantityavailcheck = async function (req,res,next) {
        try{
            var createdRecord = await _service.quantityavailcheckservice(req.body)
            return res.status(200).json({
                status: 200,
                message: createdRecord
            })
        }
        catch(e){
            var err = await validateErr.validateError(e);
            
            return res.status(400).json({
                status: 400,
                success: false,
                message: err
            })
        }
    }