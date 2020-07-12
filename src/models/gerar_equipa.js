var Sequelize = require('sequelize');
var sequelize = require('./database');



var gerar_equipa = sequelize.define('gerar_equipa', {

    id_gerarequipa: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    id_competencia:Sequelize.INTEGER,
    nivel_competencia: Sequelize.INTEGER,
    nome_competencia: Sequelize.STRING,
    tipo: Sequelize.INTEGER


},
{
timestamps: false,
tableName: "gerar_equipa" 

});




module.exports =gerar_equipa;