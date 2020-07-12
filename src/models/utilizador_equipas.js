var Sequelize = require('sequelize');
var sequelize = require('./database');

var utilizador = require('./utilizador');
var equipa = require('./equipa');
const Utilizador = require('./utilizador');

var utilizador_equipas = sequelize.define('utilizador_equipas', {

    id_utilizadorequipas: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    teamleader: Sequelize.INTEGER,
},
    {
        timestamps: false,
        tableName: "utilizador_equipas"

    });
   

    utilizador.belongsToMany(equipa, {
        through: utilizador_equipas ,
        as: 'TESTE',
        foreignKey: 'utilizador_id_utilizador',
        otherKey: 'equipa_id_equipa'
      });

      equipa.belongsToMany(utilizador, {
        through: utilizador_equipas ,
        as: 'TESTE1',
        foreignKey: 'equipa_id_equipa',
        otherKey: 'utilizador_id_utilizador'
      });





    equipa.hasMany(utilizador_equipas,{
        foreignKey: 'equipa_id_equipa',
           as: 'equipa_id_equipa'
      });


      Utilizador.hasMany(utilizador_equipas,{
        foreignKey: 'utilizador_id_utilizador',
           as: 'equipa_id_equipa1'
      });
     
     
     


 //utilizador_equipas.belongsTo( equipa,{as: 'EQUIPA_ID_EQUIPA2', foreignKey: 'equipa_id_equipa'}); 

module.exports = utilizador_equipas;


