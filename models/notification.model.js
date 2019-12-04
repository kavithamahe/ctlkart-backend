var db = require('../shared/config');

const sequelize = db.sequelize;  
const Sequelize = db.Sequelize;

var Orders = sequelize.define('notification', {
    id: {
        type: Sequelize.INTEGER(11).UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    inserted_id:{
        type: Sequelize.STRING(50),
        allowNull: false,
    },
    sender_id: {
        type: Sequelize.INTEGER(11).UNSIGNED,
         allowNull: false,
    },
    receiver_id: {
        type: Sequelize.INTEGER(11).UNSIGNED,
        allowNull: true, 
    },
    notify_type: {
        type: Sequelize.STRING(100),
        allowNull: false,
    },
    read_status: {
        type: Sequelize.TINYINT(),
        allowNull: true,
    },
    message: {
        type: Sequelize.STRING(500),
        allowNull: true,
    },
    url: {
        type: Sequelize.STRING(255),
        allowNull: false, 
    },
    
    created_at: Sequelize.DATE,
    updated_at: Sequelize.DATE,
}, {
    tableName: "notification",
    createdAt: "created_at",
    updatedAt: "updated_at"
})


Orders.sync({force:false,alter:false});


module.exports = Orders;