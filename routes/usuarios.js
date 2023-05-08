const {Router} = require('express');

const { 
    usuariosGet, 
    usuariosCreatePost,
    usuariosLogin,
    usuariosUpdatePut,
    usuariosUpdatePassPatch,
    usuariosDelete
     } = require('../controllers/usuarios');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', usuariosGet); 
router.post('/', usuariosCreatePost);
router.post('/login', usuariosLogin);
router.put('/:id', usuariosUpdatePut);
router.patch('/:id', usuariosUpdatePassPatch);
router.delete('/:id', 
    [validarJWT],
usuariosDelete);

module.exports = router;