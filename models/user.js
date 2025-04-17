const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // Verificando o caminho correto

const User = sequelize.define("User", {
  id: { 
    type: DataTypes.INTEGER, 
    autoIncrement: true, 
    primaryKey: true 
  },
  nome: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },
  email: { 
    type: DataTypes.STRING, 
    allowNull: false, 
    unique: true 
  },
}, {
  tableName: 'users', // Nome da tabela no banco de dados
  timestamps: true,   // Cria automaticamente 'createdAt' e 'updatedAt'
});

// Não sincronizar a tabela dentro do model. 
// Isso deve ser feito em um script ou arquivo de inicialização.
module.exports = User;
