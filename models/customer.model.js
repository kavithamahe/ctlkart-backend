var db = require('../shared/config');
var Order = require('../models/order.model');

const sequelize = db.sequelize;  
const Sequelize = db.Sequelize;

var Customer = sequelize.define('CustomerDetails', {
    id: {
        type: Sequelize.INTEGER(11).UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: Sequelize.INTEGER(11).UNSIGNED,
         allowNull: false,
    },
    name: {
        type: Sequelize.STRING(255),
        allowNull: false,
    },
    mobile: {
        type: Sequelize.STRING(15),
        allowNull: false,
    },
    address: {
        type: Sequelize.STRING(255),
        allowNull: false,
    },
    landmark: {
        type: Sequelize.STRING(255),
        allowNull: true,
    },
    city: {
        type: Sequelize.STRING(255),
        allowNull: false,
    },
    state: {
        type: Sequelize.STRING(255),
        allowNull: false,
    },
    // country: {
    //     type: Sequelize.STRING(255),
    //     allowNull: false,
    // },
    zipcode: {
        type: Sequelize.STRING(15),
        allowNull: false,
    },
    address_type: {
        type: Sequelize.STRING(15),
        allowNull: false,
    },
    status: {
        type: Sequelize.TINYINT(4).UNSIGNED,
        allowNull: true,
    },
    created_at: Sequelize.DATE,
    updated_at: Sequelize.DATE,
}, {
    tableName: "CustomerDetails",
    createdAt: "created_at",
    updatedAt: "updated_at"
})

Customer.hasMany(Order, {foreignKey: 'id'});
Order.belongsTo(Customer, {foreignKey: 'customer_id'});

Customer.sync({force:false,alter:false});

module.exports = Customer;