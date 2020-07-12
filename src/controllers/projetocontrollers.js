var sequelize = require('../models/database');
var Utilizador = require("../models/utilizador");
var Skills = require("../models/skills");
var Projeto = require("../models/projeto");
var Equipa = require("../models/equipa");

var utilizador_equipas = require("../models/utilizador_equipas");

var utilizador_skills = require("../models/utilizador_skills");


//encapsular para no fim podermos fazer o export de todos os componentes, edit, delete.
const controller = {};

//quando correr vai criar as tabelas bd
sequelize.sync();


//Função para listar todas as Projeto
controller.list = async(req, res)=>{
    const data = await Projeto.findAll({
        // include: [Projeto]
    })
    .then(function(data){
        return data;
    })
    .catch(error =>{
        return error;
    });
    res.json({success: true, data, data});
}



controller.listGraficosCompetenciasHum= async (req, res) => {

    //TENHO DE QUE TER AQUI O ID DA EQUIPA ESPECIFICA

    const { id } = req.params;

    const { QueryTypes } = require('sequelize');
    const data = await sequelize.query(
        "SELECT nome, (Sum(nivel) / COUNT(utilizador_skills.nivel)) FROM utilizador_skills LEFT OUTER JOIN skills ON skills.id_skill = utilizador_skills.skills_id_skills WHERE utilizador_skills.utilizador_id_utilizador_skills IN (SELECT    utilizador_equipas.utilizador_id_utilizador FROM utilizador_equipas WHERE utilizador_equipas.equipa_id_equipa = " + 2 + ") AND skills.tipo = 2 GROUP BY nome" ,

        {
          replacements: ['active'],
          type: QueryTypes.SELECT
        }
      );
       
    res.json({ success: true, data, data });

}

controller.listGraficosCompetenciasTec= async (req, res) => {

    const { id } = req.params;

    const { QueryTypes } = require('sequelize');
    const data = await sequelize.query(
        "SELECT nome, (Sum(nivel) / COUNT(utilizador_skills.nivel)) FROM utilizador_skills LEFT OUTER JOIN skills ON skills.id_skill = utilizador_skills.skills_id_skills WHERE utilizador_skills.utilizador_id_utilizador_skills IN (SELECT    utilizador_equipas.utilizador_id_utilizador FROM utilizador_equipas WHERE utilizador_equipas.equipa_id_equipa = "+ 2 + ") AND skills.tipo = 1 GROUP BY nome" ,

        {
          replacements: ['active'],
          type: QueryTypes.SELECT
        }
      );
       
    res.json({ success: true, data, data });

}


controller.teste = async(req, res)=>{
    const data = await Utilizador.findOne({
        attributes: ['nome'],
        where:{ "$id_utilizador$": 1}

    })
    .then(function(data){
        return data;
    })
    .catch(error =>{
        return error;
    });
    res.json({success: true, data, data});
}

//NOME LIDER E PROJETO


controller.listprojDev = async (req, res) => {


    let data = await Projeto.findAll({
        
    })
        .then(function (data) {

            return data;
        })
        .catch(error => {
            return error;
        });

 for (let i = 0; i < data.length; i++) {

//Só quero que isto me devolva o nome!
const lider = await Utilizador.findAll({
        where: {  "$id_projeto$": data[i].getDataValue("id_projeto")},
   
    attributes: ['nome'],
   
             include: {
                model: Equipa, as: "TESTE",
                attributes: [],
                include: {
                    model: Projeto, as: "equipa_id_equipa_projeto",
                 attributes: [],
                },
            },
    })
    .catch(error =>{
        return error;
    });

    data[i].setDataValue("nome_lider", lider)
}

for (let i = 0; i < data.length; i++) {

    //Só quero que isto me devolva o nome!
    const fotos_equipa = await Utilizador.findAll({
            where: {  "$id_projeto$": data[i].getDataValue("id_projeto")},
       
        // attributes: ['foto'],
       
                 include: {
                    model: Equipa, as: "TESTE",
                    attributes: [],
                    include: {
                        model: Projeto, as: "equipa_id_equipa_projeto",
                     attributes: [],
                    },
                },
             
        })
       
        .catch(error =>{
            return error;
        });
    
    
        data[i].setDataValue("fotos_equipa", fotos_equipa)
    }



    res.json({success: true, data, data});
}





















controller.list2 = async (req, res) => {


    let data = await Projeto.findAll({
    })
        .then(function (data) {

            return data;
        })
        .catch(error => {
            return error;
        });

 for (let i = 0; i < data.length; i++) {

//Só quero que isto me devolva o nome!
const lider = await Utilizador.findAll({
        where: {  "$teamleader$": 2 , "$id_projeto$": data[i].getDataValue("id_projeto")},
   
    attributes: ['nome'],
   
             include: {
                model: Equipa, as: "TESTE",
                attributes: [],
                include: {
                    model: Projeto, as: "equipa_id_equipa_projeto",
                 attributes: [],
                },

                
            },
          

            
    })
    .catch(error =>{
        return error;
    });

    data[i].setDataValue("nome_lider", lider)
}


for (let i = 0; i < data.length; i++) {

    //Só quero que isto me devolva o nome!
    const equipa_skills = await Utilizador.findAll({
           
        include: {
            model: Skills, as: "skills_utilizadores_skills",
            where: {
                },

            },
              
        })
        .catch(error =>{
            return error;
        });
    
        data[i].setDataValue("skills_equipa", equipa_skills)
    }

for (let i = 0; i < data.length; i++) {

    //Só quero que isto me devolva o nome!
    const fotos_equipa = await Utilizador.findAll({
            where: {  "$id_projeto$": data[i].getDataValue("id_projeto")},
       
        // attributes: ['foto'],
       
                 include: {
                    model: Equipa, as: "TESTE",
                    attributes: [],
                    include: {
                        model: Projeto, as: "equipa_id_equipa_projeto",
                     attributes: [],
                    },
                },
             
        })
       
        .catch(error =>{
            return error;
        });
    
    
        data[i].setDataValue("fotos_equipa", fotos_equipa)
    }



    res.json({success: true, data, data});
}

controller.listDevEsp = async (req, res) => {
    const { id } = req.params;
    let data = await Projeto.findAll({
        
        where:{ "$id_utilizador$" : id },
        include:{
            model: Equipa, as: "equipa_id_equipa_projeto1",
      
                  include:{
                      model: Utilizador, as: "TESTE1",
                          }
                }
       })

        .then(function (data) {

            return data;
        })
        .catch(error => {
            return error;
        });

 for (let i = 0; i < data.length; i++) {

//Só quero que isto me devolva o nome!
const lider = await Utilizador.findAll({
        where: {  "$teamleader$": 2 , "$id_projeto$": data[i].getDataValue("id_projeto")},
   
    attributes: ['nome'],
   
             include: {
                model: Equipa, as: "TESTE",
                attributes: [],
                include: {
                    model: Projeto, as: "equipa_id_equipa_projeto",
                 attributes: [],
                },
            },
    })
    .catch(error =>{
        return error;
    });

    data[i].setDataValue("nome_lider", lider)
}

for (let i = 0; i < data.length; i++) {

    //Só quero que isto me devolva o nome!
    const fotos_equipa = await Utilizador.findAll({
            where: {  "$id_projeto$": data[i].getDataValue("id_projeto")},
       
        // attributes: ['foto'],
       
                 include: {
                    model: Equipa, as: "TESTE",
                    attributes: [],
                    include: {
                        model: Projeto, as: "equipa_id_equipa_projeto",
                     attributes: [],
                    },
                },
             
        })
       
        .catch(error =>{
            return error;
        });
    
    
        data[i].setDataValue("fotos_equipa", fotos_equipa)
    }

    res.json({success: true, data, data});
}



controller.listProjetosTL = async (req, res) => {
    const { id } = req.params;

    const { QueryTypes } = require('sequelize');
    const data = await sequelize.query(
        "SELECT utilizador.id_utilizador, projeto.sigla, projeto.nome, projeto.id_projeto, utilizador_equipas.equipa_id_equipa FROM utilizador_equipas JOIN equipa ON utilizador_equipas.equipa_id_equipa = equipa.id_equipa JOIN utilizador ON utilizador.id_utilizador = utilizador_equipas.utilizador_id_utilizador JOIN projeto ON projeto.equipa_id_equipa_projeto = equipa.id_equipa WHERE utilizador.id_utilizador= "+ id + " and utilizador_equipas.equipa_id_equipa not in(select utilizador_equipas.equipa_id_equipa from utilizador_equipas where utilizador_id_utilizador !=" + id + " )" ,
        {
          replacements: ['active'],
          type: QueryTypes.SELECT
        }
      );
       
    res.json({ success: true, data, data });
   
}





//Função para procurar uma Skill, dado um id
controller.get = async (req, res) => {
    const { id } = req.params;
    const data = await Projeto.findAll({
        //se id for igual ao id
        where: { id_projeto: id },
        // include: [Projeto]
    })
        .then(function (data) {
            return data;
        })
        .catch(error => {
            return error;
        });
    res.json({ success: true, data, data });
}












//Função para criar um novo Projeto (adicionar)
controller.create = async (req, res) => {


    const { nome, sigla, data_inicio, data_fim, nr_elementos, disponibilidade, hora_extra, reunircliente,  descricao, id_teamleader } = req.body;

   
   
    //primeiro procuro os dados do utilizador para o por na tabela no fim
     const lider = await Utilizador.findOne({
          where:{ "$id_utilizador$": id_teamleader }
     })

     .then(function (lider) {
        return lider;
      //retorna os dados dessa equipa, vou adicionar o id no projeto que vou criar
    })    

  
   // crio primeiro a equipa
    const equipa = await Equipa.create({
        descricao: "",
        estado: 1

    })
        .then(function (equipa) {
            return equipa;
          //retorna os dados dessa equipa, vou adicionar o id no projeto que vou criar
        })

        .catch(error => {
            console.log('Erro:' + error);
            return error;
        });

    //transformação
    let d = 0;
    let he = 0;
    let r = 0;

    if (disponibilidade == false) { d = 0 } else{d= 1}

    if (hora_extra == false) { he = 0 } else {he= 1}

    if (reunircliente == false) { r = 0 } else {r= 1}

    

    const data = await Projeto.create({
       
        nome: nome,
        sigla: sigla,
        data_inicio: data_inicio,
        data_fim: data_fim,
        nr_elementos: nr_elementos,
        disponibilidade: d,
        hora_extra: he,
        reunircliente: r,
        estado_projeto: 2 ,
        descricao: descricao,
         equipa_id_equipa_projeto: equipa.id_equipa

    })
        .then(function (data) {
            return data;
        })
     

        .catch(error => {
            console.log('Erro:' + error);
            return error;
        });


        const utilizador_equipa = await utilizador_equipas.create({
    
            teamleader: 2,
            utilizador_id_utilizador: lider.id_utilizador,
            equipa_id_equipa: equipa.id_equipa,
        
        })
            .then(function (utilizador_equipa) {
                return utilizador_equipa;
    
            })
    
            .catch(error => {
                console.log('Erro:' + error);
                return error;
            });
     
        
    res.status(200).json({
        success: true,
        message: "Projeto adicionado com sucesso",
        data: data
    });
}






//Função para editar os dados de um projeto
controller.update = async (req, res) => {
    // parameter get id
    const { id } = req.params;
    // parameter POST
    const { nome, sigla, data_inicio, data_fim, nr_elementos, disponibilidade, descricao, estado_projeto  } = req.body;
    // Update data

    const data = await Projeto.update({
            nome: nome,
            sigla:sigla ,
            data_inicio:data_inicio,
            data_fim: data_fim,
            nr_elementos:nr_elementos,
            disponibilidade:disponibilidade,
            descricao:descricao,
            estado_projeto: estado_projeto,

    },
        {

            where: { id_projeto: id }
        })
       
        .then(function (data) {
    
            return data;
            
        })
        .catch(error => {
            return error;
        })     
  
    res.json({ success: true, data: data, message: "Dados atualizados com sucesso" });
}




//Função para eliminar um projeto
controller.delete = async (req, res) => {
    const { id } = req.params;
    // const { id } = req.body; 
    console.log(id);
    const data = await Projeto.destroy({
        where: { id_projeto: id }
    })
    res.json({ success: true, deleted: data, message: "Projeto removido com sucesso" });
}


// Projetos Recentes Mostrar


controller.projetosrecentes = async (req, res) => {


    let data = await Projeto.findAll({
        order:[ ['id_projeto', 'DESC']],
        limit:7
    })
        .then(function (data) {

            return data;
        })
        .catch(error => {
            return error;
        });

 for (let i = 0; i < data.length; i++) {

//Só quero que isto me devolva o nome!
const lider = await Utilizador.findAll({
        where: {  "$teamleader$": 2 , "$id_projeto$": data[i].getDataValue("id_projeto")},
   
    attributes: ['nome'],
   
             include: {
                model: Equipa, as: "TESTE",
                attributes: [],
                include: {
                    model: Projeto, as: "equipa_id_equipa_projeto",
                 attributes: [],
                },
            },
    })
    .catch(error =>{
        return error;
    });

    data[i].setDataValue("nome_lider", lider)
}

for (let i = 0; i < data.length; i++) {

    //Só quero que isto me devolva o nome!
    const fotos_equipa = await Utilizador.findAll({
            where: {  "$id_projeto$": data[i].getDataValue("id_projeto")},
       
        // attributes: ['foto'],
       
                 include: {
                    model: Equipa, as: "TESTE",
                    attributes: [],
                    include: {
                        model: Projeto, as: "equipa_id_equipa_projeto",
                     attributes: [],
                    },
                },
             
        })
       
        .catch(error =>{
            return error;
        });
    
    
        data[i].setDataValue("fotos_equipa", fotos_equipa)
    }



    res.json({success: true, data, data});
}

//CONTAGEM DASHBOARD PROJETOS ATIVOS
controller.ContagemAtivos = async(req, res)=>{
    const data = await Projeto.count({
        // include: [Projeto]
        where:{ "$estado_projeto$": 2}
    })
    .then(function(data){
        return data;
    })
    .catch(error =>{
        return error;
    });
    res.json({success: true, data, data});
}

//CONTAGEM DASHBOARD PROJETOS Concluidos
controller.ContagemConcluidos = async(req, res)=>{
    const data = await Projeto.count({
        // include: [Projeto]
        where:{ "$estado_projeto$": 1}
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
