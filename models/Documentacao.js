const { DataTypes } = require('sequelize')

const db = require('../database/conn')
const Aluno = require('./AunoModel')

const Documentacao = db.define('documentacao',{

    id_documentacao: {
        type: DataTypes.STRING(),
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    semestre_ano:{
        type: DataTypes.STRING(6),
        defaultValue: '',
        require: true
    },
    tcer:{
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    tcenr:{
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    desc_atividades:{
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    ficha_valid_estagio:{
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    rel_atividades:{
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    recisao:{
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    rel_equivalencia:{
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    observacao:{
        type: DataTypes.STRING(255),
        defaultValue: '',
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



Documentacao.belongsTo(
    Aluno,
    {
        foreignKey: 'ra',
        constraints: true,
        foreignKeyConstraint: 'ra',
        as: 'Aluno_documentacao'
    }
)

Aluno.hasMany(
    Documentacao, {
        foreignKey: 'ra',
        constraints: true,
        foreignKeyConstraint: 'ra',
        as: 'Documentacao_aluno'
    }
)

module.exports = Documentacao