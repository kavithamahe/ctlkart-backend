var db = require('../shared/config');

const sequelize = db.sequelize;  
const Sequelize = db.Sequelize;

var currencyval = sequelize.define('currencies', {
    id: {
        type: Sequelize.INTEGER(11).UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    currency_name: {
        type: Sequelize.STRING(255),
        allowNull: true, 
        
    },
    currency_icon: {
        type: Sequelize.STRING(255),
        allowNull: true
    },
    status:{
        type:Sequelize.TINYINT(),

    },
    created_at: Sequelize.DATE,
    updated_at: Sequelize.DATE,
}, {
    tableName: "currencies",
    createdAt: "created_at",
    updatedAt: "updated_at"
})

currencyval.sync({force:false,alter:false});

module.exports = currencyval;