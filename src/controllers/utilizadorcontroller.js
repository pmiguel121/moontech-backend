const sequelize = require('../models/database');
var utilizador_equipas = require("../models/utilizador_equipas");
var Utilizador = require("../models/utilizador");

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../config');

var utilizador_skills = require("../models/utilizador_skills");
var Projeto = require("../models/projeto");
var Equipa = require("../models/equipa");
const Skills = require('../models/skills');

//encapsular para no fim podermos fazer o export de todos os componentes, edit, delete..
const controller = {};

//quando correr vai criar as tabelas bd
sequelize.sync();

//TESTE SEQUELIZE


controller.BuscaSkillsEspcTecnicas = async (req, res) => {
    const { id } = req.params;

    const data = await Utilizador.findAll({

        where: { id_utilizador: id },
        include: {
            model: Skills, as: "skills_utilizadores_skills",
            where: { tipo: 1 },
        }
    })
        .then(function (data) {
            return data;
        })
        .catch(error => {
            return error;
        });
    res.json({ success: true, data, data });
}



controller.BuscaSkillsEspcHumanas = async (req, res) => {
    const { id } = req.params;

    const data = await Utilizador.findAll({

        where: { id_utilizador: id },
        include: {
            model: Skills, as: "skills_utilizadores_skills",
            where: { tipo: 2 },
        }
    })
        .then(function (data) {
            return data;
        })
        .catch(error => {
            return error;
        });
    res.json({ success: true, data, data });
}




//CONTAGEM DASHBOARD DEVS~

controller.ContarDevs = async (req, res) => {
    const data = await Utilizador.count({
        where: {"$tipo$" : [1,2] }
    })
        .then(function (data) {
            return data;
        })
        .catch(error => {
            return error;
        });
    res.json({ success: true, data, data });
}

controller.BuscaNomeLideres = async (req, res) => {

    const data = await Utilizador.findAll({
        where: { "$tipo$": 2 },

    })
        .then(function (data) {
            return data;
        })

        .catch(error => {
            return error;
        });




    res.json({ success: true, data: data });

}

controller.list = async (req, res) => {

    let data = await Utilizador.findAll({
        where: {tipo : [1,2] },
        include: {
            model: Skills, as: "skills_utilizadores_skills",
            
         },
        
        order: [['id_utilizador', 'ASC']]
    })
        .then(function (data) {

            return data;
        })
        .catch(error => {
            return error;
        });

    //isto foi para conseguirmos juntar as duas "queries", através do for, uma vez que o foreach não dá para funções assincronas

    //para cada utilizador, anda!
    for (let i = 0; i < data.length; i++) {

        //armazena na constante projetos quantos projetos tem cada pessoa
        const projetos = await Utilizador.count({
            where: { "$estado_projeto$": 2, "$id_utilizador$": data[i].getDataValue("id_utilizador") },
            include: {
                model: Equipa, as: "TESTE",
                include: {
                    model: Projeto, as: "equipa_id_equipa_projeto",
                },
            },
          
        })
            .catch(error => {
                return error;
            });

        //para cada um dos utilizadores mostra "n_projetos_utilizador "numero""
        data[i].setDataValue("n_projetos_utilizador", projetos)
    }
    //devolve a informação da variavel data!
    res.json({ success: true, data: data });

}



controller.listagemDEVSTroca = async (req, res) => {

    const { QueryTypes } = require('sequelize');
    const data = await sequelize.query(
        "SELECT id_utilizador, tipo , nome FROM utilizador WHERE tipo != '3' AND id_utilizador NOT IN (Select utilizador_equipas.utilizador_id_utilizador from utilizador_equipas WHERE teamleader = '2') order by id_utilizador",
        {
          replacements: ['active'],
          type: QueryTypes.SELECT
        }
      );
       
    res.json({ success: true, data, data });
}


controller.listrecentes = async (req, res) => {


    let data = await Utilizador.findAll({
        order: [['id_utilizador', 'DESC']],
        where: {tipo : [1,2] },
        include: {
            model: Skills, as: "skills_utilizadores_skills",
            
         },
        limit: 7
    })
        .then(function (data) {

            return data;
        })
        .catch(error => {
            return error;
        });


    //isto foi para conseguirmos juntar as duas "queries", através do for, uma vez que o foreach não dá para funções assincronas


    //para cada utilizador, anda!
    for (let i = 0; i < data.length; i++) {

        //armazena na constante projetos quantos projetos tem cada pessoa
        const projetos = await Utilizador.count({
            where: { "$estado_projeto$": 1, "$id_utilizador$": data[i].getDataValue("id_utilizador") },
            include: {
                model: Equipa, as: "TESTE",
                include: {
                    model: Projeto, as: "equipa_id_equipa_projeto",
                },
            }
        })
            .catch(error => {
                return error;
            });

        //para cada um dos utilizadores mostra "n_projetos_utilizador "numero""
        data[i].setDataValue("n_projetos_utilizador", projetos)
    }
    //devolve a informação da variavel data!
    res.json({ success: true, data: data });

}

//Função para listar todos os utilizadores

controller.outro = async (req, res) => {


    //função para contar projetos ativos
    const data_n_projeto = await Utilizador.findAndCountAll({
        where: { "$estado_projeto$": 1, "$id_utilizador$": 1 },
        include: {
            model: Equipa, all: true,
            include: {
                model: Projeto, as: "equipa_id_equipa_projeto",
            },
        }
    })
        .then(function (data) {

            return data;
        })
        .catch(error => {
            return error;
        });
    res.json({ success: true, data: data });
}

//Função para procurar um utilizador, dado um id
controller.get = async (req, res) => {
    const { id } = req.params;
    const data = await Utilizador.findAll({
        //se id for igual ao id
        where: { id_utilizador: id },
        //include: [skills]
    })
        .then(function (data) {
            return data;
        })
        .catch(error => {
            return error;
        });
    res.json({ success: true, data, data });
}


//para criar novo utilizador
controller.create = async (req, res) => {
    const { nome, email, password, tipo, morada, codigopostal, telemovel, genero, fotourl, datanascimento, viajar, horasextra, reunircliente, anos_experiencia, interesses, nr_contribuinte, formacao, localidade, tagsTec, tagsHum } = req.body;

    //transformação
    let v = 0;
    let e = 0;
    let h = 0;
    let r = 0;

    if (viajar == false) { v = 0 } else { v = 1 }

    if (horasextra == false) { h = 0 } else { h = 1 }

    if (reunircliente == false) { r = 0 } else { r = 1 }

    let id_conpetenciatecnica = 0;

    let id_conpetenciahumanas = 0;

    const data = await Utilizador.create({

        nome: nome,
        email: email,
        password: password,
        estado: 1 ,
        morada: morada,
        codigopostal: codigopostal,
        telemovel: telemovel,
        // foto: foto,
        fotourl: "https://s2.glbimg.com/5IEojOCGN6bgFV5L2K_RKB5dtvk=/e.glbimg.com/og/ed/f/original/2020/03/31/cat-4548812_960_720.jpg",
        genero: genero,
        datanascimento: datanascimento,
        viajar: v,
        horasextra: h,
        reunircliente: r,
        anos_experiencia: anos_experiencia,
        interesses: interesses,
        nr_contribuinte: nr_contribuinte,
        formacao: formacao,
        localidade: localidade,
        tipo:1
    })

        .then(function (data) {
            return data;

        })

        .catch(error => {
            console.log('Erro:' + error);
            return error;
        });

    // Tecnicas

    for (let i = 0; i < tagsTec.length; i++) {

        //verifica se existes uma competencia com aquele nome
        const competencias = await Skills.count({
            where: { nome: tagsTec[i], tipo:1},
        })
            .then(function (competencias) {
                return competencias;
            })
            .catch(error => {
                console.log('Erro:' + error);
                return error;
            });

        if (competencias == 0) {
            
        } else {
            //Já existe e vou buscar o id
            const competencias_ = await Skills.findOne({
                order: [['id_skill', 'ASC']],
                where: { nome: tagsTec[i], tipo:1},
            })
                .then(function (competencias_) {
                    return competencias_;
                })

                .catch(error => {
                    console.log('Erro:' + error);
                    return error;
                });
            
   
             id_conpetenciatecnica = competencias_.id_skill;
        }
        

        if (id_conpetenciatecnica != null) {
            const skill = await utilizador_skills.create({

                nivel: 50,
                utilizador_id_utilizador_skills: data.id_utilizador,
                skills_id_skills: id_conpetenciatecnica,

            })
            
                .then(function (skill) {
                    return skill;
                })

                .catch(error => {
                    console.log('Erro:' + error);
                    return error;
                });
        }

     
       
    }

    //Humanas

    for (let i = 0; i < tagsHum.length; i++) {

        //verifica se existes uma competencia com aquele nome
        const competencias = await Skills.count({
            where: { nome: tagsHum[i], tipo:2},
        })
            .then(function (competencias) {
                return competencias;
            })
            .catch(error => {
                console.log('Erro:' + error);
                return error;
            });

        if (competencias == 0) {
            
        } else {
            //Já existe e vou buscar o id
            const competencias_ = await Skills.findOne({
                order: [['id_skill', 'ASC']],
                where: { nome: tagsHum[i], tipo:2},
            })
                .then(function (competencias_) {
                    return competencias_;
                })
                .catch(error => {
                    console.log('Erro:' + error);
                    return error;
                });
            
   
             id_conpetenciahumanas = competencias_.id_skill;
        }
        

        if (id_conpetenciahumanas != null) {
            const skill = await utilizador_skills.create({

                nivel: 50,
                utilizador_id_utilizador_skills: data.id_utilizador,
                skills_id_skills: id_conpetenciahumanas,

            })
            
                .then(function (skill) {
                    return skill;
                })

                .catch(error => {
                    console.log('Erro:' + error);
                    return error;
                });
        }
     
       
    }
    
}

//Login
controller.login = async (req, res) => {
    // console.log(req.body)
    if (req.body.email === '' || req.body.email === null || req.body.email === 'undefined' || req.body.password === '' || req.body.password === null || typeof req.body.password === 'undefined') {
        return res.status(403).json({
            success: false,
            message: 'Campos em Branco',
        })
    } else if (req.body.email && req.body.password) {
        var email = req.body.email
        var password = req.body.password


        var user = await Utilizador.findOne({
            where: { 
                email: email
            }
        }).then((data) => {
            if (!data || !bcrypt.compareSync(password, data.password)) {
                return res.json({
                    success: false,
                    message: 'Dados de autenticação inválidos.',
                })
            }
            let token = jwt.sign({
                    nr_user: data.id_utilizador,
                    email: email,
                    tipo_utilizador: data.tipo
                }, config.jwtSecret, { expiresIn: '1h' })

            return res.json({
                success: true,
                message: 'Autenticação realizada com sucesso!',
                token: token,
                nrUser: data.id_utilizador,
                tipoUser: data.tipo,
                nome: data.nome,
                email: data.email
            })
            
        }).catch((error) => {
            console.log(error)
            return res.json({
                success: false,
                message: 'Erro no processo de autenticação. Tente de novo mais tarde.',
            })
        })
    }
}

//Função para editar os dados de um utilizador
controller.update = async (req, res) => {
    // parameter get id
    const { id } = req.params;


    // parameter POST

    const { nome, tipo, nr_contribuinte, estado, telemovel, email, morada, localidade, codigopostal, datanascimento, formacao, horasextra, reunircliente, viajar, interesses } = req.body;
    // Update data
    await Utilizador.update({
        nome: nome,
        nr_contribuinte: nr_contribuinte,
        estado: estado,
        telemovel: telemovel,
        email: email,
        morada: morada,
        localidade: localidade,
        codigopostal: codigopostal,
        datanascimento: datanascimento,
        formacao: formacao,
        horasextra: horasextra,
        reunircliente: reunircliente,
        viajar: viajar,
        interesses: interesses,
        tipo: tipo
    },{
        where: { id_utilizador: id },

        
    })
    .then(function (data) {
        return res.json({ success: true, data: data, 
            // message: "Dados atualizados com sucesso" 
        })
    
    })
    
    .catch(() => {
     
        return res.json({ success: false, data: data, message: "Erro" })
    });
    

    
    
}

//Função para editar o tipo de um utilizador
controller.updatetipo = async (req, res) => {
    // parameter get id
    const { id } = req.params;


    const { tipo } = req.body;
    // Update data
    const data = await Utilizador.update({

        tipo: tipo
    },
        {
            where: { id_utilizador: id },

        })
        .then(function (data) {

            return data;
        })
        .catch(error => {
            return error;

        })

    res.json({ success: true, data: data, message: "Dados atualizados com sucesso" });
}

//Função para eliminar um utilizador
controller.delete = async (req, res) => {
    const { id } = req.params;
    // const { id } = req.body; 
    console.log(id);
    const data = await Utilizador.destroy({
        where: { id_utilizador: id }
    })
    res.json({ success: true, deleted: data, message: "Utilizador removido com sucesso" });
}
module.exports = controller;