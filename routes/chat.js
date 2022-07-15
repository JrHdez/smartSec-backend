//path: api/chat


const { Router } =require('express');
const { registerUid } = require('../controllers/chat');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();


router.post('/',[validarJWT],registerUid);


 module.exports = router