var Sequelize = require('sequelize');
var sequelize = require('./database');

var utilizador = require('./utilizador');

var notificacao = sequelize.define('notificacao', {

    id_notificacoes: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    descricao: Sequelize.STRING,
    data: Sequelize.DATE,
    aceite: Sequelize.BOOLEAN,

    Utilizador_id_Utilizador:{
        type: Sequelize.INTEGER,
        references: {
            model:utilizador,
            key:'id_utilizador'
        }
    } 
},
{
timestamps: false,
tableName: "notificacao" 

});
/*
notificacao.belongsTo(utilizador);
*/
module.exports =notificacao;