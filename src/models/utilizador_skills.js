var Sequelize = require('sequelize');
var sequelize = require('./database');

var utilizador = require('./utilizador');
var skills = require('./skills');

var utilizador_skills = sequelize.define('utilizador_skills', {

    id_utilizadorskills: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    nivel: Sequelize.INTEGER,



},
{
timestamps: false,
tableName: "utilizador_skills" 

});

utilizador.belongsToMany(skills, {
    through: utilizador_skills ,
    as: 'skills_utilizadores_skills',
    foreignKey: 'utilizador_id_utilizador_skills',
    otherKey: 'skills_id_skills'
 
  });

  skills.belongsToMany(utilizador, {
    through: utilizador_skills ,
    as: 'skills_utilizadores_skills1',
    foreignKey: 'skills_id_skills',
    otherKey: 'utilizador_id_utilizador_skills'
 
  });


  skills.hasMany(utilizador_skills,{
    foreignKey: 'skills_id_skills',
       as: 'skills_id_skills1'
  });


  utilizador.hasMany(utilizador_skills,{
    foreignKey: 'utilizador_id_utilizador_skills',
       as: 'utilizador_id_utilizador_skills1'
  });
 


/*

utilizador_skills.belongsTo(skills);
utilizador_skills.belongsTo(utilizador);
*/
module.exports =utilizador_skills;