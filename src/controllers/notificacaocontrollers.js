var sequelize = require("../models/database");
var Utilizador = require("../models/utilizador");
var Skills = require("../models/skills");
var Projeto = require("../models/projeto");
var notificacao = require("../models/notificacao");

//encapsular para no fim podermos fazer o export de todos os componentes, edit, delete..
const controller = {};

//quando correr vai criar as tabelas bd
sequelize.sync();


//Função para listar todas as notificacao
controller.list = async(req, res)=>{
    const data = await notificacao.findAll({
        // include: [notificacao]
    })
    .then(function(data){
        return data;
    })
    .catch(error =>{
        return error;
    });
    res.json({success: true, data, data});
}

module.exports = controller;