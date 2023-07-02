const AlunoContrroler = require("../controllers/AlunoController");

const router = require("express").Router();

router.post('/createAluno', AlunoContrroler.createAluno)
router.get('/buscaAluno', AlunoContrroler.getAluno)
router.put('/atualizaAluno', AlunoContrroler.updateAluno)
router.delete('/apagaAluno', AlunoContrroler.deleteAluno)

module.exports = router