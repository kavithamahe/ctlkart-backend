var db = require('../shared/config');
var Master= require('../models/master.model'); 
var Subcategory = require('../models/subcategory.model');

var Review = require('../models/review.model');

const sequelize = db.sequelize;  
const Sequelize = db.Sequelize;

var Product = sequelize.define('productDetails', {
    id: {
        type: Sequelize.INTEGER(11).UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    product_name: {
        type: Sequelize.STRING(255),
        allowNull: false, 
    },
    category_id: {
        type: Sequelize.INTEGER(11).UNSIGNED,
        allowNull: false,
    },
    subcategory_id: {
        type: Sequelize.INTEGER(11).UNSIGNED,
        allowNull: true,
    },
    subsubcategory_id: {
        type: Sequelize.INTEGER(11).UNSIGNED,
        allowNull: true,
    },
    product_description: {
        type: Sequelize.STRING(1025),
        allowNull: true
    },
    price: {
        type: Sequelize.DECIMAL(12,6),
        allowNull: false
    },
    quantity: {
        type: Sequelize.CHAR(255),
        allowNull: false
    },
    existing_quantity: {
        type: Sequelize.CHAR(255),
        allowNull: true
    },
    product_image: {
        type: Sequelize.STRING(255),
        allowNull: true
    },
    status: {
        type: Sequelize.TINYINT(4).UNSIGNED,
        allowNull: true,
    },
    created_at: Sequelize.DATE,
    updated_at: Sequelize.DATE,
}, {
    tableName: "productDetails",
    createdAt: "created_at",
    updatedAt: "updated_at"
})

Product.hasMany(Review, {foreignKey: 'id'});
Review.belongsTo(Product, {foreignKey: 'product_id'});


// Master.hasMany(Product, {foreignKey: 'category_id'})
// Product.belongsTo(Master, {foreignKey: 'category_id'})

// Subcategory.hasMany(Product, {foreignKey: 'subcategory_id'})
// Product.belongsTo(Subcategory, {foreignKey: 'id'})

Product.sync({force:false,alter:false});

module.exports = Product;