const { DataTypes } = require('sequelize')

const db = require('../database/conn')

const Professor = db.define('professor',{

    id_professor: {
        type: DataTypes.STRING(),
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    nome:{
        type: DataTypes.STRING(50),
        defaultValue: '',
        require: true
    }, 
    user:{
        type: DataTypes.STRING(15),
        allowNull: false,
        require: true
    }, 
    senha:{
        type: DataTypes.STRING(),
        allowNull: false,
        require: true
    },
    status:{
        type: DataTypes.STRING(1),
        defaultValue: '',
        require: true
    },
    dtCria: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }


},{
    freezeTableName: true,
    timestamps: false
})

module.exports = Professor