var db = require('../shared/config');
   

const sequelize = db.sequelize;  
const Sequelize = db.Sequelize;

var Category = sequelize.define('category', {
    category_id: {
        type: Sequelize.INTEGER(11).UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    category_name: {
        type: Sequelize.STRING(255),
        allowNull: false, 
        unique: {
            args: true,
            msg: 'Category already in use!'
        },
    },
    category_slug: {
        type: Sequelize.STRING(255),
        allowNull: true, 
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
    category_image: {
        type: Sequelize.STRING(255),
        allowNull: true
    },
    created_at: Sequelize.DATE,
    updated_at: Sequelize.DATE,
}, {
    tableName: "category",
    createdAt: "created_at",
    updatedAt: "updated_at"
})



Category.sync({force:false,alter:false});

module.exports = Category;