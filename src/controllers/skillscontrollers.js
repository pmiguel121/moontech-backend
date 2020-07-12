var sequelize = require('../models/database');
var Utilizador = require("../models/utilizador");
var Skills = require("../models/skills");
var Projeto = require("../models/projeto");
var Equipa = require("../models/equipa");
var Notificacao =  require('../models/notificacao');
var UserEquipa =  require('../models/utilizador_equipas');
//encapsular para no fim podermos fazer o export de todos os componentes, edit, delete..
const controller = {};

//quando correr vai criar as tabelas bd
sequelize.sync();


//Função para listar todas as Skills
controller.list = async(req, res)=>{
    const data = await Skills.findAll({
        // include: [Skills]
    })
    .then(function(data){
        return data;
    })
    .catch(error =>{
        return error;
    });
    res.json({success: true, data, data});
}




controller.CompMaisUsadasTecnicas = async(req, res)=>{
   

    const { QueryTypes } = require('sequelize');
    const data = await sequelize.query(
        "SELECT skills.nome, count(*) as contagem FROM utilizador_skills JOIN skills ON utilizador_skills.skills_id_skills = skills.id_skill WHERE skills.tipo = 1 GROUP BY skills.nome order by contagem desc limit 6",
        {
          replacements: ['active'],
          type: QueryTypes.SELECT
        }
      );
       
    res.json({ success: true, data, data });
}

controller.CompMaisUsadasHumanas = async(req, res)=>{
   

    const { QueryTypes } = require('sequelize');
    const data = await sequelize.query(
        "SELECT skills.nome, count(*) as contagem FROM utilizador_skills JOIN skills ON utilizador_skills.skills_id_skills = skills.id_skill WHERE skills.tipo = 2 GROUP BY skills.nome order by contagem desc limit 6",
        {
          replacements: ['active'],
          type: QueryTypes.SELECT
        }
      );
       
    res.json({ success: true, data, data });
}






controller.ContarSkills = async(req, res)=>{
    const data = await Skills.count({

    })
    .then(function(data){
        return data;
    })
    .catch(error =>{
        return error;
    });
    res.json({success: true, data, data});
}




controller.recentes = async(req, res)=>{
    const data = await Skills.findAll({
       order:[ ['id_skill', 'DESC']],
        limit:7
        
    })
    .then(function(data){
        return data;
    })
    .catch(error =>{
        return error;
    });
    res.json({success: true, data, data});
}



//Função para listar as skills somente tecnicas
controller.listskilltipoTecnicas = async(req, res)=>{
    const data = await Skills.findAll({
        order: [['id_skill', 'ASC']],
        // include: [Skills]
        where: { "$tipo$": 1 }
    })
    .then(function(data){
        return data;
    })
    .catch(error =>{
        return error;
    });
    res.json({success: true, data, data});
}

//Função para listar as skills somente humanas
controller.listskilltipoHumanas = async(req, res)=>{
    const data = await Skills.findAll({
        order: [['id_skill', 'ASC']],
        // include: [Skills]
        where: { "$tipo$": 2 }
    })
    .then(function(data){
        return data;
    })
    .catch(error =>{
        return error;
    });
    res.json({success: true, data, data});
}

//Função para procurar uma Skill, dado um id
controller.get = async (req, res) => {
    const { id } = req.params;
    const data = await Skills.findAll({
        //se id for igual ao id
        where: { id_skill: id },
        // include: [Skills]
    })
        .then(function (data) {
            return data;
        })
        .catch(error => {
            return error;
        });
    res.json({ success: true, data, data });
}



//Função para criar uma novo Skills (adicionar)
controller.create = async (req, res) => {
    const { nome, tipo, categoria } = req.body;

    const data = await Skills.create({

        nome: nome,
        tipo: tipo,
        categoria:categoria,

    })
        .then(function (data) {
            return data;
        })

        .catch(error => {
            console.log('Erro:' + error);
            return error;
        });
    res.status(200).json({
        success: true,
        message: "Skill adicionada com sucesso",
        data: data
    });
}




//Função para editar os dados de uma Skill
controller.update = async (req, res) => {
    // parameter get id
    const { id } = req.params;
    // parameter POST
    const { titulo, descricao, generoId, foto } = req.body;
    // Update data
    const data = await Skills.update({

        titulo: titulo,
        descricao: descricao,
        generoId: generoId,
        foto: foto
    },
        {
            where: { id_skill: id }
        })
        .then(function (data) {
            return data;
        })
        .catch(error => {
            return error;
        })
    res.json({ success: true, data: data, message: "Dados atualizados com sucesso" });
}

//Função para eliminar uma Skill
controller.delete = async (req, res) => {
    const { id } = req.params;
    // const { id } = req.body; 
    console.log(id);
    const data = await Skills.destroy({
        where: { id_skill: id }
    })
    res.json({ success: true, deleted: data, message: "Skill removida com sucesso" });
}
module.exports = controller;