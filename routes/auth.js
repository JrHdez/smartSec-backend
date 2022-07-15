const { Router } =require('express');
const { check } = require('express-validator');
const { creatUsuario, login, renewToken, getUsuarios, crearPolicia } = require('../controllers/auth');
const { enviarNotificacion } = require('../controllers/notifications');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.post('/new',[
    check('nombres','El nombre es obligatorio').not().isEmpty(),
    check('apellidos','El apellido es obligatorio').not().isEmpty(),
    // check('tipoID','El tipo de identificacion es obligatorio').not().isEmpty(),
    check('numeroID','El nombre es obligatorio').not().isEmpty(),
    check('email','El email es obligatorio').not().isEmpty().isEmail(),
    check('password','La contraseña es obligatoria').not().isEmpty(),
    validarCampos
],creatUsuario);

router.post('/newCop',[
    check('nombres','El nombre es obligatorio').not().isEmpty(),
    check('apellidos','El apellido es obligatorio').not().isEmpty(),
    // check('tipoID','El tipo de identificacion es obligatorio').not().isEmpty(),
    check('numeroID','El nombre es obligatorio').not().isEmpty(),
    check('placaID','El placaID es obligatorio').not().isEmpty(),
    check('email','El email es obligatorio').not().isEmpty().isEmail(),
    check('password','La contraseña es obligatoria').not().isEmpty(),
    validarCampos
],crearPolicia);

router.post('/',[
    check('numeroID','El numero de identificación es obligatorio').not().isEmpty().isNumeric(),
    check('password','La contraseña es obligatoria').not().isEmpty(),
    validarCampos
],login);

router.get('/renew',[validarJWT],renewToken);

router.post('/notification',enviarNotificacion);
router.get('/getChats',[validarJWT],getUsuarios);

 module.exports = router