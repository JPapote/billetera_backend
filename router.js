const {Router} = require('express');
const router = Router();

const {getData, postData,updateData, envioToken} = require('./query'); 

router.post('/consultarSaldo', getData)

router.post('/registro', postData)

router.post('/enviotoken', envioToken)

router.put('/update', updateData)

module.exports = router