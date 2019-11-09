var db = require('../shared/config');

const sequelize = db.sequelize;  
const Sequelize = db.Sequelize;

var User = sequelize.define('adminusers', {
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
    otp:{
        type: Sequelize.TINYINT(4).UNSIGNED,
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
    tableName: "adminusers",
    createdAt: "created_at",
    updatedAt: "updated_at"
})

User.sync({force:false,alter:false});

module.exports = User;