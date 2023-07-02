const { Sequelize } = require("sequelize");
require("dotenv").config();

const { DB_HOST, DB_NAME, DB_DIALECT, DB_USER, DB_PASSWORD } = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD,{
    host: DB_HOST,
    dialect: DB_DIALECT
})

try {
    sequelize.authenticate()
    console.log('Successful Authentication')
} catch (error) {
    console.log('Error Database Connection', err)
}

module.exports = sequelize