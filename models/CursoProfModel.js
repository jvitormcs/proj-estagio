const { DataTypes } = require('sequelize')

const db = require('../database/conn')
const Curso = require('./CursoModel')
const Professor = require('./ProfessorModel')

const CursoProfessor = db.define('cursoprof',{

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


CursoProfessor.belongsTo(
    Curso,
    {
        foreignKey: 'id_curso',
        constraints: true,
        foreignKeyConstraint: 'id_curso',
        as: 'Curso'
    }
)

Curso.hasMany(
    CursoProfessor, {
        foreignKey: 'id_curso',
        constraints: true,
        foreignKeyConstraint: 'id_curso',
        as: 'curso_professor_curso'
    }
)

CursoProfessor.belongsTo(
    Professor,
    {
        foreignKey: 'id_professor',
        constraints: true,
        foreignKeyConstraint: 'id_professor',
        as: 'professor'
    }
)

Professor.hasMany(
    CursoProfessor, {
        foreignKey: 'id_professor',
        constraints: true,
        foreignKeyConstraint: 'id_professor',
        as: 'curso_professor_curso'
    }
)

module.exports = CursoProfessor