var db = require('../shared/config');
var Master= require('../models/master.model'); 

const sequelize = db.sequelize;  
const Sequelize = db.Sequelize;

var Subcategory = sequelize.define('subcategorydetails', {
    id: {
        type: Sequelize.INTEGER(11).UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    category_id: {
        type: Sequelize.INTEGER(11).UNSIGNED,
        allowNull: false,
    },
    subcategory_name: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    description: {
        type: Sequelize.STRING(1025),
        allowNull: false
    },
    status: {
        type: Sequelize.TINYINT(4).UNSIGNED,
        allowNull: true,
    },
    delete_status: {
        type: Sequelize.TINYINT(4).UNSIGNED,
        allowNull: true,
    },
    subcategory_image: {
        type: Sequelize.STRING(255),
        allowNull: true
    },
    created_at: Sequelize.DATE,
    updated_at: Sequelize.DATE,
}, {
    tableName: "subcategorydetails",
    createdAt: "created_at",
    updatedAt: "updated_at"
})

Master.hasMany(Subcategory, {foreignKey: 'category_id'})
Subcategory.belongsTo(Master, {foreignKey: 'category_id'})

Subcategory.sync({force:false,alter:false});

module.exports = Subcategory;