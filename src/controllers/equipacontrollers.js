var sequelize = require("../models/database");
var Utilizador = require("../models/utilizador");
var Skills = require("../models/skills");
var Projeto = require("../models/projeto");
var Equipa = require("../models/equipa");

//encapsular para no fim podermos fazer o export de todos os componentes, edit, delete..
const controller = {};

//quando correr vai criar as tabelas bd
sequelize.sync();


//Função para listar todas as Equipa
controller.list = async(req, res)=>{
    const data = await Equipa.findAll({
        // include: [Equipa]
    })
    .then(function(data){
        return data;
    })
    .catch(error =>{
        return error;
    });
    res.json({success: true, data, data});
}


//Função para procurar uma equipa, dado um id
controller.get = async (req, res) => {
    const { id } = req.params;
    const data = await Equipa.findAll({
        //se id for igual ao id
        where: { id_equipa: id },
        // include: [Equipa]
    })
        .then(function (data) {
            return data;
        })
        .catch(error => {
            return error;
        });
    res.json({ success: true, data, data });
}


//Função para criar uma novo Equipa (adicionar)
controller.create = async (req, res) => {
    const { estado, descricao } = req.body;

    const data = await Equipa.create({
        descricao: descricao,
        estado: 2

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
        message: "Equipa adicionada com sucesso",
        data: data
    });
}






controller.update = async (req, res) => {
   
    const { id } = req.params;
 
    const { estado, descricao} = req.body;
    
    const data = await Equipa.update({
        estado: estado,
        descricao: descricao
        
    },
        {
            where: { id_equipa: id }
        })
        .then(function (data) {
            return data;
        })
        .catch(error => {
            return error;
        })
    res.json({ success: true, data: data, message: "Dados atualizados com sucesso" });
}












//Função para eliminar uma equipa
controller.delete = async (req, res) => {
    const { id } = req.params;
    // const { id } = req.body; 
    console.log(id);
    const data = await Equipa.destroy({
        where: { id_equipa: id }
    })
    res.json({ success: true, deleted: data, message: "Equipa removida com sucesso" });
}
module.exports = controller;