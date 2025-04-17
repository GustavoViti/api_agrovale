const express = require('express');
const dotenv = require('dotenv');
const sequelize = require('./config/database'); // Configuração do Sequelize
const clientesRoutes = require('./routes/clientes'); // Rotas dos clientes
const produtosRoutes = require('./routes/produtos'); // Rotas dos produtos

// Carregar as variáveis do arquivo .env
dotenv.config();

// Criar uma instância do Express
const app = express();

// Middleware para interpretar o corpo das requisições como JSON
app.use(express.json());

// Configurar as rotas
app.use('/clientes', clientesRoutes);
app.use('/produtos', produtosRoutes);

// Verificar a conexão com o banco de dados
sequelize.authenticate()
  .then(() => {
    console.log('Conectado ao banco de dados com sucesso!');
    // Iniciar o servidor após a conexão com o banco de dados
    const PORT = process.env.PORT || 3000; // A porta pode ser configurada no .env
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Erro na conexão com o banco de dados:', err);
    process.exit(1); // Se a conexão falhar, o servidor não vai iniciar
  });
