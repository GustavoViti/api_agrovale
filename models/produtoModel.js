const { DataTypes } = require("sequelize");
const sequelize = require("../database"); // Importando a conexão com o banco

const Produto = sequelize.define("Produto", {
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
  preco: {
    type: DataTypes.FLOAT,
    allowNull: false    // Não pode ser nulo
  },
  quantidade: {
    type: DataTypes.INTEGER,
    allowNull: false,   // Não pode ser nulo
    defaultValue: 0     // Caso não seja informado, define o valor padrão como 0
  }
}, {
  // Configurações adicionais, como a tabela gerada
  tableName: "produtos", // Nome da tabela no banco
  timestamps: true       // Cria colunas "createdAt" e "updatedAt" automaticamente
});

// Sincronizando o modelo com o banco (cria a tabela)
sequelize.sync()
  .then(() => console.log("Tabela 'produtos' criada ou já existe no banco"))
  .catch((err) => console.error("Erro ao criar tabela:", err));

module.exports = Produto;
