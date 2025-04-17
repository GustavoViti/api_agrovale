const express = require('express');
const router = express.Router();
const produtosController = require('../controllers/produtosController');
const { body, param, validationResult } = require('express-validator');

// Middleware de validação para o corpo da requisição
const validarProduto = [
  body('nome').notEmpty().withMessage('Nome é obrigatório'),
  body('preco').isFloat({ gt: 0 }).withMessage('Preço deve ser um número positivo'),
  body('quantidade').isInt({ gt: -1 }).withMessage('Quantidade deve ser um número inteiro e não negativo'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ erros: errors.array() });
    }
    next();
  }
];

// Middleware de validação para o parâmetro id nas rotas PUT e DELETE
const validarId = [
  param('id').isInt().withMessage('O id deve ser um número inteiro'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ erros: errors.array() });
    }
    next();
  }
];

// Definindo as rotas
router.get('/', produtosController.listarProdutos);

router.post('/', validarProduto, produtosController.cadastrarProduto);

router.put('/:id', validarId, validarProduto, produtosController.atualizarProduto);

router.delete('/:id', validarId, produtosController.removerProduto);

module.exports = router;
