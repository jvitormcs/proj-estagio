const { DataTypes } = require('sequelize')

const db = require('../database/conn')


const Curso = db.define('curso',{

    id_curso: {
        type: DataTypes.STRING(),
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    descricao:{
        type: DataTypes.STRING(30),
        defaultValue: '',
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

module.exports = Curso