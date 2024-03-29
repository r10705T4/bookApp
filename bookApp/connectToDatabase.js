const Sequelize = require('sequelize') ;
const databaseConfigs = require('./config/database') ;

const sequelize = new Sequelize(databaseConfigs.mariadb) ;

  async function connectionToDatabase(){
    try {
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  }

  connectionToDatabase() ;

  module.exports = sequelize ;