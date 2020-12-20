const routerx = require('express-promise-router');
const usuarioRouter = require('./usuario');
const categoriaRouter = require('./categoria');
const articuloRouter = require('./articulo');



const router = routerx();

router.use('/articulo', articuloRouter);
router.use('/usuario', usuarioRouter);
router.use('/categoria', categoriaRouter);

module.exports = router;