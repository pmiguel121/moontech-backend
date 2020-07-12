const express = require('express');
const router =express.Router();

const SkillsController = require("../controllers/skillscontrollers");

router.get('/list', SkillsController.list);

router.get('/CompMaisUsadasTecnicas', SkillsController.CompMaisUsadasTecnicas);

router.get('/CompMaisUsadasHumanas', SkillsController.CompMaisUsadasHumanas);

router.get('/ContarSkills', SkillsController.ContarSkills);

router.get('/get/:id', SkillsController.get);

router.post('/create', SkillsController.create);

router.put('/update/:id', SkillsController.update);

router.post('/delete/:id', SkillsController.delete);

router.get('/listskilltipoTecnicas', SkillsController.listskilltipoTecnicas);

router.get('/listskilltipoHumanas', SkillsController.listskilltipoHumanas);

router.get('/recentes', SkillsController.recentes);


module.exports =router;