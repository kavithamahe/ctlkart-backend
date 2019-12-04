var Product = require('../models/product.model');
var Unitcost = require('../models/costperunit.model');
var Customer = require('../models/customer.model');
var OrderDetails = require('../models/order.model');
var cartDetails = require('../models/cartdetails.model');
var Master = require('../models/master.model');
var Subcategory = require('../models/subcategory.model');
var Subsubcategory = require('../models/subsubcategory.model');
var User = require('../models/user.model');
var Review = require('../models/review.model');
var Unit = require('../models/units.model');
var Notification=require('../models/notification.model');
var Sequelize = require('sequelize');

var nodemailer = require('nodemailer');

var db = require('../shared/config') ;

var randomId = require('random-id');

const Op = Sequelize.Op;
var config = db.config; 

    exports.addproduct = async function (params,uploading) {
        let obj = JSON.parse(params.unitvisecosts);
        if(params.subsubcategory_id){

        
        var singleproduct = await Product.findAll({
            
            where:{
                category_id:params.category_id,
                subcategory_id:params.subcategory_id,
                subsubcategory_id:params.subsubcategory_id,
                product_name: {
                    [Op.like]: '%'+params.product_name+'%'
                  },
                status:{ [Op.not]: 3}
            }
    
            });
        }else{
            var singleproduct = await Product.findAll({
            
                where:{
                    category_id:params.category_id,
                    subcategory_id:params.subcategory_id,
                   
                    product_name: {
                        [Op.like]: '%'+params.product_name+'%'
                      },
                    status:{ [Op.not]: 3}
                }
        
                });
        }
        if(params.subsubcategory_id == ''){
            params.subsubcategory_id = null;
        }
        if(params.subcategory_id == ''){
            params.subcategory_id = null;
        }
      
        var data = Product.build({
            product_name: params.product_name,
            category_id:params.category_id,
            subcategory_id:params.subcategory_id,
            subsubcategory_id:params.subsubcategory_id,
            product_description: params.product_description,
            // price:params.price,
            // quantity:params.quantity,
            // existing_quantity:params.quantity,
            status: 0,
            product_image:uploading.file.originalname
        })
      
        try{
          
            var category = await Master.update({
                delete_status:1
                },
                {
                where: {
                    category_id:params.category_id
                }
             
            }); 
            if(params.subcategory_id){
            var subcategory = await Subcategory.update({
                delete_status:1
                },
                {
                where: {
                    id:params.subcategory_id
                }
             
            }); 
            }
            if(params.subsubcategory_id){
            var subsubcategory = await Subsubcategory.update({
                delete_status:1
                },
                {
                where: {
                    id:params.subsubcategory_id
                }
             
            }); 
            }
            if(singleproduct.length == 0){
                
            var savedRecord = await data.save();
            if(obj != undefined){
                console.log("UnitALLLLLLL");
                console.log(obj);
                for(var i=0;i<obj.length;i++){
                    var singleunit = await Unit.findOne({
            
                        where:{
                            id:obj[i].unit_id
                        }
                
                        });
                        
                var unitcost = Unitcost.build({
                    product_id: savedRecord.dataValues.id,
                    quantityperunit:obj[i].quantityperunit,
                    unittype:singleunit.dataValues.units,
                    unit_id:obj[i].unit_id,
                    costperquantity:obj[i].costperquantity,
                    defaultselection: obj[i].defaultselection,
                    unitnotes: obj[i].unitnotes,
                    totalquantityperunits: obj[i].totalquantityperunits,
                    availablequantityperunits: obj[i].totalquantityperunits,
                    status: obj[i].status,
                })
                var savedRecordcost = await unitcost.save();
            }
         
            }
          
            return savedRecord;
            }
            else{
                return "Product Name Already Exists"
            }
        }
        catch (e) {
            throw Error(e)
        }

    }
    
    exports.categoryactivestatusservice = async function (params,uploading) {
        try{
            var category = await Master.findOne({
                where: {
                    category_id:params.category_id
                }
             
            }); 
            if(category.dataValues.status == "2"){
                var status = false;
                return status;
            }
            else{
                var status = 1;
                return true;
            }
        }
        catch (e) {
            throw Error(e)
        }
       
        }
        exports.subcategoryactivestatusservice = async function (params,uploading) {
            try{
                var category = await Subcategory.findOne({
                    where: {
                        id:params.id
                    }
                 
                }); 
                if(category.dataValues.status == "2"){
                    var status =false;
                    return status;
                }
                else{
                    var status = true;
                    return status;
                }
            }
            catch (e) {
                throw Error(e)
            }
           
            }
            exports.subsubcategoryactivestatusservice = async function (params,uploading) {
                try{
                var category = await Subsubcategory.findOne({
                    where: {
                        id:params.id
                    }
                 
                }); 
                if(category.dataValues.status == "2"){
                    var status = false;
                    return status;
                }
                else{
                    var status = true;
                    return status;
                }
            }
            catch (e) {
                throw Error(e)
            }
                }
exports.editsingleproductservice =async function (params,uploading) {
    let obj = JSON.parse(params.unitvisecosts);
    let obj_unit = JSON.parse(params.unitvisecosts);

    if(params.subsubcategory_id == '' || params.subsubcategory_id == 'null'){
        params.subsubcategory_id = null;
    }
    if(params.subcategory_id == '' || params.subcategory_id == 'null'){
        params.subcategory_id = null;
    }
    var singleunit = await Unitcost.findAll({
            
        where:{
            product_id: params.id,
        }
        });
       
    for(var i=0;i< obj.length;i++){
        var unittypes = await Unit.findOne({
            
            where:{
                id:obj[i].unit_id
            }
    
            });
        if(obj[i].id){

            var unit_data = singleunit.find(x => x.id != obj[i].id) 

            var ids = new Set(singleunit.map(({ id }) => id));

            obj_unit = obj_unit.filter(({ id }) => !ids.has(id));
           
            if(obj_unit != undefined){
                // console.log(obj_unit.length);
                for(var j=0;j< obj_unit.length;j++){
                    // console.log(obj_unit[j]);
                    // console.log(obj_unit[j].id);
                    var unitremove = Unitcost.destroy({
                        where: {
                            id:obj_unit[j].id, 
                        }
                     
                    }); 
                }
              
            }

        var unitcost = await Unitcost.update({
            product_id: params.id,
            quantityperunit:obj[i].quantityperunit,
            unittype:unittypes.dataValues.units,
            unit_id:obj[i].unit_id,
            costperquantity:obj[i].costperquantity,
            // total_quantity:params.quantity,
            defaultselection: obj[i].defaultselection,
            unitnotes: obj[i].unitnotes,
            totalquantityperunits: obj[i].totalquantityperunits,
            availablequantityperunits: obj[i].totalquantityperunits,
            status:obj[i].status,
        },
        { where:{
            id:obj[i].id,
        }
        })
        }
        else{
            var unitcost = Unitcost.build({
                product_id: params.id,
                quantityperunit:obj[i].quantityperunit,
                unittype:unittypes.dataValues.units,
                unit_id:obj[i].unit_id,
                costperquantity:obj[i].costperquantity,
                defaultselection: obj[i].defaultselection,
                unitnotes: obj[i].unitnotes,
                totalquantityperunits: obj[i].totalquantityperunits,
                availablequantityperunits: obj[i].totalquantityperunits,
                status: obj[i].status,
            })
            var savedRecordcost = await unitcost.save();
        }
    }
    try{
        // if(singleproduct.length <= 1){
        if(uploading.file != undefined){
            originalimage = uploading.file.originalname;
           }
           else{
            originalimage = params.productimage;
           }
        var data = await Product.update({
            product_name: params.product_name,
            category_id:params.category_id,
            subcategory_id:params.subcategory_id,
            subsubcategory_id:params.subsubcategory_id,
            product_description: params.product_description,
            // price:params.price,
            // quantity:params.quantity,
            // existing_quantity:params.quantity,
            status: 0,
            product_image:originalimage
        },
        { where:{
            id:params.id,
        }
    });

  

    
        return data;
        // }
        // else{
        //    return "Product Name Already Exists" 
        // }
    }
    catch (e) {
        throw Error(e)
    }

}
exports.removesingleproductservice = async function (params){
    var singleproduct = await Product.findAll({
            
        where:{id:params.id}

        });
            var categoryDetail = await Product.findAll({
            
                where:{
                    category_id:singleproduct[0].category_id,
                    status:{ [Op.not]: 3}
                }
    
                });
            var subcategoryDetail = await Product.findAll({
            
                where:{
                    subcategory_id:singleproduct[0].subcategory_id,
                    status:{ [Op.not]: 3}
                }
        
                });
            var childcategoryDetail = await Product.findAll({
            
                where:{
                    subsubcategory_id:singleproduct[0].subsubcategory_id,
                    status:{ [Op.not]: 3}
                }
            
                });
        // var categorylength = 

    try {  
        if(categoryDetail.length == 1){
        var category = await Master.update({
            delete_status:0
            },
            {
            where: {
                category_id:singleproduct[0].category_id
            }
         
        }); 
        }
        if(subcategoryDetail.length == 1){
        var subcategory = await Subcategory.update({
            delete_status:0
            },
            {
            where: {
                id:singleproduct[0].subcategory_id
            }
         
        }); 
        }
        if(childcategoryDetail.length == 1){
        var subsubcategory = await Subsubcategory.update({
            delete_status:0
            },
            {
            where: {
                id:singleproduct[0].subsubcategory_id
            }
         
        }); 
        }

        
        var removeproduct = await Product.update({
            status:3,
            existing_quantity:0
        },{
            where: {
                id:params.id
            },

        })
       
        return removeproduct;
        
    }
    catch (e) {
    throw Error(e);
       
   }
}
        
        exports.getproductlistsearchservice = async function (params){
            try { 
                //         var productList = await Product.findAll({
                      
                //             where: {
                //                 [Op.or]: {
                //                     product_name: {
                //                       [Op.like]: '%'+params.search+'%'
                //                     },
                //                     product_description: {
                //                       [Op.like]: '%'+params.search+'%'
                //                     },
                //                     price: {
                //                         [Op.like]: '%'+params.search+'%'
                //                     },
                //                       category_id: {
                //                         [Op.like]: '%'+params.search+'%'
                //                       },
                //                       subcategory_id: {
                //                         [Op.like]: '%'+params.search+'%'
                //                       },
                //                       subsubcategory_id: {
                //                         [Op.like]: '%'+params.search+'%'
                //                       },
                //                 // '$Product.body$':{ [Op.like]: '%'+params.search+'%'  }
                //                 }
                //             },
                //                 order: [
                //                     ['id', 'DESC']
                //                 ]
                            
                        
                //        });   
       
                // return productList;
                var productlists = {};
         
                if(params.category_id)
                    productlists.category_id = params.category_id;
                if(params.subcategory_id)
                    productlists.subcategory_id= params.subcategory_id;
                if(params.subsubcategory_id)
                    productlists.subsubcategory_id= params.subsubcategory_id;
                if(params.category_id && params.subcategory_id && params.subsubcategory_id){
                    productlists.category_id = params.category_id;
                    productlists.subcategory_id= params.subcategory_id;
                    productlists.subsubcategory_id= params.subsubcategory_id;
                }
                if(params.category_id && params.subcategory_id){
                    productlists.category_id = params.category_id;
                    productlists.subcategory_id= params.subcategory_id;
                }
                if(params.subcategory_id && params.subsubcategory_id){
                    productlists.subcategory_id = params.subcategory_id;
                    productlists.subsubcategory_id= params.subsubcategory_id;
                }
                if(params.category_id && params.subsubcategory_id){
                    productlists.category_id = params.category_id;
                    productlists.subsubcategory_id= params.subsubcategory_id;
                }
                if(params.search && params.category_id && params.subcategory_id && params.subsubcategory_id){
                    productlists.product_name = params.search;
                    productlists.category_id = params.category_id;
                    productlists.subcategory_id= params.subcategory_id;
                    productlists.subsubcategory_id= params.subsubcategory_id;
                }
                if(params.search && params.category_id){
                    productlists.product_name = params.search;
                    productlists.category_id = params.category_id;
                }
                if(params.search && params.subsubcategory_id){
                    productlists.product_name = params.search;
                    productlists.subsubcategory_id = params.subsubcategory_id;
                }
                if(params.search && params.subcategory_id){
                    productlists.product_name = params.search;
                    productlists.subcategory_id = params.subcategory_id;
                }
                if(params.search && params.category_id && params.subcategory_id){
                    productlists.product_name = params.search;
                    productlists.category_id = params.category_id;
                    productlists.subcategory_id= params.subcategory_id;
                }
                if(params.search && params.subcategory_id && params.subsubcategory_id){
                    productlists.product_name = params.search;
                    productlists.subcategory_id= params.subcategory_id;
                    productlists.subsubcategory_id= params.subsubcategory_id;
                }
                if(params.search && params.category_id && params.subsubcategory_id){
                    productlists.product_name = params.search;
                    productlists.category_id = params.category_id;
                    productlists.subsubcategory_id= params.subsubcategory_id;
                }
                
                else if(params.price == "high to low"){
                    var productList = await Product.findAll({
                        where: productlists,
                        order: [
                            ['price', 'DESC']
                        ]
                     
                    }); 
                }
                else if(params.price == "low to high"){
                    var productList = await Product.findAll({
                        where: productlists,
                        order: [
                            ['price', 'ASC']
                        ]
                     
                    }); 
                }
                else if(params.search){
                             var productList = await Product.findAll({
                      
                            where: {
                                [Op.or]: {
                                    product_name: {
                                      [Op.like]: '%'+params.search+'%'
                                    },
                                    product_description: {
                                      [Op.like]: '%'+params.search+'%'
                                    },
                                    price: {
                                        [Op.like]: '%'+params.search+'%'
                                    },
                                }
                            },
                                order: [
                                    ['id', 'DESC']
                                ]
                            
                        
                       });   
                }
                else{
                var productList = await Product.findAll({
                    where: productlists,
                    order: [
                        ['id', 'DESC']
                    ]
                 
                });   
            }
            var filtered = productList.filter(function(item) { 
                return item.status !== 3;  
             });
            return filtered;
            
                }
                catch (e) {
                   console.log(e);
                throw Error(e);
                   
               }
        }
        exports.getproductlistservice = async function (params){
            try { 
                    var productlists = {};
         
                    if(params.category_id)
                        productlists.category_id = params.category_id;
                    if(params.subcategory_id)
                        productlists.subcategory_id= params.subcategory_id;
                    if(params.subsubcategory_id)
                        productlists.subsubcategory_id= params.subsubcategory_id;
                    if(params.search)
                        productlists.product_name= params.search;
                    
                    if(params.price == "high to low"){
                        var productList = await Product.findAll({
                            where: productlists,
                            order: [
                                ['price', 'DESC']
                            ],
                            include: [{
                                model: Unitcost,
                                required: false,
                                // attributes: ['id','product_id','unittype','quantityperunit','costperquantity','total_quantity','existing_quantity']
                                
                            }],
                         
                        }); 
                    }
                    else if(params.price == "low to high"){
                        var productList = await Product.findAll({
                            where: productlists,
                            order: [
                                ['price', 'ASC']
                            ],
                            include: [{
                                model: Unitcost,
                                required: false,
                                // attributes: ['id','product_id','unittype','quantityperunit','costperquantity','total_quantity','existing_quantity']
                                
                            }],
                         
                        }); 
                    }
                    else{
                    var productList = await Product.findAll({
                        where: productlists,
                        order: [
                            ['id', 'DESC']
                        ],
                        include: [{
                            model: Unitcost,
                            required: false,
                            // attributes: ['id','product_id','unittype','quantityperunit','costperquantity','total_quantity','existing_quantity']
                            
                        }],
                     
                    });   
                }
                var filtered = productList.filter(function(item) { 
                    return item.status !== 3;  
                 });
                return filtered;
                }
                catch (e) {
                   console.log(e);
                throw Error('Server Error');
                   
               }
        }
        exports.viewsingleproductservice = async function (params){
            try {       
                var singleproduct = await Product.findAll({
            
                where:{id:params.id},
                 include: [{
                            model: Unitcost,
                            required: false,
                            // attributes: ['id','product_id','unittype','quantityperunit','costperquantity','total_quantity','existing_quantity']
                            
                        }],
        
                });
                
                return singleproduct;
                }
                catch (e) {
                   console.log(e);
                throw Error('Server Error');
                   
               }
        }
        exports.productcheckoutservice = async function (params){  
           
            var len = 6;
            var pattern = 'A0';
            var today = new Date();
            var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
            var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            var dateTime = date+' '+time;
            var id = randomId(len, pattern);
                var singleproduct = await Product.findAll({
            
                where:{id:params.product_id}
        
                });
                var singleunit = await Unitcost.findAll({
            
                    where:{id:params.unitcostid}
            
                    });
                var customerDetails = await Customer.findAll({
            
                    where:{id:params.customer_id}
            
                    });
                    var userDetails = await User.findAll({
            
                        where:{id:params.user_id}
                
                        });
                
                var data = await Customer.update({
                    status:1
                },
                   { where:{
                        id:params.customer_id,
                    }
                })
                var productquantity = await Product.update({
                    existing_quantity:singleproduct[0].existing_quantity - params.quantity
                },
                   { where:{
                       id:params.product_id
                    }
                })
                var unitquantity = await Unitcost.update({
                    availablequantityperunits:singleunit[0].availablequantityperunits - params.quantity
                },
                   { where:{
                       id:params.unitcostid
                    }
                })
               
                try{
                 
                        var orderdata = OrderDetails.build({
                            user_id:params.user_id,
                            customer_id:params.customer_id,
                            order_id: id,
                            product_id:params.product_id,
                            product_name:singleproduct[0].product_name,
                            product_image:singleproduct[0].product_image,
                            priceperproduct:singleproduct[0].price,
                            totalamount:params.amount,
                            ordered_date: today,
                            ordered_time: dateTime,
                            quantity:params.quantity,
                            payment_type:params.payment_type,
                            status:0,
                            username:userDetails[0].firstname + ' ' + userDetails[0].lastname,
                            useremail:userDetails[0].email,
                            usermobile:userDetails[0].mobile,
                            
                        })
                        var ordersavedRecord = await orderdata.save();
                        
                        var transporter = nodemailer.createTransport({
                            service: 'gmail',
                            host:'smtp.gmail.com',
                            auth: {
                              user: 'kavithamahe2@gmail.com',
                              pass: 'kavithabe94'
                            },
                            tls: {
                                rejectUnauthorized: false
                            }
                          });
                          
                          var mailOptions = {
                            from: 'kavithamahe2@gmail.com',
                            to: userDetails[0].email,
                            subject: 'Your Order Placed Succeesfully',
                            // text: 'That was easy!',
                            html: "Hello <b>"+ userDetails[0].username +"</b> <br> <br>Your order for "+ singleproduct[0].product_name +" with order ID "+ id +""
                          };
                          
                          transporter.sendMail(mailOptions, function(error, info){
                            if (error) {
                              console.log(error);
                            } else {
                              console.log('Email sent: ' + info.response);
                            }
                          });
                          return ordersavedRecord;
                }
                catch (e) {
                    throw Error(e)
                }
        
               
        }
        exports.productcheckoutformcartservice = async function (params){  
            console.log("params.totalpricecart");
           console.log(params.totalpricecart);
            var len = 6;
            var pattern = 'A0'
            var today = new Date();
            var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
            var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            var dateTime = date+' '+time;
            var id = randomId(len, pattern);
           
                var customerDetails = await Customer.findAll({
            
                    where:{id:params.customer_id}
            
                    });
                    var userDetails = await User.findAll({
            
                        where:{id:params.user_id}
                
                        });
                
                var data = await Customer.update({
                    status:1
                },
                   { where:{
                        id:params.customer_id,
                    }
                })
               
                try{
                    if(params.productListsfromcart != undefined){
                      
                        for(var i=0;i<params.productListsfromcart.length;i++){
                            var singleproduct = await Product.findAll({
            
                                where:{id:params.productListsfromcart[i].id}
                        
                                });

                                var singleunit = await Unitcost.findAll({
            
                                    where:{id:params.productListsfromcart[i].unitcostid}
                            
                                    });

                            var cart = cartDetails.destroy({
                                where: {
                                    [Op.and]: [{
                                        user_id: params.user_id
                                    }, {
                                        product_id: params.productListsfromcart[i].id
                                    }]
                                }
                             
                            }); 

                            for(var k= 0;k<singleunit.length;k++){
                                var unitquantity = await Unitcost.update({
                                    availablequantityperunits:singleunit[k].availablequantityperunits - params.productListsfromcart[i].quantityperproduct
                                },
                                   { where:{
                                       id:params.productListsfromcart[i].unitcostid
                                    }
                                })
                                }

                            for(var j= 0;j<singleproduct.length;j++){
                            var productquantity = await Product.update({
                                existing_quantity:singleproduct[j].existing_quantity - params.productListsfromcart[i].quantityperproduct
                            },
                               { where:{
                                   id:params.productListsfromcart[i].id
                                }
                            })
                            }
                          
                            var orderdata = OrderDetails.build({
                                user_id:params.user_id,
                                customer_id:params.customer_id,
                                order_id: id,
                                product_id:params.productListsfromcart[i].id,
                                unit_id:params.productListsfromcart[i].unitcostid,
                                product_name:params.productListsfromcart[i].product_name,
                                product_image:params.productListsfromcart[i].product_image,
                                priceperproduct:params.productListsfromcart[i].costperquantity,
                                totalamount:params.totalpricecart,
                                ordered_date: today,
                                ordered_time: dateTime,
                                quantity:params.productListsfromcart[i].quantityperproduct,
                                payment_type:params.payment_type,
                                status:0,
                                username:userDetails[0].firstname + ' ' + userDetails[0].lastname,
                                useremail:userDetails[0].email,
                                usermobile:userDetails[0].mobile,
                            })
                           
                            
                            var ordersavedRecord = await orderdata.save();
                            var notificationdata=Notification.build({
                                sender_id:params.user_id,
                                receiver_id:'6',
                                notify_type:'newOrder',
                                read_status:'0',
                                message:'You have a new order',
                                url:'orders',
                                inserted_id:ordersavedRecord.dataValues.id,
                            });
                            var notificationsave = await notificationdata.save();

                        }
                    }
                
                    
                    var transporter = nodemailer.createTransport({
                        service: 'gmail',
                        host:'smtp.gmail.com',
                        auth: {
                          user: 'kavithamahe2@gmail.com',
                          pass: 'kavithabe94'
                        },
                        tls: {
                            rejectUnauthorized: false
                        }
                      });
                      
                      var mailOptions = {
                        from: 'kavithamahe2@gmail.com',
                        to: userDetails[0].email,
                        subject: 'Your Order Placed Succeesfully',
                        // text: 'That was easy!',
                        html: "Hello <b>"+ userDetails[0].username +"</b> <br> <br>Your order with order ID "+ id +""
                      };
                      
                      transporter.sendMail(mailOptions, function(error, info){
                        if (error) {
                          console.log(error);
                        } else {
                          console.log('Email sent: ' + info.response);
                        }
                      });
                      var orderdata = {"ordersavedRecord":ordersavedRecord,"user":userDetails[0]}
                      return orderdata;
                }
                catch (e) {
                    throw Error(e)
                }
        
               
        }
        exports.addaddressservice = async function (params){  
           
 
                var data = Customer.build({
                    user_id:params.user_id,
                    name:params.name,
                    mobile:params.mobile,
                    address:params.address,
                    landmark:params.landmark,
                    city:params.city,
                    state:params.state,
                    // country:params.country,
                    zipcode: params.zipcode,
                    address_type:params.address_type,
                    status:0
                })
               
                try{
                    var savedRecord = await data.save();
                   
                      return savedRecord;
                }
                catch (e) {
                    throw Error(e)
                }
        
               
        }

        exports.getaddressservice = async function (params){
            try { 
                   
                    var address = await Customer.findAll({
                        where: {
                            user_id:params.user_id
                        }
                     
                    });   
       
                return address;
                }
                catch (e) {
                   console.log(e);
                throw Error('Server Error');
                   
               }
        }
        exports.viewsingleaddressservice = async function (params){
            try { 
                   
                    var address = await Customer.findOne({
                        where: {
                            id:params.id
                        }
                     
                    });   
       
                return address;
                }
                catch (e) {
                   console.log(e);
                throw Error('Server Error');
                   
               }
        }
        exports.editaddressservice = async function (params){
            try { 
                   
                    var address = await Customer.update({
                    name:params.name,
                    mobile:params.mobile,
                    address:params.address,
                    landmark:params.landmark,
                    city:params.city,
                    state:params.state,
                    // country:params.country,
                    zipcode: params.zipcode,
                    address_type:params.address_type
                    },
                    {
                        where: {
                            id:params.id
                        }
                     
                    });   
       
                return address;
                }
                catch (e) {
                   console.log(e);
                throw Error('Server Error');
                   
               }
        }
        exports.removeaddressservice = async function (params){
            try { 
                   
                    var address = Customer.destroy({
                        where: {
                            id:params.id
                        }
                     
                    });   
       
                return address;
                }
                catch (e) {
                   console.log(e);
                throw Error('Server Error');
                   
               }
        }
        exports.getmyordersservice = async function (params){
            try { 
                if(!params.user_id){
                    var productList = await OrderDetails.findAll({
                        // where: {
                        //     user_id:params.user_id
                        // },
                      
                        // include: [{
                        //     model: Unitcost,
                        //     required: false,
                        //     // attributes: ['id','firstname','lastname','email','mobile']
                            
                        // }],
                        attributes: ['id','user_id','customer_id','order_id','product_id','unit_id','product_name','product_image',
                        'priceperproduct','totalamount','ordered_date','ordered_time','processing_date','processing_time','shipped_date','shipped_time',
                        'delivered_date','delivered_time','cancelled_date','cancelled_time','quantity','payment_type','username','useremail','usermobile','review_status','created_at',
                         [Sequelize.fn('min', Sequelize.col('status')), 'status']],
                        group: ['order_id'],
                        order: [
                            ['id', 'DESC'],
                           
                        ],
                       

                    });  
                
                 
                    const sorted = productList.reduce((result, items) => {
                        const a = result.find(({order_id}) => order_id === items.order_id);
                        a ? a.items.push(items) : result.push({order_id: items.order_id,priceperproduct:items.priceperproduct,totalamount:items.totalamount,
                            cancelled_date:items.cancelled_date,cancelled_time:items.cancelled_time,created_at:items.created_at,customer_id:items.customer_id,
                            delivered_date:items.delivered_date,delivered_time:items.delivered_time,id:items.id,ordered_date:items.ordered_date,ordered_time:items.ordered_time,
                            processing_date:items.processing_date,processing_time:items.processing_time,payment_type:items.payment_type,
                            product_id:items.product_id,product_image:items.product_image,product_name:items.product_name,quantity:items.quantity,
                            status:items.status,updated_at:items.updated_at,user_id:items.user_id,useremail:items.useremail,username:items.username,usermobile:items.usermobile,
                            items: [items]});
                          
                        return result;
                    }, []);

                 
                return productList;
                }
                else{
                    var productList = await OrderDetails.findAll({
                        // include: [{
                        //     model: User,
                        //     required: false,
                        //     attributes: ['id','firstname','lastname','email','mobile']
                            
                        // }],
                        attributes: ['id','user_id','customer_id','order_id','product_id','unit_id','product_name','product_image',
                        'priceperproduct','totalamount','ordered_date','ordered_time','processing_date','processing_time','shipped_date','shipped_time',
                        'delivered_date','delivered_time','cancelled_date','cancelled_time','quantity','payment_type','username','useremail','usermobile','review_status','created_at',
                         [Sequelize.fn('min', Sequelize.col('status')), 'status']],
                         group: ['order_id'],
                        //  include: [{
                        //     model: Unitcost,
                        //     required: false,
                        //     // attributes: ['id','firstname','lastname','email','mobile']
                            
                        // }],
                        order: [
                            ['id', 'DESC']
                        ]
                    });  
                 
                    // const sorted = productList.reduce((result, items) => {
                    //     const a = result.find(({order_id}) => order_id === items.order_id);
                    //     a ? a.items.push(items) : result.push({order_id: items.order_id,priceperproduct:items.priceperproduct,totalamount:items.totalamount,
                    //         cancelled_date:items.cancelled_date,cancelled_time:items.cancelled_time,created_at:items.created_at,customer_id:items.customer_id,
                    //         delivered_date:items.delivered_date,delivered_time:items.delivered_time,id:items.id,ordered_date:items.ordered_date,ordered_time:items.ordered_time,
                    //         processing_date:items.processing_date,processing_time:items.processing_time,payment_type:items.payment_type,
                    //         product_id:items.product_id,product_image:items.product_image,product_name:items.product_name,quantity:items.quantity,
                    //         status:items.status,updated_at:items.updated_at,user_id:items.user_id,useremail:items.useremail,username:items.username,usermobile:items.usermobile,
                    //         items: [items]});
                          
                    //     return result;
                    // }, []);
                 
                return productList;
                
                }
                  
                }
                catch (e) {
                   console.log(e);
                throw Error('Server Error');
                   
               }
        }
        exports.viewsingleorderservice = async function (params){
            productlist = [];
            
            try { 
                   if(params.status){
                       if(params.status == 0 || params.status == 1 || params.status == 2){
                        //    console.log(params.status)
                    var singleproductList = await OrderDetails.findAll({
                        where: {
                            order_id:params.order_id,
                            status:[0,1,2],
                        },
                        include: [{
                            model: Unitcost,
                            required: false,                           
                        },
                        {
                            model: Customer,
                            required: false,
                            
                        }
                        ],
                     
                    }); 
                }
                else{
                    var singleproductList = await OrderDetails.findAll({
                        where: {
                            order_id:params.order_id,
                            status:params.status,
                        },
                        include: [{
                            model: Unitcost,
                            required: false,                           
                        },
                        {
                            model: Customer,
                            required: false,
                            
                        }
                        ],
                     
                    }); 
                }
                
                }
                else{
                    var singleproductList = await OrderDetails.findAll({
                        where: {
                            order_id:params.order_id,
                        },
                        include: [{
                            model: Unitcost,
                            required: false,
                            // attributes: ['id','firstname','lastname','email','mobile']
                            
                        }],
                        // include: [{
                        //     model: User,
                        //     required: false,
                        //     attributes: ['id','firstname','lastname','email','mobile']
                            
                        // }],
                     
                    }); 
                
                }
                var userslist = await User.findOne({
                    where: {
                        id:params.user_id,
                    },
                 
                });
                //   console.log(singleproductList)
                      if(singleproductList != ''){
                        var singleaddress = await Customer.findOne({
                            where: {
                                id:singleproductList[0].dataValues.customer_id
                            }
                         
                        }); 
                        if(userslist){
                            singleproductList[0].dataValues.username = userslist.dataValues.username;
                            singleproductList[0].dataValues.email = userslist.dataValues.email;
                        }
                        else{
                            singleproductList[0].dataValues.username = "";
                            singleproductList[0].dataValues.email = "";
                        }

                        if(singleaddress){
                        singleproductList[0].dataValues.address = singleaddress.dataValues.address;
                        singleproductList[0].dataValues.city = singleaddress.dataValues.city;
                        singleproductList[0].dataValues.state = singleaddress.dataValues.state;
                        singleproductList[0].dataValues.zipcode = singleaddress.dataValues.zipcode;
                        }
                        else{
                        singleproductList[0].dataValues.address = "";
                        singleproductList[0].dataValues.city = "";
                        singleproductList[0].dataValues.state = "";
                        singleproductList[0].dataValues.zipcode = "";
                        }
                      const sorted = singleproductList.reduce((result, items) => {
                        const a = result.find(({order_id}) => order_id === items.order_id);
                        a ? a.items.push(items) : result.push({order_id: items.order_id,priceperproduct:items.priceperproduct,totalamount:items.totalamount,
                            cancelled_date:items.cancelled_date,cancelled_time:items.cancelled_time,shipped_date:items.shipped_date,shipped_time:items.shipped_time,created_at:items.created_at,customer_id:items.customer_id,
                            delivered_date:items.delivered_date,delivered_time:items.delivered_time,id:items.id,ordered_date:items.ordered_date,ordered_time:items.ordered_time,payment_type:items.payment_type,
                            product_id:items.product_id,product_image:items.product_image,product_name:items.product_name,quantity:items.quantity,
                            status:items.status,review_status:items.review_status,updated_at:items.updated_at,user_id:items.user_id,address:singleproductList[0].dataValues.address,
                            city:singleproductList[0].dataValues.city,state:singleproductList[0].dataValues.state,zipcode:singleproductList[0].dataValues.zipcode,
                            items: [items]});
                        return result;
                    }, []);
                
                if(singleproductList != undefined){
                    return sorted;
                }
                  else{
                      return "ads"
                  }
                }
                }
                catch (e) {
                   console.log(e);
                throw Error(e);
                   
               }
        }
        exports.addtocartservice = async function (params){
        
           
                try {  
                    if(typeof params.productDetails != undefined){
                      
                        for(var i=0;i<params.productDetails.length;i++){
                            var cartproductList = await Product.findAll({
                                where: {
                                    id:params.productDetails[i].product_id
                                }
                            })
                            if(typeof cartproductList != undefined){
                                for(var j=0;j<cartproductList.length;j++){
                                    var cartList = cartDetails.build({
                                        user_id:params.user_id,
                                        product_id:params.productDetails[i].product_id,
                                        unit_id:params.productDetails[i].unit_id,
                                        product_name:cartproductList[j].product_name,
                                        price:cartproductList[j].price,
                                        quantity:params.productDetails[i].quantity,
                                        product_image:cartproductList[j].product_image
                                 
                                    }); 
                                }
                            }
                           
                            var savedRecord = await cartList.save(); 
                        }
                }
                return savedRecord;
                }
                catch (e) {
                   console.log(e);
                throw Error('Server Error');
                   
               }
        }
        exports.getcartproductservice = async function (params){
         
           
            try {  
                var cartproductList = await cartDetails.findAll({
                    where: {
                        user_id:params.user_id
                    },
                    include: [{
                        model: Unitcost,
                        required: false,
                        // attributes: ['id','firstname','lastname','email','mobile']
                        
                    }],
                })

                let total = 0;
                for (var i = 0; i < cartproductList.length; i++) {
                    if (cartproductList[i].price) {
                        total +=((+(cartproductList[i].price)) * cartproductList[i].quantity);
                    }
                }
                var cartproductlength = cartproductList.length;
                // return total;
                var totalprice = {totalamount:total,count:cartproductlength};
                cartproductList.push(totalprice);
                return cartproductList;
                
            }
            catch (e) {
               console.log(e);
            throw Error('Server Error');
               
           }
    }
    exports.searchmyorderproductservice = async function (params){
        try { 
                    var productList = await OrderDetails.findAll({
                  
                        where: {
                            user_id:params.user_id,
                            status:1,
                            [Op.or]: {
                                product_name: {
                                  [Op.like]: '%'+params.search+'%'
                                },
                                totalamount: {
                                    [Op.like]: '%'+params.search+'%'
                                  },
                            }}
                        
                    
                   });   
   
            return productList;
            }
            catch (e) {
               console.log(e);
            throw Error(e);
               
           }
    }
    exports.searchdeliveredservice = async function (params){
        try { 
                    var productList = await OrderDetails.findAll({
                  
                        where: {
                            user_id:params.user_id,
                            status:2,
                            [Op.or]: {
                                product_name: {
                                  [Op.like]: '%'+params.search+'%'
                                },
                                totalamount: {
                                    [Op.like]: '%'+params.search+'%'
                                  },
                            }}
                        
                    
                   });   
   
            return productList;
            }
            catch (e) {
               console.log(e);
            throw Error(e);
               
           }
    }
    exports.searchcancelledservice = async function (params){
        try { 
                    var productList = await OrderDetails.findAll({
                  
                        where: {
                            user_id:params.user_id,
                            status:3,
                            [Op.or]: {
                                product_name: {
                                  [Op.like]: '%'+params.search+'%'
                                },
                                totalamount: {
                                    [Op.like]: '%'+params.search+'%'
                                  },
                            }}
                        
                    
                   });   
   
            return productList;
            }
            catch (e) {
               console.log(e);
            throw Error(e);
               
           }
    }
    exports.searchorderhistoryservice = async function (params){
        try { 
                    var productList = await OrderDetails.findAll({
                  
                        where: {
                            [Op.and]: {
                                [Op.or]:{
                                product_name: {
                                  [Op.like]: '%'+params.search+'%'
                                },
                                username: {
                                    [Op.like]: '%'+params.search+'%'
                                  },
                                  useremail: {
                                    [Op.like]: '%'+params.search+'%'
                                  },
                                  order_id: {
                                    [Op.like]: '%'+params.search+'%'
                                  },
                                  ordered_date: {
                                    [Op.like]: '%'+params.search+'%'
                                  },
                                  delivered_date: {
                                    [Op.like]: '%'+params.search+'%'
                                  },
                                  cancelled_date: {
                                    [Op.like]: '%'+params.search+'%'
                                  }
                                },
                                [Op.and]:{
                                  status: {
                                    [Op.like]: '%'+params.status+'%'
                                  }
                                },

                            }},
                            group: ['order_id'],
                            order: [
                                ['id', 'DESC']
                            ]
                        
                    
                   });   
   
            return productList;
            }
            catch (e) {
               console.log(e);
            throw Error(e);
               
           }
    }
    exports.removecartproductservice = async function (params){
         
        try {  
            var removecartproductList  = cartDetails.destroy({
           
                where: {
                    // $and: [{
                    //     user_id:params.user_id
                    // }, {
                        product_id:params.product_id
                    // }]
                },

        // truncate: true
    })
           
            return removecartproductList;
            
        }
        catch (e) {
           console.log(e);
        throw Error(e);
           
       }
}
exports.updatecartquantityservice = async function (params){
         
    try {  
        var updatecartproductList  = await cartDetails.update({
            quantity:params.quantity,
        },
        {
            where: {
                    id:params.id
            },

})
       
        return updatecartproductList;
        
    }
    catch (e) {
       console.log(e);
    throw Error(e);
       
   }
}
exports.statuschangefororderservice = async function (params){
         
    try {  
        // status = 1 --->processing
         // status = 2 --->shipped
          // status = 3 --->delivered

          // status = 4 --->cancelled
          if(params.status == "1"){
            var processing_date = new Date();
            var date = processing_date.getFullYear()+'-'+(processing_date.getMonth()+1)+'-'+processing_date.getDate();
            var time = processing_date.getHours() + ":" + processing_date.getMinutes() + ":" + processing_date.getSeconds();
            var processing_time = date+' '+time;
          }
          else if(params.status == "2"){
            var shipped_date = new Date();
            var date = shipped_date.getFullYear()+'-'+(shipped_date.getMonth()+1)+'-'+shipped_date.getDate();
            var time = shipped_date.getHours() + ":" + shipped_date.getMinutes() + ":" + shipped_date.getSeconds();
            var shipped_time = date+' '+time;
          }
          else if(params.status == "3"){
            var delivered_date = new Date();
            var date = delivered_date.getFullYear()+'-'+(delivered_date.getMonth()+1)+'-'+delivered_date.getDate();
            var time = delivered_date.getHours() + ":" + delivered_date.getMinutes() + ":" + delivered_date.getSeconds();
            var delivered_time = date+' '+time;
          }
          else if(params.status == "4"){
            var cancelled_date = new Date();
            var date = cancelled_date.getFullYear()+'-'+(cancelled_date.getMonth()+1)+'-'+cancelled_date.getDate();
            var time = cancelled_date.getHours() + ":" + cancelled_date.getMinutes() + ":" + cancelled_date.getSeconds();
            var cancelled_time = date+' '+time;
          }
          else{
            var completed_date = new Date();
            var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
            var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            var completed_time = date+' '+time;
          }
        
        var updatecartproductList  = await OrderDetails.update({
            status:params.status,
            processing_date:processing_date,
            processing_time:processing_time,
            shipped_date:shipped_date,
            shipped_time:shipped_time,
            delivered_date:delivered_date,
            delivered_time:delivered_time,
            cancelled_date:cancelled_date,
            cancelled_time:cancelled_time,
            completed_date:completed_date,
            notes:params.notes
        },
        {
            where: {
                order_id:params.order_id
            },

        })
        var userdetailsorder = await OrderDetails.findOne({
            where: {
                order_id:params.order_id
            },
        })
      
        var userdetails = await User.findAll({
            where: {
                id:userdetailsorder.user_id
            },
        })
        var getorderdetails=await OrderDetails.findOne({

        },{
            where:{
                order_id:params.order_id
            }
        }
        );
            var notificationdata=Notification.build({
                sender_id:getorderdetails.user_id,
                receiver_id:'6',
                notify_type:'orderstatusChange',
                read_status:'0',
                message:'The order status has been changed',
                url:'orders',
                inserted_id:params.order_id
            });
        var notificationsave = await notificationdata.save();
        // console.log(userdetails);
        var returndata = {'user':userdetails[0],'status':params.status,'order_id':params.order_id,'userdetailsorder':userdetailsorder}
        return returndata;
        
    }
    catch (e) {
    //    console.log(e);
    throw Error(e);
       
   }
}

exports.ordercancelbyuserservice = async function (params){
    var cancelled_date = new Date();
    var date = cancelled_date.getFullYear()+'-'+(cancelled_date.getMonth()+1)+'-'+cancelled_date.getDate();
    var time = cancelled_date.getHours() + ":" + cancelled_date.getMinutes() + ":" + cancelled_date.getSeconds();
    var cancelled_time = date+' '+time;
    try { 
        var updatecartproductList  = await OrderDetails.update({
            status:4,
            cancelled_date:cancelled_date,
            cancelled_time:cancelled_time
        },
        {
            where: {
                order_id:params.order_id
            },

        })
       
        return updatecartproductList;
        }
        catch (e) {
           console.log(e);
        throw Error(e);
           
       }
}
exports.getpendingorderservice = async function (params){
    try { 
           if(params.user_id){
            var productList = await OrderDetails.findAll({
                where: {
                    user_id:params.user_id,
                    status:0
                },
                order: [
                    ['id', 'DESC']
                ]
             
            });   

            const sorted = productList.reduce((result, items) => {
                const a = result.find(({order_id}) => order_id === items.order_id);
                a ? a.items.push(items) : result.push({order_id: items.order_id,priceperproduct:items.priceperproduct,totalamount:items.totalamount,
                    cancelled_date:items.cancelled_date,cancelled_time:items.cancelled_time,created_at:items.created_at,customer_id:items.customer_id,
                    delivered_date:items.delivered_date,delivered_time:items.delivered_time,id:items.id,ordered_date:items.ordered_date,ordered_time:items.ordered_time,
                    processing_date:items.processing_date,processing_time:items.processing_time,payment_type:items.payment_type,
                    product_id:items.product_id,product_image:items.product_image,product_name:items.product_name,quantity:items.quantity,
                    status:items.status,updated_at:items.updated_at,user_id:items.user_id,
                    items: [items]});
                  
                return result;
            }, []);

        return sorted;
           }
           else{
            var productList = await OrderDetails.findAll({
                  
                where: {
                    [Op.and]: {
                        [Op.or]:{
                        product_name: {
                          [Op.like]: '%'+params.search+'%'
                        },
                        username: {
                            [Op.like]: '%'+params.search+'%'
                          },
                          useremail: {
                            [Op.like]: '%'+params.search+'%'
                          },
                          order_id: {
                            [Op.like]: '%'+params.search+'%'
                          },
                          ordered_date: {
                            [Op.like]: '%'+params.search+'%'
                          },
                          delivered_date: {
                            [Op.like]: '%'+params.search+'%'
                          },
                          cancelled_date: {
                            [Op.like]: '%'+params.search+'%'
                          }
                        },
                        [Op.and]:{
                          status: {
                            [Op.like]: '%'+params.status+'%'
                          }
                        },

                    }},
                    order: [
                        ['id', 'DESC']
                    ]
                
            
           });   

    return productList;
           }
         
        }
        catch (e) {
           console.log(e);
        throw Error(e);
           
       }
}
exports.getprocessingorderservice = async function (params){
    try { 
           if(params.user_id){
            var productList = await OrderDetails.findAll({
                where: {
                    user_id:params.user_id,
                    status:[0,1,2]
                },
                order: [
                    ['id', 'DESC']
                ]
             
            });   

            const sorted = productList.reduce((result, items) => {
                const a = result.find(({order_id}) => order_id === items.order_id);
                a ? a.items.push(items) : result.push({order_id: items.order_id,priceperproduct:items.priceperproduct,totalamount:items.totalamount,
                    cancelled_date:items.cancelled_date,cancelled_time:items.cancelled_time,created_at:items.created_at,customer_id:items.customer_id,
                    delivered_date:items.delivered_date,delivered_time:items.delivered_time,id:items.id,ordered_date:items.ordered_date,ordered_time:items.ordered_time,
                    processing_date:items.processing_date,processing_time:items.processing_time,payment_type:items.payment_type,
                    product_id:items.product_id,product_image:items.product_image,product_name:items.product_name,quantity:items.quantity,
                    status:items.status,updated_at:items.updated_at,user_id:items.user_id,
                    items: [items]});
                  
                return result;
            }, []);

        return sorted;
           }
           else{
            var productList = await OrderDetails.findAll({
                where: {
                    status:[0,1,2]
            },
                order: [
                    ['id', 'DESC']
                ]
             
            });   

            const sorted = productList.reduce((result, items) => {
                const a = result.find(({order_id}) => order_id === items.order_id);
                a ? a.items.push(items) : result.push({order_id: items.order_id,priceperproduct:items.priceperproduct,totalamount:items.totalamount,
                    cancelled_date:items.cancelled_date,cancelled_time:items.cancelled_time,created_at:items.created_at,customer_id:items.customer_id,
                    delivered_date:items.delivered_date,delivered_time:items.delivered_time,id:items.id,ordered_date:items.ordered_date,ordered_time:items.ordered_time,
                    processing_date:items.processing_date,processing_time:items.processing_time,payment_type:items.payment_type,
                    product_id:items.product_id,product_image:items.product_image,product_name:items.product_name,quantity:items.quantity,
                    status:items.status,updated_at:items.updated_at,user_id:items.user_id,
                    items: [items]});
                  
                return result;
            }, []);
        return sorted;
           }
         
        }
        catch (e) {
           console.log(e);
        throw Error(e);
           
       }
}
exports.getdeliveredorderservice = async function (params){
    try { 
           if(params.user_id){
            var productList = await OrderDetails.findAll({
                where: {
                        user_id: params.user_id,
                        status:3,
                },
                order: [
                    ['id', 'DESC']
                ]
             
            });   
            const sorted = productList.reduce((result, items) => {
                const a = result.find(({order_id}) => order_id === items.order_id);
                a ? a.items.push(items) : result.push({order_id: items.order_id,priceperproduct:items.priceperproduct,totalamount:items.totalamount,
                    cancelled_date:items.cancelled_date,cancelled_time:items.cancelled_time,created_at:items.created_at,customer_id:items.customer_id,
                    delivered_date:items.delivered_date,delivered_time:items.delivered_time,id:items.id,ordered_date:items.ordered_date,ordered_time:items.ordered_time,
                    processing_date:items.processing_date,processing_time:items.processing_time,payment_type:items.payment_type,
                    product_id:items.product_id,product_image:items.product_image,product_name:items.product_name,quantity:items.quantity,
                    status:items.status,updated_at:items.updated_at,user_id:items.user_id,
                    items: [items]});
                return result;
            }, []);

        return sorted;
           }
           else{
            var productList = await OrderDetails.findAll({
                where: {
                        status:3,
                },
                order: [
                    ['id', 'DESC']
                ]
             
            });   
            const sorted = productList.reduce((result, items) => {
                const a = result.find(({order_id}) => order_id === items.order_id);
                a ? a.items.push(items) : result.push({order_id: items.order_id,priceperproduct:items.priceperproduct,totalamount:items.totalamount,
                    cancelled_date:items.cancelled_date,cancelled_time:items.cancelled_time,created_at:items.created_at,customer_id:items.customer_id,
                    delivered_date:items.delivered_date,delivered_time:items.delivered_time,id:items.id,ordered_date:items.ordered_date,ordered_time:items.ordered_time,
                    processing_date:items.processing_date,processing_time:items.processing_time,payment_type:items.payment_type,
                    product_id:items.product_id,product_image:items.product_image,product_name:items.product_name,quantity:items.quantity,
                    status:items.status,updated_at:items.updated_at,user_id:items.user_id,
                    items: [items]});
                return result;
            }, []);

        return sorted;
           }
        }
        catch (e) {
           console.log(e);
        throw Error(e);
           
       }
}
exports.getcancelledorderservice = async function (params){
    try { 
           
    if(params.user_id){
        var productList = await OrderDetails.findAll({
            where: {
                    user_id: params.user_id,
                    status:4
            },
            order: [
                ['id', 'DESC']
            ]
         
        });   

        const sorted = productList.reduce((result, items) => {
            const a = result.find(({order_id}) => order_id === items.order_id);
            a ? a.items.push(items) : result.push({order_id: items.order_id,priceperproduct:items.priceperproduct,totalamount:items.totalamount,
                cancelled_date:items.cancelled_date,cancelled_time:items.cancelled_time,created_at:items.created_at,customer_id:items.customer_id,
                delivered_date:items.delivered_date,delivered_time:items.delivered_time,id:items.id,ordered_date:items.ordered_date,ordered_time:items.ordered_time,
                processing_date:items.processing_date,processing_time:items.processing_time,payment_type:items.payment_type,
                product_id:items.product_id,product_image:items.product_image,product_name:items.product_name,quantity:items.quantity,
                status:items.status,updated_at:items.updated_at,user_id:items.user_id,
                items: [items]});
            return result;
        }, []);

    return sorted;
    }
    else{
        var productList = await OrderDetails.findAll({
            where: {
                    status:4
            },
            order: [
                ['id', 'DESC']
            ]
         
        });   

        const sorted = productList.reduce((result, items) => {
            const a = result.find(({order_id}) => order_id === items.order_id);
                a ? a.items.push(items) : result.push({order_id: items.order_id,priceperproduct:items.priceperproduct,totalamount:items.totalamount,
                    cancelled_date:items.cancelled_date,cancelled_time:items.cancelled_time,created_at:items.created_at,customer_id:items.customer_id,
                    delivered_date:items.delivered_date,delivered_time:items.delivered_time,id:items.id,ordered_date:items.ordered_date,ordered_time:items.ordered_time,
                    processing_date:items.processing_date,processing_time:items.processing_time,payment_type:items.payment_type,
                    product_id:items.product_id,product_image:items.product_image,product_name:items.product_name,quantity:items.quantity,
                    status:items.status,updated_at:items.updated_at,user_id:items.user_id,
                    items: [items]});
            return result;
        }, []);

    return sorted;
    }
        }
        catch (e) {
           console.log(e);
        throw Error(e);
           
       }
}
exports.getcompletedorderservice = async function (params){
    try { 
           
    if(params.user_id){
        var productList = await OrderDetails.findAll({
            where: {
                    user_id: params.user_id,
                    status:5
            },
            order: [
                ['id', 'DESC']
            ]
         
        });   

        const sorted = productList.reduce((result, items) => {
            const a = result.find(({order_id}) => order_id === items.order_id);
            a ? a.items.push(items) : result.push({order_id: items.order_id,priceperproduct:items.priceperproduct,totalamount:items.totalamount,
                cancelled_date:items.cancelled_date,cancelled_time:items.cancelled_time,created_at:items.created_at,customer_id:items.customer_id,
                delivered_date:items.delivered_date,delivered_time:items.delivered_time,id:items.id,ordered_time:items.ordered_time,payment_type:items.payment_type,
                product_id:items.product_id,product_image:items.product_image,product_name:items.product_name,quantity:items.quantity,
                status:items.status,updated_at:items.updated_at,user_id:items.user_id,
                items: [items]});
            return result;
        }, []);

    return sorted;
    }
    else{
        var productList = await OrderDetails.findAll({
            where: {
                    status:5
            },
            order: [
                ['id', 'DESC']
            ]
         
        });   

        const sorted = productList.reduce((result, items) => {
            const a = result.find(({order_id}) => order_id === items.order_id);
            a ? a.items.push(items) : result.push({order_id: items.order_id,priceperproduct:items.priceperproduct,totalamount:items.totalamount,
                cancelled_date:items.cancelled_date,cancelled_time:items.cancelled_time,created_at:items.created_at,customer_id:items.customer_id,
                delivered_date:items.delivered_date,delivered_time:items.delivered_time,id:items.id,ordered_time:items.ordered_time,payment_type:items.payment_type,
                product_id:items.product_id,product_image:items.product_image,product_name:items.product_name,quantity:items.quantity,
                status:items.status,updated_at:items.updated_at,user_id:items.user_id,
                items: [items]});
            return result;
        }, []);

    return sorted;
    }
        }
        catch (e) {
           console.log(e);
        throw Error(e);
           
       }
}
exports.productreviewservice = async function (params) {
    var data = Review.build({
        product_id: params.product_id,
        user_id:params.user_id,
        order_id:params.orderId,
        rating:params.rating,
        ratingcomments:params.ratingcomments,
        status: 0,
    })
    try{
        var updatereviewstatus = await OrderDetails.update({
            review_status:1,
        },
        {
            where: {
                id:params.order_id,
                user_id:params.user_id
            }
         
        }); 
        var savedRecord = await data.save();
        return savedRecord;
    }
    catch (e) {
        throw Error(e)
    }

}
exports.getproductreviewservice = async function (params) {

    var reviewProduct = await Review.findAll({
                    include: [
                        {
                            model: User,
                            required: false,                           
                        },
                        {
                            model: Product,
                            required: false,
                        }
                    ],
                order: [
                    ['id', 'DESC']
                ]

        });
    try{
        return reviewProduct;
    }
    catch (e) {
        throw Error(e)
    }
}
exports.getsingleproductreviewservice = async function (params) {

    var reviewProduct = await Review.findOne({
        where:{
            order_id:params.order_id
        },
        });
    try{
        return reviewProduct;
    }
    catch (e) {
        throw Error(e)
    }
}
exports.viewsingleproductreviewservice = async function (params) {
    var reviewProduct = await Review.findAll({
                        where:{id:params.id},
                    include: [{
                            model: User,
                            required: false,
                            attributes: ['id','firstname','lastname','email','mobile']
                            
                        },
                        {
                            model: Product,
                            required: false,
                            // attributes: ['id','firstname','lastname','email','mobile']
                        }
                    ],
        order: [
            ['id', 'DESC']
        ]

        });
    try{
        return reviewProduct;
    }
    catch (e) {
        throw Error(e)
    }
}
exports.quantityavailcheckservice = async function (params) {
    var qty = +params.quantity; 
    var singleproduct = await Unitcost.findAll({
            
        where:{id:params.id}

        });
        var exixtingqty = +singleproduct[0].availablequantityperunits; 
    try{
        if(qty > exixtingqty){
           throw Error("Your selected unit quantity is more than available quantity...");
        }
        else{
            return "true";
        }
    }
    catch (e) {
        throw Error(e)
    }

}

exports.getordersforreportservice = async function (params) {
    var orders = await OrderDetails.findAll({
        include: [{
            model: User,
            required: false,
            
        }],

        });
    try{
      return orders;
    }
    catch (e) {
        throw Error(e)
    }

}