const express = require('express');
const router =express.Router();

const EquipaController = require("../controllers/equipacontrollers");

router.get('/list', EquipaController.list);

router.get('/get/:id', EquipaController.get);

router.post('/create', EquipaController.create);

router.put('/update/:id', EquipaController.update);

router.delete('/delete/:id', EquipaController.delete);


module.exports =router;