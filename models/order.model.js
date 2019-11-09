var db = require('../shared/config');

const sequelize = db.sequelize;  
const Sequelize = db.Sequelize;

var Orders = sequelize.define('OrderDetails', {
    id: {
        type: Sequelize.INTEGER(11).UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: Sequelize.INTEGER(11).UNSIGNED,
         allowNull: false,
    },
    customer_id: {
        type: Sequelize.INTEGER(11).UNSIGNED,
        allowNull: true, 
    },
    order_id: {
        type: Sequelize.STRING(255),
        allowNull: false,
    },
    product_id: {
        type: Sequelize.INTEGER(11).UNSIGNED,
        allowNull: true,
    },
    product_name: {
        type: Sequelize.STRING(255),
        allowNull: false, 
    },
    product_image: {
        type: Sequelize.STRING(255),
        allowNull: true
    },
    priceperproduct: {
        type: Sequelize.DECIMAL(12,6),
        allowNull: false
    },
    totalamount: {
        type: Sequelize.DECIMAL(12,6),
        allowNull: true
    },
    ordered_date: {
        type: Sequelize.DATEONLY,
        allowNull: true,
    },
    ordered_time: {
        type: Sequelize.STRING(255),
        allowNull: true,
    },
    processing_date: {
        type: Sequelize.DATEONLY,
        allowNull: true,
    },
    processing_time: {
        type: Sequelize.STRING(255),
        allowNull: true,
    },
    shipped_date: {
        type: Sequelize.DATEONLY,
        allowNull: true,
    },
    shipped_time: {
        type: Sequelize.STRING(255),
        allowNull: true,
    },
    delivered_date: {
        type: Sequelize.DATEONLY,
        allowNull: true,
    },
    delivered_time: {
        type: Sequelize.STRING(255),
        allowNull: true,
    },
    cancelled_date: {
        type: Sequelize.DATEONLY,
        allowNull: true,
    },
    cancelled_time: {
        type: Sequelize.STRING(255),
        allowNull: true,
    },
    completed_date: {
        type: Sequelize.DATEONLY,
        allowNull: true,
    },
    quantity: {
        type: Sequelize.CHAR(255),
        allowNull: false
    },
    payment_type: {
        type: Sequelize.CHAR(255),
        allowNull: false
    },
    status: {
        type: Sequelize.TINYINT(4).UNSIGNED,
        allowNull: true,
    },
    username: {
        type: Sequelize.STRING(255),
        allowNull: false, 
    },
    useremail: {
        type: Sequelize.STRING(255),
        allowNull: false, 
    },
    usermobile: {
        type: Sequelize.STRING(255),
        allowNull: true, 
    },
    review_status: {
        type: Sequelize.TINYINT(4).UNSIGNED,
        allowNull: true,
    },
    notes: {
        type: Sequelize.STRING(1025),
        allowNull: true, 
    },
    created_at: Sequelize.DATE,
    updated_at: Sequelize.DATE,
}, {
    tableName: "OrderDetails",
    createdAt: "created_at",
    updatedAt: "updated_at"
})


Orders.sync({force:false,alter:false});


module.exports = Orders;