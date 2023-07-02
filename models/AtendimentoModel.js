const { DataTypes } = require('sequelize')

const db = require('../database/conn')
const Aluno = require('./AunoModel')
const Professor = require('./ProfessorModel')

const Atendimento = db.define('atendimento',{

    cod_atendimento: {
        type: DataTypes.STRING(),
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    data_atendimento: {
        type: DataTypes.DATEONLY
    },
    hora_atendimento: {
        type: DataTypes.TIME
    },
    descricao:{
        type: DataTypes.STRING(500),
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



Atendimento.belongsTo(
    Aluno,
    {
        foreignKey: 'ra',
        constraints: true,
        foreignKeyConstraint: 'ra',
        as: 'Aluno_atendimento'
    }
)

Aluno.hasMany(
    Atendimento, {
        foreignKey: 'ra',
        constraints: true,
        foreignKeyConstraint: 'ra',
        as: 'Atendimento_aluno'
    }
)



Atendimento.belongsTo(
    Professor,
    {
        foreignKey: 'id_professor',
        constraints: true,
        foreignKeyConstraint: 'id_professor',
        as: 'professor_atendimento'
    }
)

Professor.hasMany(
    CursoProfessor, {
        foreignKey: 'id_professor',
        constraints: true,
        foreignKeyConstraint: 'id_professor',
        as: 'atendimento_professor'
    }
)

module.exports = Atendimento