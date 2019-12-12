var _service = require('../services/payment.service');  
var validateErr = require('../utils/validateError');

exports.addpaymentkey = async function (req, res, next) {

    try {
        var createdRecord = await _service.addpaymentservice(req.body)
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
exports.updatepaymentkey = async function (req, res, next) {

    try {
        var createdRecord = await _service.editpaymentservice(req.body)
        return res.status(200).json({
            status: 200,
            data: createdRecord,
            success: true, 
            message: "Succesfully Updated "
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

exports.getpaymentkey = async function (req, res, next) {

    try {
        var createdRecord = await _service.getpaymentkeyservice(req.body)
        return res.status(200).json({
            status: 200,
            data: createdRecord,
            success: true, 
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
exports.razorPaymentResponse = async function (req, res, next) {

    try {
        var createdRecord = await _service.razorPaymentResponseservice(req.body)
        return res.status(200).json({
            status: 200,
            // data: createdRecord,
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