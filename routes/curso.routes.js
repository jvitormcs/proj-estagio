const CursoController = require("../controllers/CursoController");

const router = require("express").Router();

router.post('/create', CursoController.createCurso)
router.get('/search', CursoController.searchCurso)
router.put('/update', CursoController.updateCurso)
router.delete('/delete', CursoController.deleteCurso)

module.exports = router