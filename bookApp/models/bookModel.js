const DataTypes = require('sequelize') ;

const sequelize = require('../connectToDatabase') ; 

const Book = sequelize.define('Book',
{
  bookId:{
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    primaryKey: true,
    autoIncrement: true
  },
  bookTitle:{
    type:DataTypes.STRING,
    allowNull:false
  },
  bookAuthor:{
    type:DataTypes.STRING,
    allowNull:false
  },
  bookKind:{
    type:DataTypes.STRING,
    allowNull: false
  },
  bookYear:{
    type: DataTypes.INTEGER,
    allowNull: false
  }


});

Book.sync({ force: true });

module.exports = Book ;