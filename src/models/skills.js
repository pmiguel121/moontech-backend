var Sequelize = require('sequelize');
var sequelize = require('./database');

var Skills = sequelize.define('skills', {

    id_skill: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    nome: Sequelize.STRING,
    tipo: Sequelize.INTEGER,
    categoria: Sequelize.STRING,
  
},
{
timestamps: false,
tableName: "skills" 

});

// Utilizador.belongsTo(utilizador_skills_id_utilizadorskills)
module.exports =Skills;