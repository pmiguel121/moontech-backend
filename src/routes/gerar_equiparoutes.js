const express = require('express');
const router =express.Router();
const checkToken = require('../middleware').checkToken

const gerar_equipacontrollers = require("../controllers/gerar_equipacontrollers");

router.get('/list', gerar_equipacontrollers.list);

router.get('/get/:id', gerar_equipacontrollers.get);

router.get('/SkillsTecGerar', gerar_equipacontrollers.SkillsTecGerar);

router.get('/SkillsHumGerar', gerar_equipacontrollers.SkillsHumGerar);


router.get('/SkillsTecGerarGraf', gerar_equipacontrollers.SkillsTecGerarGraf);

router.get('/SkillsHumGerarGraf', gerar_equipacontrollers.SkillsHumGerarGraf);


router.put('/update/:id', gerar_equipacontrollers.update);


router.post('/create', gerar_equipacontrollers.create);


router.post('/apagargerarequipa', gerar_equipacontrollers.apagargerarequipa);


router.post('/createTec', gerar_equipacontrollers.createTec);

router.post('/createHum', gerar_equipacontrollers.createHum);



router.post('/delete/:id', gerar_equipacontrollers.delete);


router.post('/GerarEquipa', checkToken, gerar_equipacontrollers.GerarEquipa);



module.exports =router;

