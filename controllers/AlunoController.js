const { Op } = require("sequelize")
const Aluno = require("../models/AunoModel")
const Curso = require("../models/CursoModel")

module.exports = class AlunoContrroler{

    static async getAluno(req, res){

        try{
        const { nome, ra, id_curso, status } = req.query

        let pesquisa

        if(nome == undefined && ra == undefined && id_curso == undefined && status == undefined){

            res.status(422).json({
                success: false, 
                message: "Algum campo está faltando"
            })
            return
        }

        
        if(status !== 'A' && status !== 'D' && status !== "") {

            res.status(422).json({
                success: false, 
                message: "Status não permitido"
            })
            return
        }

        if( nome !== undefined && nome !== ''){

            pesquisa ={
                ...pesquisa,
                nome: {
                    [Op.substring]: nome
                }
            }

        }

        if( ra !== undefined && ra !== ''){
            pesquisa ={
                ...pesquisa,
                ra: {
                    [Op.like]: ra
                }
            }
        }

        if( id_curso !== undefined && id_curso !== ''){

            pesquisa ={
                ...pesquisa,
                id_curso: {
                    [Op.like]: id_curso
                }
            }

        }
        
        if( status !== undefined && status !== ''){
            
            pesquisa ={
                ...pesquisa,
                status: {
                    [Op.like]: status
                }
            }

        }

        const data = await Aluno.findAll({
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
            message: "Dados encontrados com sucesso",
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


    static async createAluno(req, res){
        try{
        const { nome, ra, id_curso, status } = req.body

        if(!nome){
            res.status(422).json({
                success: false,
                message: 'O nome é um campo obrigatório'
            })
            return
        }

        if(!ra){
            res.status(422).json({
                success: false,
                message: 'O RA é um campo obrigatório'
            })
            return
        }
        
        const aluno = await Aluno.findOne({
            where: {
                ra
            }
        })

        if(aluno){
            res.status(422).json({
                success: false,
                message: 'Um aluno com esse RA já existe'
            })
            return
        }

        if(!id_curso){
            res.status(422).json({
                success: false,
                message: 'O id do curso é um campo obrigatório'
            })
            return
        }

        const curso = await Curso.findOne({
            where: {
                id_curso
            }
        })

        if(!curso){
            res.status(422).json({
                success: false,
                message: 'O curso referente a este id não existe ou foi desativado'
            })
            return
        }

                   
        if(curso.status === 'D'){
            res.status(422).json({
                success: false,
                message: 'O curso referente a este id não existe ou foi desativado'
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

        const newAluno = {
            nome,
            ra,
            id_curso,
            status
        }

        const createdAluno = await Aluno.create(newAluno)

        res.status(200).json({
            success: true,
            message: 'Aluno criado com sucesso',
            data: createdAluno
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

    static async updateAluno(req, res){
        try{
            
        const { nome, ra, id_curso } = req.body
        
            
        if(!nome){
            res.status(422).json({
                success: false,
                message: 'O nome é um campo obrigatório'
            })
            return
        }

        if(!ra){
            res.status(422).json({
                success: false,
                message: 'O RA é um campo obrigatório'
            })
            return
        }
        
        const aluno = await Aluno.findOne({
            where: {
                ra
            }
        })

        if(!aluno){
            res.status(422).json({
                success: false,
                message: 'Nenhum aluno encontrado com esse RA'
            })
            return
        }
        
        if(aluno.status === 'D'){
            res.status(422).json({
                success: false,
                message: 'Não é possível atualizar um aluno desativado'
            })
            return
        }

        if(!id_curso){
            res.status(422).json({
                success: false,
                message: 'O id do curso é um campo obrigatório'
            })
            return
        }

        const curso = await Curso.findOne({
            where: {
                id_curso
            }
        })

console.log(curso)

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
                message: 'Não é possível atualizar um curso desativado'
            })
            return
        }

        
        const data = {
            nome,
            id_curso,
         }

         await Aluno.update(data, {
            where: {
                ra
            }
         })

         res.status(200).json({
            success: true,
            message: 'Aluno atualizado com sucesso'

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

    static async deleteAluno(req, res){
        try{

            const {ra} = req.body

            
        if(!ra){
            res.status(422).json({
                success: false,
                message: 'O RA é um campo obrigatório'
            })
            return
        }
        
        const aluno = await Aluno.findOne({
            where: {
                ra
            }
        })

        if(!aluno){
            res.status(422).json({
                success: false,
                message: 'Nenhum aluno encontrado com esse RA'
            })
            return
        }
        
        
        if(aluno.status === 'D'){
            res.status(422).json({
                success: false,
                message: 'Não é possível atualizar um aluno desativado'
            })
            return
        }

        await Aluno.update({
            status: 'D',
        },
        {
            where: {
                ra,
                status: "A"
            }
        }
        )
        
        res.status(200).json({
            success: true,
            message: 'Aluno deletado com sucesso'
        })
        return
            
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