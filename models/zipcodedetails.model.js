var db = require('../shared/config');

const sequelize = db.sequelize;  
const Sequelize = db.Sequelize;

var zipcodeDetails = sequelize.define('zipcodedetails', {
    id: {
        type: Sequelize.INTEGER(11).UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    location: {
        type: Sequelize.STRING(255),
        allowNull: false,
    },
    zipcode: {
        type: Sequelize.STRING(15),
        allowNull: false,
        unique: {
            args: true,
            msg: 'Zipcode Already Exists!'
        },
    },
    status: {
        type: Sequelize.TINYINT(4).UNSIGNED,
        allowNull: true,
    },
    created_at: Sequelize.DATE,
    updated_at: Sequelize.DATE,
}, {
    tableName: "zipcodedetails",
    createdAt: "created_at",
    updatedAt: "updated_at"
})

zipcodeDetails.sync({force:false,alter:false});

module.exports = zipcodeDetails;