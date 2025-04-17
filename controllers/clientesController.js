let clientes = [];

exports.listarClientes = (req, res) => {
  res.json(clientes);
};

exports.cadastrarCliente = (req, res) => {
  try {
    const { nome, email } = req.body;

    // Validação básica
    if (!nome || !email) {
      return res.status(400).json({ mensagem: 'Nome e email são obrigatórios.' });
    }

    const cliente = { id: clientes.length + 1, nome, email };
    clientes.push(cliente);
    res.status(201).json(cliente);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro interno ao cadastrar cliente.' });
  }
};

exports.atualizarCliente = (req, res) => {
  try {
    const { id } = req.params;
    const { nome, email } = req.body;

    const index = clientes.findIndex(c => c.id == id);
    if (index === -1) {
      return res.status(404).json({ mensagem: 'Cliente não encontrado.' });
    }

    // Validação
    if (!nome || !email) {
      return res.status(400).json({ mensagem: 'Nome e email são obrigatórios para atualizar.' });
    }

    clientes[index] = { id: Number(id), nome, email };
    res.json(clientes[index]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro interno ao atualizar cliente.' });
  }
};

exports.removerCliente = (req, res) => {
  try {
    const { id } = req.params;
    const existe = clientes.some(c => c.id == id);

    if (!existe) {
      return res.status(404).json({ mensagem: 'Cliente não encontrado.' });
    }

    clientes = clientes.filter(c => c.id != id);
    res.json({ mensagem: 'Cliente removido com sucesso.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro interno ao remover cliente.' });
  }
};
