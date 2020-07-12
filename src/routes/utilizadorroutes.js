const express = require('express');
const router =express.Router();
const checkToken = require('../middleware').checkToken
const authorize = require('../middleware').authorize
const Role = require('../middleware').Role
const multer = require('multer');
const multerconfig = require('../config/multer');

//autenticações
//const middleware = require('../middleware');
const UtilizadorController = require("../controllers/utilizadorcontroller");
const Utilizador = require('../models/utilizador');

router.post('/login',UtilizadorController.login);

router.get('/list', UtilizadorController.list);

//router.post('/register',UtilizadorController.register);

router.get('/listagemDEVSTroca', UtilizadorController.listagemDEVSTroca);

router.get('/listrecentes', UtilizadorController.listrecentes);

router.get('/BuscaNomeLideres', UtilizadorController.BuscaNomeLideres);

router.get('/BuscaSkillsEspcTecnicas/:id',  UtilizadorController.BuscaSkillsEspcTecnicas);

router.get('/BuscaSkillsEspcHumanas/:id', UtilizadorController.BuscaSkillsEspcHumanas);

router.get('/get/:id', UtilizadorController.get);

// router.get('/posts', async (req, res) => {
//     const posts = await Utilizador.find();

//     return res.json(posts)
// });

// router.post('/posts', multer(multerconfig).single('file') 

router.post('/create',  multer(multerconfig).single('file'), UtilizadorController.create);

router.put('/update/:id' , UtilizadorController.update);

router.put('/updatetipo/:id', UtilizadorController.updatetipo);

router.delete('/delete/:id',  checkToken, authorize([Role.RH]), UtilizadorController.delete);

router.get('/teste/:id', UtilizadorController.get);

router.get('/ContarDevs', UtilizadorController.ContarDevs); 




module.exports = router;

