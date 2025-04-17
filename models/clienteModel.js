const { DataTypes } = require("sequelize");
const sequelize = require("../database"); // Importando a conexão com o banco

const Cliente = sequelize.define("Cliente", {
  // Definindo os campos do modelo
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,   // Definindo a chave primária
    autoIncrement: true // Auto incrementa o id no banco
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false    // Não pode ser nulo
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true         // Garantindo que o e-mail será único
  },
  telefone: {
    type: DataTypes.STRING,
    allowNull: true     // O telefone pode ser nulo
  }
}, {
  // Configurações adicionais, como a tabela gerada
  tableName: "clientes",  // Nome da tabela no banco
  timestamps: true        // Cria colunas "createdAt" e "updatedAt" automaticamente
});

// Sincronizando o modelo com o banco (cria a tabela)
sequelize.sync()
  .then(() => console.log("Tabela 'clientes' criada ou já existe no banco"))
  .catch((err) => console.error("Erro ao criar tabela:", err));

module.exports = Cliente;
