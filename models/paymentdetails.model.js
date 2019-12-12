var db = require('../shared/config');

const sequelize = db.sequelize;  
const Sequelize = db.Sequelize;

var PaymentUser = sequelize.define('paymentuser', {
    id: {
        type: Sequelize.INTEGER(11).UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    razorpay_payment_id: {
        type: Sequelize.STRING(255),
        allowNull: false,
    },
    user_id: {
        type: Sequelize.INTEGER(11).UNSIGNED,
         allowNull: false,
    },
    total_cost: {
        type: Sequelize.DECIMAL(12,6),
        allowNull: true
    },
    product_id: {
        type: Sequelize.INTEGER(11).UNSIGNED,
        allowNull: true,
    },
    order_id: {
        type: Sequelize.INTEGER(11).UNSIGNED,
        allowNull: true,
    },
    status: {
        type: Sequelize.TINYINT(4).UNSIGNED,
        allowNull: true,
    },
    created_at: Sequelize.DATE,
    updated_at: Sequelize.DATE,
}, {
    tableName: "paymentuser",
    createdAt: "created_at",
    updatedAt: "updated_at"
})

PaymentUser.sync({force:false,alter:false});

module.exports = PaymentUser;