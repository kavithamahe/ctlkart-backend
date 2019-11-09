var db = require('../shared/config');

const sequelize = db.sequelize;  
const Sequelize = db.Sequelize;

var Review = sequelize.define('reviewdetails', {
    id: {
        type: Sequelize.INTEGER(11).UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    product_id: {
        type: Sequelize.INTEGER(11).UNSIGNED,
        allowNull: true, 
    },
    user_id: {
        type: Sequelize.INTEGER(11).UNSIGNED,
         allowNull: true,
    },
    rating: {
        type: Sequelize.STRING(255),
        allowNull: false, 
    },
    ratingcomments: {
        type: Sequelize.STRING(255),
        allowNull: false, 
    },
    status: {
        type: Sequelize.TINYINT(4).UNSIGNED,
        allowNull: true,
    },
    created_at: Sequelize.DATE,
    updated_at: Sequelize.DATE,
}, {
    tableName: "reviewdetails",
    createdAt: "created_at",
    updatedAt: "updated_at"
})

Review.sync({force:false,alter:false});

module.exports = Review;