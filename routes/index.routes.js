const router = require("express").Router();

const cursoRoutes = require('./curso.routes')
const alunoRoutes = require('./aluno.routes')

router.use('/curso', cursoRoutes)
router.use('/aluno', alunoRoutes)

module.exports = router