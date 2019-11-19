var db = require('../shared/config');
var OrderDetails = require('../models/order.model');
var CartDetails = require('../models/cartdetails.model');


const sequelize = db.sequelize;  
const Sequelize = db.Sequelize;

var costperUnit = sequelize.define('unitvisecost', {
    id: {
        type: Sequelize.INTEGER(11).UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    product_id: {
        type: Sequelize.INTEGER(11).UNSIGNED,
        allowNull: true,
    },
    unittype: {
        type: Sequelize.STRING(255),
        allowNull: true,
    },
    unit_id: {
        type: Sequelize.INTEGER(11).UNSIGNED,
        allowNull: true,
    },
    quantityperunit: {
        type: Sequelize.STRING(255),
        allowNull: true,
    },
    costperquantity: {
        type: Sequelize.DECIMAL(12,6),
        allowNull: false
    },
    totalquantityperunits: {
        type: Sequelize.CHAR(255),
        allowNull: true
    },
    availablequantityperunits: {
        type: Sequelize.CHAR(255),
        allowNull: true
    },
    unitnotes: {
        type: Sequelize.STRING(255),
        allowNull: true,
    },
    defaultselection: {
        type: Sequelize.TINYINT(4).UNSIGNED,
        allowNull: true,
    },
    status: {
        type: Sequelize.TINYINT(4).UNSIGNED,
        allowNull: true,
    },
    created_at: Sequelize.DATE,
    updated_at: Sequelize.DATE,
}, {
    tableName: "unitvisecost",
    createdAt: "created_at",
    updatedAt: "updated_at"
})

costperUnit.hasMany(OrderDetails, {foreignKey: 'id'});
OrderDetails.belongsTo(costperUnit, {foreignKey: 'unit_id'});

costperUnit.hasMany(CartDetails, {foreignKey: 'id'});
CartDetails.belongsTo(costperUnit, {foreignKey: 'unit_id'});

costperUnit.sync({force:false,alter:false});

module.exports = costperUnit;