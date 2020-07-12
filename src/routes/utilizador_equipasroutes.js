const express = require('express');
const router =express.Router();

const utilizador_equipascontrollers = require("../controllers/utilizador_equipacontrollers");

router.get('/list', utilizador_equipascontrollers.list);

router.get('/get/:id', utilizador_equipascontrollers.get);

router.post('/create', utilizador_equipascontrollers.create);

router.put('/update/:id', utilizador_equipascontrollers.update);

router.post('/delete/:id', utilizador_equipascontrollers.delete);




module.exports =router;

