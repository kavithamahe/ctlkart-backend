var db = require('../shared/config');
var currency=require('../models/currency.model');
const sequelize = db.sequelize;  
const Sequelize = db.Sequelize;

var settings = sequelize.define('settings', {
    id: {
        type: Sequelize.INTEGER(11).UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING(255),
        allowNull: true, 
        
    },
    currency_id: {
        type: Sequelize.INTEGER(11),
        allowNull: true
    },
  
    stock_status: {
        type: Sequelize.TINYINT(),
        allowNull: true
    },
    onlinepayment_status: {
        type: Sequelize.TINYINT(),
        allowNull: true
    },
    status:{
        type:Sequelize.TINYINT(),

    },
    created_at: Sequelize.DATE,
    updated_at: Sequelize.DATE,
}, {
    tableName: "settings",
    createdAt: "created_at",
    updatedAt: "updated_at"
})

settings.sync({force:false,alter:false});

module.exports = settings;