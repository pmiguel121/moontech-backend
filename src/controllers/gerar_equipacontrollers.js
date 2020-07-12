
var sequelize = require('../models/database');
var gerar_equipa = require("../models/gerar_equipa");
const Skills = require('../models/skills');
const Utilizador = require('../models/utilizador');
var Projeto = require("../models/projeto");
const Equipa = require('../models/equipa');
const { Op } = require("sequelize");

//encapsular para no fim podermos fazer o export de todos os componentes, edit, delete..
const controller = {};

//quando correr vai criar as tabelas bd
sequelize.sync();


//Função para listar todas as gerar_equipa


controller.list = async (req, res) => {
    const data = await gerar_equipa.findAll({

    })
        .then(function (data) {
            return data;
        })
        .catch(error => {
            return error;
        });
    res.json({ success: true, data, data });
}




//Função para procurar uma Skill, dado um id
controller.get = async (req, res) => {
    const { id } = req.params;
    const data = await gerar_equipa.findAll({
        //se id for igual ao id
        where: { id_skill: id },
        // include: [gerar_equipa]
    })
        .then(function (data) {
            return data;
        })
        .catch(error => {
            return error;
        });
    res.json({ success: true, data, data });
}



//Função para criar uma novo gerar_equipa (adicionar)
controller.create = async (req, res) => {
    const { nome, tipo, categoria } = req.body;

    const data = await gerar_equipa.create({

        nome: nome,
        tipo: tipo,
        categoria: categoria,

    })
        .then(function (data) {
            return data;
        })

        .catch(error => {
            console.log('Erro:' + error);
            return error;
        });
    res.status(200).json({
        success: true,
        message: "Skill adicionada com sucesso",
        data: data
    });
}




//Função para editar os dados de uma Skill
controller.update = async (req, res) => {
    // parameter get id
    const { id } = req.params;
    // parameter POST
    const { titulo, descricao, generoId, foto } = req.body;
    // Update data
    const data = await gerar_equipa.update({

        titulo: titulo,
        descricao: descricao,
        generoId: generoId,
        foto: foto
    },
        {
            where: { id_skill: id }
        })
        .then(function (data) {
            return data;
        })
        .catch(error => {
            return error;
        })
    res.json({ success: true, data: data, message: "Dados atualizados com sucesso" });
}

//Função para eliminar uma Skill
controller.delete = async (req, res) => {
    const { id } = req.params;
    // const { id } = req.body; 
    console.log(id);
    const data = await gerar_equipa.destroy({
        where: { id_skill: id }
    })
    res.json({ success: true, deleted: data, message: "Skill removida com sucesso" });
}




controller.createTec = async (req, res) => {

    let id_conpetenciatecnica = 0;
    const { tagsTecArmazena } = req.body;

    //Já existe e vou buscar o id
    Skills.findOne({

        order: [['id_skill', 'ASC']],
        where: { nome: tagsTecArmazena, tipo: 1 },
    })

   
        .then(function (competenciasaff) {

            id_conpetenciatecnica = competenciasaff.id_skill;



            gerar_equipa.findOne({

                where: { id_competencia: id_conpetenciatecnica },
            })
                .then(function (competenciaexiste) {

                    if (competenciaexiste == null) {

                        if (id_conpetenciatecnica != 0) {


                            gerar_equipa.create({

                                nivel_competencia: 50,
                                nome_competencia: tagsTecArmazena,
                                id_competencia: id_conpetenciatecnica,
                                tipo: 1
                            })

                                .then(function () {

                                    res.status(200).json({
                                        success: true,
                                        // message: "Competência adicionada com sucesso"
                                    });
                                })

                                .catch(error => {
                                    console.log('Erro:' + error);
                                    return error;
                                });
                        }
                        else {
                            console.log("Estou a entrar aqui")
                        }
                    }
                    else {
                        console.log("OUTRO")
                    }
                })
                .catch(error => {
                    console.log('Erro:' + error);
                    return error;
                });
        })

        .catch(error => {
            console.log('Erro:' + error);
            return error;
        });


}




controller.createHum = async (req, res) => {


    let id_conpetenciahumana = 0;


    const { tagsHumArmazena } = req.body;

    //Já existe e vou buscar o id
    Skills.findOne({

        order: [['id_skill', 'ASC']],
        where: { nome: tagsHumArmazena, tipo: 2 },
    })
        .then(function (competenciasaff) {

            id_conpetenciahumana = competenciasaff.id_skill;

            gerar_equipa.findOne({

                where: { id_competencia: id_conpetenciahumana },
            })
                .then(function (competenciaexiste) {

                    if (competenciaexiste == null) {

                        if (id_conpetenciahumana != 0) {


                            gerar_equipa.create({

                                nivel_competencia: 50,
                                nome_competencia: tagsHumArmazena,
                                id_competencia: id_conpetenciahumana,
                                tipo: 2
                            })

                                .then(function () {

                                    res.status(200).json({
                                        success: true,
                                        // message: "Competência adicionada com sucesso"
                                    });
                                })

                                .catch(error => {
                                    console.log('Erro:' + error);
                                    return error;
                                });
                        }
                        else {
                            console.log("Estou a entrar aqui")
                        }
                    }
                    else {
                        console.log("OUTRO")
                    }
                })
                .catch(error => {
                    console.log('Erro:' + error);
                    return error;
                });
        })

        .catch(error => {
            console.log('Erro:' + error);
            return error;
        });


}


controller.SkillsTecGerar = async (req, res) => {
    const data = await gerar_equipa.findAll({
        order: [['id_competencia', 'ASC']],
        // include: [Skills]
        where: { "$tipo$": 1 }
    })
        .then(function (data) {
            return data;
        })
        .catch(error => {
            return error;
        });
    res.json({ success: true, data, data });
}



controller.SkillsTecGerarGraf = async (req, res) => {
    const data = await gerar_equipa.findAll({
        order: [['id_competencia', 'ASC']],
        // include: [Skills]
        where: { "$tipo$": 1 },
        attributes: ['nome_competencia', 'nivel_competencia'],

    })
        .then(function (data) {
            return data;
        })
        .catch(error => {
            return error;
        });
    res.json({ success: true, data, data });
}



//Função para listar as skills somente humanas
controller.SkillsHumGerar = async (req, res) => {
    const data = await gerar_equipa.findAll({
        order: [['id_competencia', 'ASC']],
        // include: [Skills]
        where: { "$tipo$": 2 }
    })
        .then(function (data) {
            return data;
        })
        .catch(error => {
            return error;
        });
    res.json({ success: true, data, data });
}


controller.SkillsHumGerarGraf = async (req, res) => {
    const data = await gerar_equipa.findAll({
        order: [['id_competencia', 'ASC']],
        // include: [Skills]
        where: { "$tipo$": 2 },
        attributes: ['nome_competencia', 'nivel_competencia'],

    })
        .then(function (data) {
            return data;
        })
        .catch(error => {
            return error;
        });
    res.json({ success: true, data, data });
}




controller.update = async (req, res) => {
    // parameter get id
    const { id } = req.params;
    // parameter POST
    const { nivel_competencia, id_competencia } = req.body;

    // Update data
    const data = await gerar_equipa.update({

        id_competencia: id_competencia,
        nivel_competencia: nivel_competencia,
    },
        {
            where: { id_competencia: id }
        })
        .then(function (data) {

            return data;
        })
        .catch(error => {
            return error;
        })
    res.json({ success: true, data: data, message: "Dados atualizados com sucesso" });
}





controller.GerarEquipa = async (req, res) => {


    const { id_projeto } = req.body;

    const { nr_user } = req.decoded;

  
    const projeto = await Projeto.findOne({
        where: { id_projeto: id_projeto },

    })
    
        .then(function (projeto) {
            return projeto;
        })



    const equipa = await Equipa.findOne({
        where: { id_equipa: projeto.equipa_id_equipa_projeto }
    })
    .then(function (equipa) {
        return equipa;
    })
    .catch(error => {
        console.log('Erro:' + error);
        return error;
    });

    

    const CompEscolhidas = await gerar_equipa.findAll({
        where:{}

    })
    .then(function (CompEscolhidas) {
        return CompEscolhidas;
    })
    .catch(error => {
        console.log('Erro:' + error);
        return error;
    });

    for (let i = 0; i < CompEscolhidas.length; i++) {

        console.log(i + CompEscolhidas[i])

    }

    



    if (projeto.disponibilidade == 0) { projeto.disponibilidade = false } else { projeto.disponibilidade = true }

    if (projeto.hora_extra == 0) { projeto.hora_extra = false } else { projeto.hora_extra = true }

    if (projeto.reunircliente == 0) { projeto.reunircliente = false } else { projeto.reunircliente = true }


   
    data = await Utilizador.findAll({

        distinct: true,
        attributes: ['id_utilizador', 'fotourl', 'nome'],
        where: {
            "$viajar$": projeto.disponibilidade, "$horasextra$": projeto.hora_extra, "$reunircliente$": projeto.reunircliente, "$estado$": true,
            "$id_utilizador$": { [Op.ne]: nr_user },
        },
        include: {
            model: Skills, as: "skills_utilizadores_skills",
            where: {
                "$skills_id_skills$": { [Op.in]:CompEscolhidas.map(a => a.id_competencia) },
                "$nivel$": { [Op.between]: [40, 100] },

            },
        },
        limit: projeto.nr_elementos-1
    })

        .then(function (uti_escol) {
            console.log(uti_escol)
            return res.json({ success: true, data: uti_escol });
        })
        .catch(error => {
            console.log('Erro:' + error);
            return error;
        });

       
}


controller.apagargerarequipa = async (req, res) => {

    ApagarSkillsEscolhidas = await gerar_equipa.destroy({
        where:{},
        
    
    })

}



//Função para eliminar uma Skill
controller.delete = async (req, res) => {
    const { id } = req.params;
    // const { id } = req.body; 
    console.log(id);
    const data = await gerar_equipa.destroy({
        where: { id_gerarequipa: id }
    })
    res.json({ success: true, deleted: data, message: "Skill removida com sucesso" });
}




module.exports = controller;