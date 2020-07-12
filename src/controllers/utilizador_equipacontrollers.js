var sequelize = require('../models/database');
var utilizador_equipas = require("../models/utilizador_equipas");
var Utilizador = require("../models/utilizador");
var gerar_equipa = require("../models/gerar_equipa");


var utilizador_equipas = require("../models/utilizador_equipas");
var Projeto = require("../models/projeto");
var Equipa = require("../models/equipa");

//encapsular para no fim podermos fazer o export de todos os componentes, edit, delete..
const controller = {};

//quando correr vai criar as tabelas bd
sequelize.sync();






    controller.list = async(req, res)=>{
        const data = await utilizador_equipas.findAll({
            // include: [equipas]
        })
        .then(function(data){
            return data;
        })
        .catch(error =>{
            return error;
        });
        res.json({success: true, data, data});
    }




//Função para procurar um utilizador, dado um id
controller.get = async (req, res) => {
    const { id } = req.params;
    const data = await utilizador_equipas.findAll({
        //se id for igual ao id
        where: { id_utilizadorequipas: id },
        //include: [equipas]
    })
        .then(function (data) {
            return data;
        })
        .catch(error => {
            return error;
        });
    res.json({ success: true, data, data });
}




//para criar novo utilizador //NAO ESTA A SER NECESSARIA
controller.create = async (req, res) => {
 
    const { IDEquipa, ElementosEq} = req.body;

    let ArmazenaElementos = ElementosEq.map(a => a.id_utilizador)


    for (let i = 0; i < ArmazenaElementos.length; i++) {

    const data = await utilizador_equipas.create({

       utilizador_id_utilizador: ArmazenaElementos[i] ,
       equipa_id_equipa: IDEquipa ,
       teamleader:1,

    })
        .then(function (data) {
            return data;

        })
    }

    // //     .catch(error => {
    // //         console.log('Erro:' + error);
    // //         return error;
    // //     });
    // // res.status(200).json({
    // //     success: true,
    // //     message: "Utilizador criado com sucesso",
    // //     data: data
    // });
}








controller.update = async (req, res) => {



    
    const {IDEquipa , ElementosEq} = req.body;


    

    for (let i = 0; i < ElementosEq.length; i++) {
    const teste = await utilizador_equipas.update({

         where: { id_utilizadorequipas: IDEquipa }

    })
    .then(function (teste) {
        return teste;
    })
    .catch(error => {
        return error;
    });

    
   
     
}



    


    
   
}










//Função para eliminar um utilizador
controller.delete = async (req, res) => {
    const { id } = req.params;
    // const { id } = req.body; 
    console.log(id);
    const data = await utilizador_equipas.destroy({
        where: { id_utilizadorequipas: id }
    })
    res.json({ success: true, deleted: data, message: "Competência removida com sucesso" });
}
module.exports = controller;