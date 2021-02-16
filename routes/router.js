const {Router} = require('express');
const router = Router();

const {updateData, envioToken} = require('./post_put/generarPago'); 
const {verifyToken} = require('../middleware/verifyToken')
const {getSaldo} = require('./get/getSaldo')
const {registroNewUser} = require ('./post_put/registroNewUser')


router.post('/consultarSaldo',verifyToken, getSaldo)

router.post('/registro', registroNewUser)

router.post('/enviotoken', verifyToken, envioToken)

router.put('/update', verifyToken, updateData)

module.exports = router