var db = require('../shared/config');
var OrderDetails = require('../models/order.model');
var Review = require('../models/review.model');

const sequelize = db.sequelize;  
const Sequelize = db.Sequelize;

var User = sequelize.define('users', {
    id: {
        type: Sequelize.INTEGER(11).UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    firstname: {
        type: Sequelize.STRING(255),
        allowNull: true, 
        validate: {
            len: {
                args: 3,
                msg: "Name must be atleast 3 characters in length"
            }
        }
    },
    lastname: {
        type: Sequelize.STRING(255),
        allowNull: true
    },
    username: {
        type: Sequelize.STRING(255),
        allowNull: true
    },
    email: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: {
            args: true,
            msg: 'Email address already in use!'
        },
        validate: {
                isEmail: {
                    msg: "Email address must be valid"
                }
            }
    },
    password: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    
    mobile: {
        type: Sequelize.STRING(15),
        allowNull: true,
        unique: {
            args: true,
            msg: 'Mobile number already in use!'
        },
    },
    profile_image: {
        type: Sequelize.STRING(255),
        allowNull: true
    },
    otp:{
        type: Sequelize.TINYINT(4).UNSIGNED,
    },
    user_type: {
        type: Sequelize.INTEGER(11).UNSIGNED,
        allowNull: true,
    },
    reset_password_token: {
        type: Sequelize.TEXT(),
        allowNull: true
    },
    reset_password_expires: {
        type: Sequelize.DATE
    },
    created_at: Sequelize.DATE,
    updated_at: Sequelize.DATE,
}, {
    tableName: "users",
    createdAt: "created_at",
    updatedAt: "updated_at"
})

User.hasMany(OrderDetails, {foreignKey: 'id'});
OrderDetails.belongsTo(User, {foreignKey: 'user_id'});

User.hasMany(Review, {foreignKey: 'id'});
Review.belongsTo(User, {foreignKey: 'user_id'});

User.sync({force:false,alter:false});

module.exports = User;