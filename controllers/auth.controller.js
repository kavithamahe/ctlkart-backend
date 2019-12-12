var _service = require('../services/auth.service'); 
var jwt = require('jsonwebtoken');  
var bcrypt = require('bcryptjs');  
var db = require('../shared/config');  
var validateErr = require('../utils/validateError');

var config = db.config;

var Pusher = require('pusher');

var pusher = new Pusher({
    appId: '915486',
    key: '65ddc2fa9aadcddeb731',
    secret: 'f491033379612edd35b3',
    encrypted: true,
    cluster: 'ap2',
  });

exports.register = async function (req, res, next) {

    try {
        var createdRecord = await _service.createuser(req.body)

        const titles = [];
        let title = "CTLKART";
        let body = createdRecord.firstname + "is added in ctlkart";
        
          titles.push(title.trim());
          pusher.trigger('realtime-feeds', 'posts', {
            title: title.trim(),
            body: body.trim(),
            time: new Date(),
          });
        
        //   res
        //     .status(200)
        //     .send({ message: 'Post was successfully created', status: true });
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
exports.adminregister = async function (req, res, next) {

    try {
        var createdRecord = await _service.createuseradmin(req.body)
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
exports.getprofile = async function (req,res,next) {
    try{
        var createdRecord = await _service.getprofileservice(req.body)
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
exports.editprofile = async function (req, res, next) {

    try {
        var createdRecord = await _service.edituser(req.body,req)
        return res.status(201).json({
            status: 201,
            success: true,
            message: "Successfully Updated"
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
exports.deleteaccount = async function (req, res, next) {

    try {
        var createdRecord = await _service.deleteaccountservice(req.body)
        return res.status(201).json({
            status: 201,
            success: true,
            message: "Successfully Delete Acoount From Ctlkart"
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
exports.authenticate = async function (req, res, next) { 
    try {
        var user = await _service.authenticate(req.body.email,req.body.device_token);
 
 
        if (!user) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "Invalid username or password"
            });
        } else {
          
 
            var validPassword = bcrypt.compareSync(req.body.password, user.password)
 
            if (!validPassword) {
                return res.status(400).json({
                    status: 400,
                    success: false,
                    message: "Invalid username or password"
                })
 
            } else {
                if(user.otp == 1){
 
 
                var token = jwt.sign({
                    'user': user
                }, config.secret, {
                    expiresIn: config.tokenLife // expires in 12 hours
                });
                var refreshToken = jwt.sign(user, config.refreshTokenSecret, {
                    expiresIn: '365d'
                })
 
 
                return res.status(200).json({
                    userid:user.id,
                    username:user.firstname,
                    gender:user.gender,
                    email:user.email,
                    mobile:user.mobile,
                    user_type:user.user_type,
                    status: 200, 
                    success: true,
                    token: token,
                    refreshToken: refreshToken,
                    message: "Authentication Successfull"
                })
            }
              else{ 
                var token = jwt.sign({
                    'user': user
                }, config.secret, {
                    expiresIn: config.tokenLife // expires in 12 hours
                });
                var refreshToken = jwt.sign(user, config.refreshTokenSecret, {
                    expiresIn: '365d'
                })
            return res.status(401).json({
                   name:user.firstname,
                   email:user.email,
                   mobile:user.mobile,
                   token: token,
                   refreshToken: refreshToken,
                   userid:user.id,
                   message: "Your number is not verified"
                })
 
        }
            }
      
    }
    } catch (e) {
        var err = await validateErr.validateError(e);
        return res.status(400).json({
            status: 400,
            success: false,
            message: err
        });
 
    }
 
 }
 exports.adminlogin = async function (req, res, next) { 
    try {
        var user = await _service.adminloginservice(req.body.email);
 
 
        if (!user) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "Invalid username or password"
            });
        } else {
 
            var validPassword = bcrypt.compareSync(req.body.password, user.password)
 
            if (!validPassword) {
                return res.status(400).json({
                    status: 400,
                    success: false,
                    message: "Invalid username or password"
                })
 
            } else {
 
                var token = jwt.sign({
                    'user': user
                }, config.secret, {
                    expiresIn: config.tokenLife // expires in 12 hours
                });
                var refreshToken = jwt.sign(user, config.refreshTokenSecret, {
                    expiresIn: '365d'
                })
 
 
                return res.status(200).json({
                    userid:user.id,
                    firstname:user.firstname,
                    lastname:user.lastname,
                    email:user.email,
                    mobile:user.mobile,
                    status: 200, 
                    success: true,
                    token: token,
                    refreshToken: refreshToken,
                    message: "Authentication Successfull"
                })
 
            }
    }
    } catch (e) {
        var err = await validateErr.validateError(e);
        return res.status(400).json({
            status: 400,
            success: false,
            message: err
        });
 
    }
 
 }
 exports.onetimepassword = async function (req, res, next) { 


    try {
 
 
        var createdRecord = await _service.otp(req.body)
        return res.status(201).json({
            status: 201,
            data: createdRecord,
            success: true,
            message: "otp send successfully"
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

 exports.forgotPassword = async function (req, res, next) {

    try {

        var email = req.body.email;

        var user = await _service.authenticate(email);

        if (!email) {

            return res.status(400).json({
                status: 400,
                success: false,
                message: "Email required"
            });
        }

        if (!user) {

            return res.status(400).json({
                status: 400,
                success: false,
                message: "Invalid user"
            });
        } else {

            var record = await _service.updateForgotPassword(email);

            return res.status(202).json({
                status : 202,
                success: true,
                message: "We have sent a new password to your registered email"
            })

        }

    } catch (e) {
        var err = await validateErr.validateError(e);
        return res.status(400).json({
            status: 400,
            success: false,
            message: err
        });

    }
}
 exports.changePassword = async function (req, res, next) {

    try {

        var currentPassword = req.body.current_password;
        var newPassword = req.body.new_password;
        var confirmPassword = req.body.confirm_password;

        if (newPassword != confirmPassword) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "Your newpassword and confirm password should same!"
            });
        }

        var user = await _service.getUser(req);


        var validPassword = bcrypt.compareSync(currentPassword, user.password);

        if (!validPassword) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "Authentication failed. Wrong your current password "
            })

        } else {
            var record = await _service.updatePassword(user.id, newPassword);

            return res.status(202).json({
                status: 202,
                success: true,
                message: "Your new password has been changed successfully!"
            })

        }

    } catch (e) {
        var err = await validateErr.validateError(e);        
        return res.status(400).json({
            status: 400,
            success: false,
            message: err
        });

    }
}

exports.getusers= async function (req,res,next) {
    try{
        var createdRecord = await _service.getusersservice(req.body)
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
exports.getcurrency= async function (req,res,next) {
    try{
        var createdRecord = await _service.getcurrencyservice(req.body)
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

exports.getuserssearch = async function (req,res,next) {
    try{
        var createdRecord = await _service.getuserssearchservice(req.body)
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
exports.adduserszipcode = async function (req,res,next) {
    try{
        var createdRecord = await _service.adduserszipcodeservice(req.body)
        return res.status(200).json({
            status: 200,
            data: createdRecord,
            message:"Added Successfully"
        })
    }
    catch(e){
        var err = await validateErr.validateError(e);
        if(err == " Validation error"){
            var msg = "Zipcode Already Exists";
        }
        else{
            var msg = err;
        }
        return res.status(400).json({
            status: 400,
            success: false,
            message: msg
        })
    }
}

exports.getuserszipcode = async function (req,res,next) {
    try{
        var createdRecord = await _service.getuserszipcodeservice(req.body)
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
exports.getsinglezipcode = async function (req,res,next) {
    try{
        var createdRecord = await _service.getsinglezipcodeservice(req.body)
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
exports.searchuserszipcode = async function (req,res,next) {
    try{
        var createdRecord = await _service.searchuserszipcodeservice(req.body)
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

exports.edituserszipcode = async function (req,res,next) {
    try{
        var createdRecord = await _service.edituserszipcodeservice(req.body)
        return res.status(200).json({
            status: 200,
            data: createdRecord,
            message:"Updated Successfully"
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

exports.removeuserszipcode = async function (req,res,next) {
    try{
        var createdRecord = await _service.removeuserszipcodeservice(req.body)
        return res.status(200).json({
            status: 200,
            data: createdRecord,
            message:"Removed Successfully"
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
exports.addunits = async function (req,res,next) {
    try{
        var createdRecord = await _service.addunitsservice(req.body)
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

exports.editunit = async function (req,res,next) {
    try{
        var createdRecord = await _service.editunitservice(req.body)
        return res.status(200).json({
            status: 200,
            message:"Updated Successfully"
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

exports.removeunits = async function (req,res,next) {
    try{
        var createdRecord = await _service.removeunitsservice(req.body)
        return res.status(200).json({
            status: 200,
            data: createdRecord,
            message:"Removed Successfully"
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
exports.getallunits = async function (req,res,next) {
    try{
        var createdRecord = await _service.getallunitsservice(req.body)
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
exports.getsingleunit = async function (req,res,next) {
    try{
        var createdRecord = await _service.getsingleunitservice(req.body)
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

exports.updatepages = async function (req,res,next) {
    try{
        var createdRecord = await _service.updatepagesservice(req.body)
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
exports.getpages = async function (req,res,next) {
    try{
        var createdRecord = await _service.getpagesservice(req.body)
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
exports.getsinglepages = async function (req,res,next) {
    try{
        var createdRecord = await _service.getsinglepagesservice(req.body)
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



