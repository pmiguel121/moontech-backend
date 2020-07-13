const express = require('express');
const router =express.Router();

const utilizador_skillscontrollers = require("../controllers/utilizador_skillscontrollers");

router.get('/list', utilizador_skillscontrollers.list);

router.get('/get/:id', utilizador_skillscontrollers.get);

router.post('/createTec', utilizador_skillscontrollers.createTec);

router.post('/createHum', utilizador_skillscontrollers.createHum);

router.put('/update/:id', utilizador_skillscontrollers.update);

router.post('/delete/:id', utilizador_skillscontrollers.delete);




module.exports =router;

