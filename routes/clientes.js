const express = require('express');
const router = express.Router();
const clientesController = require('../controllers/clientesController');
const { body, param, validationResult } = require('express-validator');

// Middleware de validação para os parâmetros e o corpo das requisições
const validarCliente = [
  body('nome').notEmpty().withMessage('Nome é obrigatório'),
  body('email').isEmail().withMessage('Email inválido').notEmpty().withMessage('Email é obrigatório'),
  body('telefone').optional().isString().withMessage('Telefone deve ser uma string'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ erros: errors.array() });
    }
    next();
  }
];

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
router.get('/', clientesController.listarClientes);

router.post('/', validarCliente, clientesController.cadastrarCliente);

router.put('/:id', validarId, validarCliente, clientesController.atualizarCliente);

router.delete('/:id', validarId, clientesController.removerCliente);

module.exports = router;
