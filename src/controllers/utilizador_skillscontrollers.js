var sequelize = require('../models/database');
var utilizador_equipas = require("../models/utilizador_equipas");
var Utilizador = require("../models/utilizador");


var utilizador_skills = require("../models/utilizador_skills");
const Skills = require('../models/skills');
var Projeto = require("../models/projeto");
var Equipa = require("../models/equipa");

//encapsular para no fim podermos fazer o export de todos os componentes, edit, delete..
const controller = {};

//quando correr vai criar as tabelas bd
sequelize.sync();


controller.list = async (req, res) => {

    const data = await utilizador_skills.findAll({
        order: [['id_skill', 'ASC']],
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


//Função para procurar um utilizador, dado um id
controller.get = async (req, res) => {
    const { id } = req.params;


    const data = await utilizador_skills.findAll({
        //se id for igual ao id
        where: { id_utilizadorskills: id },
        //include: [skills]
    })
        .then(function (data) {
            return data;
        })
        .catch(error => {
            return error;
        });
    res.json({ success: true, data: data });
}



//para criar novo utilizador
controller.createTec = async (req, res) => {


    let id_conpetenciatecnica = 0;


    const { id_utilizador, nivel, skills_id_skills, tagsTecArmazena } = req.body;

    const id_utilizadorr = await Utilizador.findOne({
        //se id for igual ao id
        where: { id_utilizador: id_utilizador },
        //include: [skills]
    })
        .then(function (id_utilizadorr) {
            return id_utilizadorr;
        })


    //verifica se existes uma competencia com aquele nome
    const competencias = await Skills.count({
        where: { nome: tagsTecArmazena, tipo: 1 },
    })


        .then(function (competencias) {
            return competencias;
        })
        .catch(error => {
            console.log('Erro:' + error);
            return error;
        });



    if (competencias == 0) {

        console.log("***********ENTREI AQUIIIII")

    } else {
        //Já existe e vou buscar o id
        const competencias_ = await Skills.findOne({
            order: [['id_skill', 'ASC']],
            where: { nome: tagsTecArmazena, tipo: 1 },
        })
            .then(function (competencias_) {
                return competencias_;
            })


        id_conpetenciatecnica = competencias_.id_skill;
    }


    if (id_conpetenciatecnica != null) {
        const skill = await utilizador_skills.create({

            nivel: 50,
            utilizador_id_utilizador_skills: id_utilizadorr.id_utilizador,
            skills_id_skills: id_conpetenciatecnica,

        })

            .then(function (skill) {
                return skill;
            })

            .catch(error => {
                console.log('Erro:' + error);
                return error;
            });
    }

    res.status(200).json({
        success: true,
        // message: "Competência adicionada com sucesso"
    });
}

controller.createHum = async (req, res) => {


    let id_conpetenciahumanas = 0;
    const { id_utilizador, nivel, skills_id_skills, tagsHumArmazena } = req.body;

    const id_utilizadorr = await Utilizador.findOne({
        //se id for igual ao id
        where: { id_utilizador: id_utilizador },
        //include: [skills]
    })
        .then(function (id_utilizadorr) {
            return id_utilizadorr;
        })


    const competencias1 = await Skills.count({
        where: { nome: tagsHumArmazena, tipo: 2 },
    })
        .then(function (competencias1) {
            return competencias1;
        })
        .catch(error => {
            console.log('Erro:' + error);
            return error;
        });


    if (competencias1 == 0) {

    } else {
        //Já existe e vou buscar o id
        const competencias_1 = await Skills.findOne({
            order: [['id_skill', 'ASC']],
            where: { nome: tagsHumArmazena, tipo: 2 },
        })
            .then(function (competencias_1) {
                return competencias_1;
            })


        id_conpetenciahumanas = competencias_1.id_skill;
    }


    if (id_conpetenciahumanas != null) {
        const skill = await utilizador_skills.create({

            nivel: 50,
            utilizador_id_utilizador_skills: id_utilizadorr.id_utilizador,
            skills_id_skills: id_conpetenciahumanas,

        })

            .then(function (skill) {
                return skill;
            })

            .catch(error => {
                console.log('Erro:' + error);
                return error;
            });
    }
    res.status(200).json({
        success: true,
        //message: "Competência adicionada com sucesso"
    });
}






controller.update = async (req, res) => {
    // parameter get id
    const { id } = req.params;
    // parameter POST
    const { nivel, id_skill } = req.body;

    // Update data
    const data = await utilizador_skills.update({

        id_skill: id_skill,
        nivel: nivel,
    },
        {
            where: { id_utilizadorskills: id }
        })
        .then(function (data) {

            return data;
        })
        .catch(error => {
            return error;
        })
    res.json({ success: true, data: data, message: "Dados atualizados com sucesso" });
}



//Função para eliminar um utilizador
controller.delete = async (req, res) => {
    const { id } = req.params;
    // const { id } = req.body; 
    console.log(id);
    const data = await utilizador_skills.destroy({
        where: { id_utilizadorskills: id }
    })
    res.json({ success: true, deleted: data, message: "Competência removida com sucesso" });
}
module.exports = controller;