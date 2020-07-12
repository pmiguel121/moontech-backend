var Sequelize = require('sequelize');
var sequelize = require('./database');
var utilizador_equipas = require("../models/utilizador_equipas");

var equipa = sequelize.define('equipa', {

    id_equipa: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    estado: Sequelize.INTEGER,

},
{
timestamps: false,
tableName: "equipa"

});





module.exports = equipa;