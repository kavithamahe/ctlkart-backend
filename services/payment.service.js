var Master = require('../models/master.model');
var Sequelize = require('sequelize');

var Payment = require('../models/payment.model');

var PaymentUser = require('../models/paymentdetails.model');

const Op = Sequelize.Op;

exports.addpaymentservice = async function (params) {
    var data = Payment.build({
        salt_key: params.salt_key,
        key_id: params.key_id,
        payment_mode: params.payment_mode,
        status: params.status,
    })
    try {
        var savedRecord = await data.save();
        return savedRecord;
    } catch (e) {
        throw Error(e)
    }

}
exports.editpaymentservice = async function (params) {
    var data = Payment.update({
        salt_key: params.salt_key,
        key_id: params.key_id,
        payment_mode: params.payment_mode,
        status: params.status,
    })
    try {
        return data;
    } catch (e) {
        throw Error(e)
    }

}

exports.getpaymentkeyservice = async function (params) {
    var data = Payment.findAll({

    })
    try {
        return data;
    } catch (e) {
        throw Error(e)
    }
}
exports.razorPaymentResponseservice = async function (params) {
  
    try {
        if(params.productListsfromcart != undefined){
            for(var i=0;i<params.productListsfromcart.length;i++){
                var data = PaymentUser.build({
                    razorpay_payment_id: params.razorpay_payment_id,
                    total_cost: params.total_cost,
                    user_id: params.user_id,
                    product_id: params.productListsfromcart[i].id,
                    order_id: params.order_id,
                    status: params.status,
                })
                var savedRecord = await data.save();
            }
        }
        return savedRecord;
    } catch (e) {
        throw Error(e)
    }

}