var jwt_decode = require('jwt-decode');

var User = require('../models/user.model');

var AdminUser = require('../models/adminuser.model');

var Zipcode = require('../models/zipcodedetails.model');

var Units = require('../models/units.model');

var bcrypt = require('bcryptjs');  

var db = require('../shared/config');

var nodemailer = require('nodemailer');

const TokenGenerator = require('uuid-token-generator'); 

var fs = require("fs");

var Sequelize = require('sequelize');

var cc = require('currency-codes');

const getSymbolFromCurrency = require('currency-symbol-map')

// console.log(cc.countries());

const tokgen2 = new TokenGenerator(256, TokenGenerator.BASE62); 
const Op = Sequelize.Op;
var config = db.config; 

_this = this 
  
exports.getUser = async function(req){
     var token = '';
      try {       
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            token =  req.headers.authorization.split(' ')[1];
        } else if (req.query && req.query.token) {
            token =  req.query.token;
        }
        var user = jwt_decode(token);             
        return user;
    } catch (e) {
        console.log(e);
        throw Error('Error while getCurrent user')        
    }    

}

exports.createuser = async function (params) {
var username = params.firstname + " " + params.lastname;
    var record = User.build({
        firstname: params.firstname,
        lastname: params.lastname,
        username:username,
        email: params.email,
        mobile: params.mobile,
        password: bcrypt.hashSync(params.password, 10),
        
    })

    try {
    
        var savedRecord = await record.save();
        // if(params.mobileapp == undefined){
    //         var otpupdate = await User.update({
    //             otp:1
    //         },
    //      {where: { id: savedRecord.dataValues.id}}
        
    //    );
        // }
         return savedRecord;
    } catch (e) {
        
        throw Error(e)
    }
}
exports.createuseradmin = async function (params) {

    var record = AdminUser.build({
        firstname: params.firstname,
        lastname: params.lastname,
        email: params.email,
        mobile: params.mobile,
        password: bcrypt.hashSync(params.password, 10),
        
    })

    try {
    
        var savedRecord = await record.save();
         return savedRecord;
    } catch (e) {
        
        throw Error(e)
    }
}
exports.getprofileservice = async function (params){
    try {       
        var profileDetail = await User.findAll({
    
        where:{id:params.user_id}

        });

        return profileDetail;
        }
        catch (e) {
           console.log(e);
        throw Error('Server Error');
           
       }
}
    function decodeBase64Image(dataString) 
    {
      var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
      var response = {};

      if (matches.length !== 3) 
      {
        return new Error('Invalid input string');
      }

      response.type = matches[1];
      response.data = new Buffer(matches[2], 'base64');

      return response;
    }
exports.edituser = async function(get_user,uploading){
    var username = get_user.firstname + " " + get_user.lastname;
    if(get_user.base64Image){
    var imageTypeRegularExpression      = /\/(.*?)$/;      

    var crypto                          = require('crypto');
    var seed                            = crypto.randomBytes(20);
    var uniqueSHA1String                = crypto
                                           .createHash('sha1')
                                            .update(seed)
                                             .digest('hex');

    var base64Data = get_user.base64Image;

    var imageBuffer                      = decodeBase64Image(base64Data);
    var userUploadedFeedMessagesLocation = './uploads/';

    var uniqueRandomImageName            = 'image-' + uniqueSHA1String;
    var imageTypeDetected                = imageBuffer
                                            .type
                                             .match(imageTypeRegularExpression);
    var profile_image                   =  uniqueRandomImageName +
                                            '.' + 
                                            imageTypeDetected[1];                                        

    var userUploadedImagePath            = userUploadedFeedMessagesLocation + 
                                           uniqueRandomImageName +
                                           '.' + 
                                           imageTypeDetected[1];

    try
    {
    require('fs').writeFile(userUploadedImagePath, imageBuffer.data,  
                            function() 
                            {
                              console.log('DEBUG - feed:message: Saved to disk image attached by user:', userUploadedImagePath);
                            }
                        );
                        var editUser = await User.update({
                            firstname: get_user.firstname,
                            lastname: get_user.lastname,
                            username:username,
                            email: get_user.email,
                            mobile: get_user.mobile,
                            profile_image: profile_image

                    },
                    {where: { id: get_user.id}}
                    
                     );

                    return editUser;
                }
                catch(error)
                {
                    console.log('ERROR:', error);
                }
            }
            else{
                try
                {
                                    var editUser = await User.update({
                                        firstname: get_user.firstname,
                                        lastname: get_user.lastname,
                                        email: get_user.email,
                                        mobile: get_user.mobile,
            
                                },
                                {where: { id: get_user.id}}
                                
                                 );
            
                                return editUser;
                            }
                            catch(error)
                            {
                                console.log('ERROR:', error);
                            }
            }
}
   exports.deleteaccountservice= async function(get_user){
    try {   

        var deleteUser = User.destroy({
     where: { id: get_user.id}}
    
   );

      return deleteUser;
     }
   
        catch (e) {
           console.log(e);

           throw Error(e)
           
       }
   }
exports.authenticate = async function (email,device_token) {
    var record = User.update({
                
        device_token: device_token },
        {where: { 
            email: email
            }
    } 
    )
        try {
           console.log(email)
            var user = User.findOne({
                where: {
                    // $or: [{
                        email: email
                    // }, {
                        // mobile: email
                    // }]
                }


            }).then(res => {

                if (res) {
                   
                    return res.dataValues;
                }
            })
                 
            return user;         

       } catch (e) {
            throw Error(e)
        }
    }
    exports.adminloginservice = async function (email) {

        try {
           console.log(email)
            var user = AdminUser.findOne({
                where: {
                    // $or: [{
                        email: email
                    // }, {
                        // mobile: email
                    // }]
                }


            }).then(res => {

                if (res) {
                   
                    return res.dataValues;
                }
            })
                 
            return user;
            console.log(user)
            

       } catch (e) {
            throw Error('Error while Paginating listsssss')
        }
    }
    exports.otp = async function(otpchecking){
        try{
          

        var record = User.update({
                
                otp:otpchecking.otp },
                { 
                    where: {
                            mobile:otpchecking.mobile
                    },
        })
        console.log(record)
        } catch (e) {
                console.log(e);

                throw Error('otp is not send')
                
            }
        }
    exports.updateForgotPassword = async function (email) {

        try {

          var randomnumber = Math.floor(100000 + Math.random() * 900000);
          var randomNumberString=randomnumber.toString();

            var user = User.findOne({
                where: {
                        email: email
                }
            }).then(res => {



                res.password = bcrypt.hashSync(randomNumberString,10);
                // res.password = bcrypt.hashSync(123456, 10);
                res.resetPasswordToken = tokgen2.generate();
                res.resetPasswordExpires = Date.now() + 3600000;


       
               var smtpTransport = nodemailer.createTransport({
               service:'gmail',
                 host:'smtp.gmail.com',
                 port: 587,
                 secure: false,
                  auth: {
                    user: "kavithamahe2@gmail.com",
                    pass: "kavithabe94"
                 }
             });



                var mailOptions = {
                        from: "kavithamahe2@gmail.com", // sender address
                        to: email, // list of receivers
                        subject: " Ctlkart - Your Password Has Been Reseted", // Subject line
                        text: "Congrats" , // plaintext body
                        html: "<b>Ctlkart</b> Your Request for Forgot Password Has been Accepted And Your New Password is <b>"  + randomnumber +" </b> <br><br><br> Thanks <br> Ctl Support Team" // html body
                        // html: "<b>Welcome to TCM</b>" + res.password // html body
                }
                smtpTransport.sendMail(mailOptions, function(error, response){
                    if(error){
                        console.log(error);
                    }else{
                        console.log("Message sent: " + response);
                    }

        // if you don't want to use this transport object anymore, uncomment following line
        //smtpTransport.close(); // shut down the connection pool, no more messages

                });
                    res.save();

                    return res.dataValues;

            });


            return user;

       
        } catch (e) {
            console.log(e)
            throw Error(e + 'updateForgotPassword :: Error while Paginating lists')
        }
    }
    exports.updatePassword = async function (id, password) {

        try {

           
            var user = User.findOne({
                where: {
                    id: id
                }
            }).then(res => {

                res.password = bcrypt.hashSync(password, 10);

                res.save();
                return res.dataValues;
            });

            return user;
        } catch (e) {
            throw Error(e + 'updatePassword :: Error while Paginating lists')
        }
    }

    exports.getusersservice = async function (params){
        try { 
                var userlists = await User.findAll({
                    order: [
                        ['id', 'DESC']
                    ]
            
                });
        
                return userlists;
            }
            catch (e) {
               console.log(e);
            throw Error('Server Error');
               
           }
    }
    exports.getcurrencyservice= async function (params){
        try { 
            var countries = cc.country(params.currencyvalue);
            // var countries = cc.country('United Kingdom')
            // var countries = cc.countries('India');
            console.log(countries)
            console.log(countries[0].code)
            var currency =getSymbolFromCurrency(countries[0].code);
        
                return currency;
            }
            catch (e) {
               console.log(e);
            throw Error('Server Error');
               
           }
    }
    exports.getuserssearchservice = async function (params){
        try { 
                    var userList = await User.findAll({
                  
                        where: {
                            [Op.or]: {
                                firstname: {
                                  [Op.like]: '%'+params.search+'%'
                                },
                                lastname: {
                                  [Op.like]: '%'+params.search+'%'
                                },
                                username: {
                                  [Op.like]: '%'+params.search+'%'
                                },
                                email: {
                                    [Op.like]: '%'+params.search+'%'
                                  },
                                  mobile: {
                                    [Op.like]: '%'+params.search+'%'
                                  },
                            }},
                            order: [
                                ['id', 'DESC']
                            ]
                        
                    
                   });   
   
            return userList;
            }
            catch (e) {
               console.log(e);
            throw Error(e);
               
           }
    }

    exports.adduserszipcodeservice  = async function (params){
     var data = Zipcode.build({
        location: params.location,
        zipcode: params.zipcode,
        status: 1,
    })
    try{
        var savedRecord = await data.save();
        return savedRecord;
    }
    catch (e) {
        console.log(e)
        throw Error(e)
    }
    }
  
    exports.getuserszipcodeservice  = async function (params){
        try {       
            var data = await Zipcode.findAll({
        
              order: [['id', 'DESC']]
 
            });
   
            return data;
            }
            catch (e) {
               console.log(e);
            throw Error(e);
               
           }
       }
    exports.getsinglezipcodeservice  = async function (params){
        try {       
            var data = await Zipcode.findOne({
                where: {
                    id: params.id
                }
            });
   
            return data;
            }
            catch (e) {
               console.log(e);
            throw Error(e);
               
           }
       }
       exports.searchuserszipcodeservice  = async function (params){
        try {       
            var data = await Zipcode.findAll({
                where: {
                    [Op.or]: {
                    location:{[Op.like]: '%'+params.search+'%'},
                    zipcode: {[Op.like]: '%'+params.search+'%'},
                    }
                },
                 order: [['id', 'DESC']]
            });
   
            return data;
            }
            catch (e) {
               console.log(e);
            throw Error(e);
               
           }
       }
    exports.edituserszipcodeservice  = async function (params){
      
    try{
        var data =await Zipcode.update({
            location: params.location,
            zipcode: params.zipcode,
            status: 1,
        },
        {
        where: {
            id:params.id
        }
        
        });
    return data;
    }
    catch (e) {
        throw Error(e)
    }
   }
   exports.removeuserszipcodeservice = async function (params){
    try {   

        var data = Zipcode.destroy({
            where: { id: params.id}
        });

      return data;
     }
   
        catch (e) {
           console.log(e);

           throw Error(e)
           
       }
   }

   exports.addunitsservice  = async function (params){
    var data = Units.build({
       units: params.units,
       description:params.description,
       status: 1,
   })
   try{
       var savedRecord = await data.save();
       return savedRecord;
   }
   catch (e) {
       console.log(e)
       throw Error(e)
   }
   }
   exports.editunitservice  = async function (params){
      
    try{
        var data =await Units.update({
            units: params.units,
            description:params.description,
            status: 1,
        },
        {
        where: {
            id:params.id
        }
        
        });
    return data;
    }
    catch (e) {
        throw Error(e)
    }
   }
   exports.removeunitsservice = async function (params){
    try {   

        var data = Units.destroy({
            where: { id: params.id}
        });

      return data;
     }
   
        catch (e) {
           console.log(e);

           throw Error(e)
           
       }
   }
   exports.getallunitsservice  = async function (params){
    try {       
        var data = await Units.findAll({
    
          order: [['id', 'DESC']]

        });

        return data;
        }
        catch (e) {
           console.log(e);
        throw Error(e);
           
       }
   }
exports.getsingleunitservice  = async function (params){
    try {       
        var data = await Units.findOne({
            where: {
                id: params.id
            }
        });

        return data;
        }
        catch (e) {
           console.log(e);
        throw Error(e);
           
       }
   }
