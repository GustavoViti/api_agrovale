let produtos = [];

exports.listarProdutos = (req, res) => {
  res.json(produtos);
};

exports.cadastrarProduto = (req, res) => {
  try {
    const { nome, preco } = req.body;

    if (!nome || preco == null) {
      return res.status(400).json({ mensagem: 'Nome e preço são obrigatórios.' });
    }

    if (typeof preco !== 'number' || preco < 0) {
      return res.status(400).json({ mensagem: 'Preço deve ser um número positivo.' });
    }

    const produto = { id: produtos.length + 1, nome, preco };
    produtos.push(produto);
    res.status(201).json(produto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro interno ao cadastrar produto.' });
  }
};

exports.atualizarProduto = (req, res) => {
  try {
    const { id } = req.params;
    const { nome, preco } = req.body;

    const index = produtos.findIndex(p => p.id == id);
    if (index === -1) {
      return res.status(404).json({ mensagem: 'Produto não encontrado.' });
    }

    if (!nome || preco == null) {
      return res.status(400).json({ mensagem: 'Nome e preço são obrigatórios para atualizar.' });
    }

    if (typeof preco !== 'number' || preco < 0) {
      return res.status(400).json({ mensagem: 'Preço deve ser um número positivo.' });
    }

    produtos[index] = { id: Number(id), nome, preco };
    res.json(produtos[index]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro interno ao atualizar produto.' });
  }
};

exports.removerProduto = (req, res) => {
  try {
    const { id } = req.params;
    const existe = produtos.some(p => p.id == id);

    if (!existe) {
      return res.status(404).json({ mensagem: 'Produto não encontrado.' });
    }

    produtos = produtos.filter(p => p.id != id);
    res.json({ mensagem: 'Produto removido com sucesso.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro interno ao remover produto.' });
  }
};
