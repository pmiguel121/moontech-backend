var Sequelize = require('sequelize');
var sequelize = require('./database');

var equipa = require('./equipa');
var projeto = sequelize.define('projeto', {

    id_projeto: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    nome: Sequelize.STRING,
    sigla:{ type: Sequelize.STRING,
        unique: true},
    data_inicio: Sequelize.DATEONLY,
    data_fim: Sequelize.DATEONLY,
    nr_elementos: Sequelize.INTEGER,
    disponibilidade: Sequelize.INTEGER,
    hora_extra: Sequelize.INTEGER,
    reunircliente: Sequelize.INTEGER,
    estado_projeto: Sequelize.INTEGER,
    descricao: Sequelize.STRING,

},
{
timestamps: false,
tableName: "projeto"

});

//supostamente o correto 

equipa.hasMany(projeto, {
    foreignKey: 'equipa_id_equipa_projeto',
    as: 'equipa_id_equipa_projeto'
  });

projeto.belongsTo(equipa, {
    foreignKey: 'equipa_id_equipa_projeto',
    as: 'equipa_id_equipa_projeto1'
})




 //projeto.belongsTo( equipa,{as: 'equipa_id_equipa_projeto1', foreignKey: 'equipa_id_equipa_projeto'});

module.exports =projeto;