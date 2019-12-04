var _service = require('../services/master.service');  
var validateErr = require('../utils/validateError');

exports.addcategory = async function (req, res, next) {

    try {
        var createdRecord = await _service.addcategory(req.body,req)
        return res.status(200).json({
            status: 200,
            data: createdRecord,
            success: true, 
            message: "Succesfully Created "
        })
    } catch (e) {
        console.log(e)
        var err = await validateErr.validateError(e);
        
        return res.status(400).json({
            status: 400,
            success: false,
            message: err
        })
    }
}

exports.addsubcategory = async function (req,res,next){
    
    try{
        var createdRecord = await _service.addsubcategory(req.body,req)
        return res.status(200).json({
            status: 200,
            data: createdRecord,
            success: true,
            message: "Succesfully Created "
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
exports.addsubsubcategory = async function (req,res,next){
    try{
        var createdRecord = await _service.addsubsubcategoryservice(req.body,req)
        return res.status(200).json({
            status: 200,
            data: createdRecord,
            success: true,
            message: "Succesfully Created "
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
exports.editcategory = async function (req,res,next) {
    try{
        var createdRecord = await _service.editcategoryservice(req.body,req)
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
exports.editsubsubcategory = async function (req,res,next) {
    try{
        var createdRecord = await _service.editsubsubcategoryservice(req.body,req)
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
exports.editsubcategory = async function (req,res,next) {
    try{
        var createdRecord = await _service.editsubcategorysservice(req.body,req)
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
exports.deletecategory = async function (req,res,next) {
    try{
        var createdRecord = await _service.deletecategoryservice(req.body)
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
exports.deletesubcategory = async function (req,res,next) {
    try{
        var createdRecord = await _service.deletesubcategoryservice(req.body)
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
exports.deletesubsubcategory = async function (req,res,next) {
    try{
        var createdRecord = await _service.deletesubsubcategoryservice(req.body)
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
exports.getcategory = async function (req,res,next) {
    try{
        var createdRecord = await _service.getcategory()
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
exports.getnotifications = async function (req,res,next) {
    try{
        var getList = await _service.getnotifications(req.body)
        return res.status(200).json({
            status: 200,
            data: getList
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
exports.getsinglecategory = async function (req,res,next) {
    try{
        var createdRecord = await _service.getsinglecategoryservice(req.body)
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
exports.getsinglesubcategory = async function (req,res,next) {
    try{
        var createdRecord = await _service.getsinglesubcategoryservice(req.body)
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
exports.getsinglesubsubcategory = async function (req,res,next) {
    try{
        var createdRecord = await _service.getsinglesubsubcategoryservice(req.body)
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
exports.getcategorysearch = async function (req,res,next) {
    try{
        var createdRecord = await _service.getcategorysearchservice(req.body)
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

exports.getsubcategorysearch = async function (req,res,next) {
    try{
        var createdRecord = await _service.getsubcategorysearchservice(req.body)
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
exports.getsubsubcategorysearch = async function (req,res,next) {
    try{
        var createdRecord = await _service.getsubsubcategorysearchservice(req.body)
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
exports.getsubcategory = async function (req,res,next) {
    try{
        var createdRecord = await _service.getsubcategory(req.body)
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
exports.getsubsubcategory = async function (req,res,next) {
    try{
        var createdRecord = await _service.getsubsubcategory(req.body)
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
exports.addCurrencies = async function (req,res,next) {
    try{
        console.log("Currency datas in controller");    
        console.log(req.body);

        var createdRecord = await _service.addcurrencyService(req.body)
        return res.status(200).json({
            status: 200,
            data: createdRecord,
            message:"Added Successfully"
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
exports.getCurrencyLists = async function (req,res,next) {
    try{
        var getRecords = await _service.getCurrencyListService(req.body)
        return res.status(200).json({
            status: 200,
            data: getRecords,
           
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
exports.getCurrencySearch = async function (req,res,next) {
    try{
        var getRecords = await _service.getCurrencySearchByKey(req.body)
        return res.status(200).json({
            status: 200,
            data: getRecords,
           
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

exports.getSingleCurrency = async function (req,res,next) {
    try{
        var getRecords = await _service.getSingleCurrencybyId(req.body)
        return res.status(200).json({
            status: 200,
            data: getRecords,
           
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

exports.updateCurrency = async function (req,res,next) {
    try{
        var getRecords = await _service.updateCurrencyById(req.body)
        return res.status(200).json({
            status: 200,
            data: getRecords,
           message:'Updated Successfully'
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

exports.deleteCurrency = async function (req,res,next) {
    try{
        var getRecords = await _service.deleteCurrencyById(req.body)
        return res.status(200).json({
            status: 200,
            data: getRecords,
           message:'Deleted Successfully'
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
exports.addStockSettings = async function (req,res,next) {
    try{
    

        var createdRecord = await _service.addStockSettingsService(req.body)
        return res.status(200).json({
            status: 200,
            data: createdRecord,
            message:"Added Successfully"
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
exports.addcurrencySettings = async function (req,res,next) {
    try{
    

        var createdRecord = await _service.addCurrencySettingsService(req.body)
        return res.status(200).json({
            status: 200,
            data: createdRecord,
            message:"Added Successfully"
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
exports.getSettings = async function (req,res,next) {
    try{
    

        var createdRecord = await _service.getSettingsService(req.body)
        return res.status(200).json({
            status: 200,
            data: createdRecord,
            
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