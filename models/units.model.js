var db = require('../shared/config');

const sequelize = db.sequelize;  
const Sequelize = db.Sequelize;

var unitsDetails = sequelize.define('unitsdetails', {
    id: {
        type: Sequelize.INTEGER(11).UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    units: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: {
            args: true,
            msg: 'Unit name already in use!'
        },
    },
    description: {
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
    tableName: "unitsdetails",
    createdAt: "created_at",
    updatedAt: "updated_at"
})

unitsDetails.sync({force:false,alter:false});

module.exports = unitsDetails;