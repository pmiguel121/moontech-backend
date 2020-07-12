const express = require('express');
const router =express.Router();

const ProjetoController = require("../controllers/projetocontrollers");

router.get('/list', ProjetoController.list);

router.get('/ContagemConcluidos', ProjetoController.ContagemConcluidos);

router.get('/ContagemAtivos', ProjetoController.ContagemAtivos);

router.get('/get/:id', ProjetoController.get);

router.post('/create', ProjetoController.create);

router.put('/update/:id', ProjetoController.update);

router.post('/delete/:id', ProjetoController.delete);

router.get('/listGraficosCompetenciasTec', ProjetoController.listGraficosCompetenciasTec);

router.get('/listGraficosCompetenciasHum', ProjetoController.listGraficosCompetenciasHum);

router.get('/list2', ProjetoController.list2);

router.get('/listprojDev', ProjetoController.list2);

router.get('/listDevEsp/:id', ProjetoController.listDevEsp);

router.get('/listProjetosTL/:id', ProjetoController.listProjetosTL);

router.get('/teste', ProjetoController.teste);

router.get('/projetosrecentes', ProjetoController.projetosrecentes);


module.exports =router;