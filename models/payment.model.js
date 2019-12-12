var db = require('../shared/config');

const sequelize = db.sequelize;  
const Sequelize = db.Sequelize;

var paymentDetails = sequelize.define('paymentDetails', {
    id: {
        type: Sequelize.INTEGER(11).UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    salt_key: {
        type: Sequelize.STRING(255),
        allowNull: true,
    },
    key_id: {
        type: Sequelize.STRING(255),
        allowNull: true,
    },
    payment_mode: {
        type: Sequelize.STRING(255),
        allowNull: true,
    },
    status: {
        type: Sequelize.TINYINT(4).UNSIGNED,
        allowNull: true,
    },
    created_at: Sequelize.DATE,
    updated_at: Sequelize.DATE,
}, {
    tableName: "paymentDetails",
    createdAt: "created_at",
    updatedAt: "updated_at"
})

paymentDetails.sync({force:false,alter:false});

module.exports = paymentDetails;