const Sequelize = require('sequelize');
const sequelize = require('./database');
const bcrypt = require('bcrypt'); //encripta a pass a guardar na BD
const multer  = require('multer')


var Utilizador = sequelize.define('utilizador', {

    id_utilizador: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nome: Sequelize.STRING,
    email: {
        type: Sequelize.STRING,
        unique: true
    },
    password: {
        type: Sequelize.STRING,

    },
    estado: Sequelize.BOOLEAN,
    tipo: Sequelize.INTEGER,
    morada: Sequelize.STRING,
    genero: Sequelize.INTEGER,
    localidade: Sequelize.STRING,
    codigopostal: Sequelize.STRING,
    telemovel: Sequelize.INTEGER,
    fotourl: Sequelize.STRING,
    nomefoto: Sequelize.STRING,
    tamanhofoto: Sequelize.STRING,
    keyfoto: Sequelize.STRING,
    datanascimento: Sequelize.DATEONLY,
    viajar: Sequelize.BOOLEAN,
    horasextra: Sequelize.BOOLEAN,
    reunircliente: Sequelize.BOOLEAN,
    anos_experiencia: Sequelize.INTEGER,
    interesses: Sequelize.STRING,
    nr_contribuinte: Sequelize.INTEGER,
    formacao: Sequelize.STRING
},
    {
        timestamps: false,
        tableName: "utilizador"

    });

Utilizador((utilizador, options) => {
    if (!utilizador.fotourl) {
        utilizador.fotourl = `${process.env.APP_URL}/files/${utilizador.keyfoto}`
    }
    return bcrypt.hash(utilizador.password, 10)

        .then(hash => {
            utilizador.password = hash;
        })
        .catch(err => {
            throw new Error();
        });
});


Utilizador.beforeCreate((utilizador, options) => {

    return bcrypt.hash(utilizador.password, 10)
        .then(hash => {
            utilizador.password = hash;
        })
        .catch(err => {
            throw new Error();
        });
});


module.exports = Utilizador;