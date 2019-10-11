var db = require('../shared/config');

const sequelize = db.sequelize;  
const Sequelize = db.Sequelize;

var Cart = sequelize.define('cartdetails', {
    id: {
        type: Sequelize.INTEGER(11).UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: Sequelize.INTEGER(11).UNSIGNED,
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
    price: {
        type: Sequelize.DECIMAL(12,6),
        allowNull: false
    },
    quantity: {
        type: Sequelize.CHAR(255),
        allowNull: false
    },
    product_image: {
        type: Sequelize.STRING(255),
        allowNull: true
    },
    created_at: Sequelize.DATE,
    updated_at: Sequelize.DATE,
}, {
    tableName: "cartdetails",
    createdAt: "created_at",
    updatedAt: "updated_at"
})

Cart.sync({force:false,alter:false});

module.exports = Cart;