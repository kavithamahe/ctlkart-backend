var db = require('../shared/config');

const sequelize = db.sequelize;  
const Sequelize = db.Sequelize;

var pagesDetails = sequelize.define('pagesdetails', {
    id: {
        type: Sequelize.INTEGER(11).UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    page_name: {
        type: Sequelize.STRING(255),
        allowNull: true,
    },
    content: {
        type: Sequelize.TEXT(),
        allowNull: false,
    },
    status: {
        type: Sequelize.TINYINT(4).UNSIGNED,
        allowNull: true,
    },
    slug: {
        type: Sequelize.STRING(255),
        allowNull: true,
    },
    created_at: Sequelize.DATE,
    updated_at: Sequelize.DATE,
}, {
    tableName: "pagesdetails",
    createdAt: "created_at",
    updatedAt: "updated_at"
})

pagesDetails.sync({force:false,alter:false});

module.exports = pagesDetails;