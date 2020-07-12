const express = require('express');
const router =express.Router();

const NotificacaoController = require("../controllers/notificacaocontrollers");

router.get('/list', NotificacaoController.list);

router.get('/get/:id', NotificacaoController.get);

router.post('/create', NotificacaoController.create);

router.put('/update/:id', NotificacaoController.update);

router.delete('/delete/:id', NotificacaoController.delete);

router.get('/teste/:id', NotificacaoController.get);

router.get('/seq', NotificacaoController.seq); 




module.exports =router;

