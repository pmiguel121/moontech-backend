var Sequelize = require('sequelize');
const sequelize = new Sequelize(

'deevto2lmo998f',
'loqkwobmlbzfgv',
'9cc33ca0f14661375ea359e0db6da98d88b721ed06a8ba9f44eafde54a1fecc5',
{
host: 'ec2-3-234-169-147.compute-1.amazonaws.com',
port: '5432',
dialect: 'postgres'

}
);
module.exports = sequelize;