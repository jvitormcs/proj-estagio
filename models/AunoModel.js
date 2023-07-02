const { DataTypes } = require('sequelize')

const db = require('../database/conn')
const Curso = require('./CursoModel')

const Aluno = db.define('aluno',{

    ra: {
        type: DataTypes.STRING(13),
        primaryKey: true,
        require: true
    },
    nome:{
        type: DataTypes.STRING(50),
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

Aluno.belongsTo(
    Curso,
    {
        foreignKey: 'id_curso',
        constraints: true,
        foreignKeyConstraint: 'id_curso',
        as: 'Curso'
    }
)

Curso.hasMany(
    Aluno, {
        foreignKey: 'id_curso',
        constraints: true,
        foreignKeyConstraint: 'id_curso',
        as: 'curso_aluno'
    }
)

module.exports = Aluno