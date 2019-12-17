var Master = require('../models/master.model');
var Sequelize = require('sequelize');

var Payment = require('../models/payment.model');

var PaymentUser = require('../models/paymentdetails.model');

var OrderDetails = require('../models/order.model');

var Settings = require('../models/settings.model');

const Op = Sequelize.Op;

var Razorpay = require('razorpay');

var rzp = new Razorpay({
    key_id: "rzp_test_cGa8WOh98HS217", // your `KEY_ID`
    key_secret: "XuzJ1bZhaQ35OML56WXYhRwN" // your `KEY_SECRET`
  })

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
    var totalcost = (params.total_cost* 100);
    try {
        var orderdata = OrderDetails.update({
            payment_status: 1,
            payment_id:params.razorpay_payment_id
        },
        {
            where:{
                order_id: params.order_id,
            }
        })
        rzp.payments.capture( params.razorpay_payment_id, totalcost).then((data) => {
            console.log(data)
          }).catch((error) => {
            console.log(error)
          })

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
exports.onlinepaymentsettingservice = async function (params) {
    // status ---> 1 ----> online
    // status ---> 2 ----> offline
    var data = Settings.update({
        onlinepaymnet_status: params.status,
    })
    try {
        return data;
    } catch (e) {
        throw Error(e)
    }

}

exports.getpaymentsettingservice = async function (params) {
    var data = Settings.findAll({

    })
    try {
        return data;
    } catch (e) {
        throw Error(e)
    }
}