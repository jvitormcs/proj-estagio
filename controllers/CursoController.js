const { Op } = require("sequelize")
const Curso = require("../models/CursoModel")

module.exports = class CursoController{

    static async createCurso(req, res){

        const { descricao, status } = req.body
        
        if(!descricao){
            res.status(422).json({
                success: false,
                message: 'A descrição é um campo obrigatório'
            })
            return
        }

        if(!status){
            res.status(422).json({
                success: false,
                message: 'Insira um status para continuar'
            })
            return
        }

        if(status !== 'A'){
            res.status(422).json({
                success: false,
                message: 'Status invalido'
            })
            return
        }
    try {
    
        const curso = {
            descricao,
            status
        }

        const createdCurso = await Curso.create(curso)

        res.status(200).json({
            success: true,
            message: 'Curso criado com sucesso',
            data: createdCurso

        })

    } catch (error) {
        
        res.status(400).json({
            success: false,
            message: 'Houve um erro na hora de cadastrar',
            err: error
        })
        return
    }

    }

    static async searchCurso (req, res){
        try {
    
        const { id, descricao, status } = req.query

        let pesquisa


        if(id === undefined || descricao === undefined || status == undefined){
            res.status(422).json({
                success: false, 
                message: "Algum campo está faltando"
            })
            return
        }
        console.log(status)
        
        if(status !== 'A' && status !== 'D' && status !== "") {

            res.status(422).json({
                success: false, 
                message: "Status não permitido"
            })
            return
        }

        if(id !== undefined && id !== ''){
            pesquisa ={
                ...pesquisa,
                id_curso: {
                    [Op.like]: id
                }
            }
        }

        if(descricao !== undefined && descricao !== '') {

            pesquisa ={
                ...pesquisa,
                descricao: {
                    [Op.substring]: descricao
                }
            }

        }

        if(status !== undefined && status !== '') {

            pesquisa ={
                ...pesquisa,
                status: {
                    [Op.like]: status
                }
            }
        }


        const data = await Curso.findAll({
            where: pesquisa
        })
        
        if(data?.length == 0){
            res.status(200).json({
                success: true,
                message: 'Nenhum dado encontrado'
            })
            return
        }
        
        res.status(200).json({
            success: true,
            message: 'Dados encontrados com sucesso',
            data
        })
    } catch (error) {
        
        res.status(400).json({
            success: false,
            message: 'Houve um erro na hora de cadastrar',
            err: error
        })
        return
    }

    }

    static async updateCurso(req, res){

        try{

        const {id, descricao} = req.body

                
        if(!id){
            res.status(422).json({
                success: false,
                message: 'o id do curso é um campo obrigatório'
            })
            return
        }
        
        const curso = await Curso.findOne({
            where: {
                id_curso: id
            }
        })

        if(!curso){
            res.status(422).json({
                success: false,
                message: 'O curso referente a este id não existe'
            })
            return
        }

        if(!descricao){
            res.status(422).json({
                success: false,
                message: 'A descrição é um campo obrigatório'
            })
            return
        }

        if(curso.status === 'D'){
            res.status(422).json({
                success: false,
                message: 'Não é possível atualizar um curso desativado'
            })
            return
        }

        const updatedCurso = {
            id_curso: id,
            descricao
        }

        await Curso.update(updatedCurso,{
            where: {
                id_curso: id,
                status: 'A'
            }
        })

        res.status(200).json({
            success: true,
            message: "curso atualizado com sucesso",
        })

    } catch (error) {
        
        res.status(400).json({
            success: false,
            message: 'Houve um erro na hora de cadastrar',
            err: error
        })
        return
    }

    }

    static async deleteCurso(req, res){

        try{

            const { id } = req.body
            if(!id){
                res.status(422).json({
                    success: false,
                    message: 'o id do curso é um campo obrigatório'
                })
                return
            }
            
            const curso = await Curso.findOne({
                where: {
                    id_curso: id
                }
            })
    
            if(!curso){
                res.status(422).json({
                    success: false,
                    message: 'O curso referente a este id não existe'
                })
                return
            }

            
        if(curso.status === 'D'){
            res.status(422).json({
                success: false,
                message: 'Não é desativar novamente o mesmo curso'
            })
            return
        }


            await Curso.update(
                {
                    status: 'D'
                },
                {
                where: {
                    id_curso: id,
                    status: 'A'
                }}
            )

            
        res.status(200).json({
            success: true,
            message: "curso deletado com sucesso",
        })


        } catch (error) {
        
            res.status(400).json({
                success: false,
                message: 'Houve um erro na hora de cadastrar',
                err: error
            })
            return
        }
    

    }
}