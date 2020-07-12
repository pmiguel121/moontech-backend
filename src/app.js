const express = require('express');
const app = express();

//Fotos
const path = require('path');
require("dotenv").config();

const bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())


//cors
const cors = require("cors");

const utilizadoroutes =require ("./routes/utilizadorroutes");
const skillsroutes =require ("./routes/skillsroutes");
const projetoroutes =require ("./routes/projetoroutes");
const equiparoutes =require ("./routes/equiparoutes");
const utilizadorSkillsroutes =require ("./routes/utilizador_skillsroutes");
const utilizadorequipasroutes =require ("./routes/utilizador_equipasroutes");
const gerar_equiparoutes =require ("./routes/gerar_equiparoutes");

//autenticação
//const middleware = require('./middleware');

// Configurar CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//Configurações

// app.set('port', process.env.port || 4000);
app.listen(process.env.PORT || 4000)

//Middlewares
app.use(cors());
app.use(express.json());

//Autenticaçao 

//app.use('/user', utilizadoroutes);
//middleware.checkToken
app.use("/utilizador", utilizadoroutes);
app.use("/skill", skillsroutes);
app.use("/projeto", projetoroutes);
app.use("/equipa", equiparoutes);
app.use("/utilizador_skills", utilizadorSkillsroutes);
app.use("/utilizador_equipas", utilizadorequipasroutes);
app.use("/gerar_equipa", gerar_equiparoutes);



app.listen(app.get('port'),()=>{
console.log("Servidor iniciado na porta "+app.get('port'));
})