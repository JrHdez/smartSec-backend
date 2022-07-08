//path: api/inst


const { Router } =require('express');
const { getCops } = require('../controllers/inst');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();


router.get('/',[validarJWT],getCops);


 module.exports = router