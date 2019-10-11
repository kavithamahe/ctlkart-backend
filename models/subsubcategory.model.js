var db = require('../shared/config');
var Master= require('../models/master.model'); 
var Subcategory= require('../models/subcategory.model'); 

const sequelize = db.sequelize;  
const Sequelize = db.Sequelize;

var Subsubcategory = sequelize.define('subsubcategory', {
    id: {
        type: Sequelize.INTEGER(11).UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    category_id: {
        type: Sequelize.INTEGER(11).UNSIGNED,
        allowNull: false,
    },
    subcategory_id: {
        type: Sequelize.INTEGER(11).UNSIGNED,
        allowNull: false,
    },
    subsubcategory_name: {
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
    subsubcategory_image: {
        type: Sequelize.STRING(255),
        allowNull: true
    },
    created_at: Sequelize.DATE,
    updated_at: Sequelize.DATE,
}, {
    tableName: "subsubcategory",
    createdAt: "created_at",
    updatedAt: "updated_at"
})
Subcategory.hasMany(Subsubcategory, {foreignKey: 'subcategory_id'})
Subsubcategory.belongsTo(Subcategory, {foreignKey: 'id'})

Subsubcategory.sync({force:false,alter:false});

module.exports = Subsubcategory;