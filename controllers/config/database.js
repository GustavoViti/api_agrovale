const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    logging: false, // desativa logs SQL no console
  }
);

// Testa conexão
sequelize.authenticate()
  .then(() => {
    console.log("✅ Conectado ao banco de dados com sucesso!");
  })
  .catch((err) => {
    console.error("❌ Erro ao conectar ao banco de dados:", err.message);
  });

module.exports = sequelize;
