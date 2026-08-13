// ========================================
// SERVIDOR EXPRESS - CLÍNICA VETERINÁRIA
// ========================================
// Este arquivo configura o servidor Express com as rotas CRUD para gerenciar clientes

// Importa o módulo Express para criar o servidor web
const express = require('express');
// Cria a instância do servidor
const server = express();
// Importa o módulo path para trabalhar com caminhos de arquivos
const path = require('path');
// Importa a conexão com o banco de dados MySQL
const connection = require('./db');
// Importa CORS para permitir requisições de diferentes origens
const cors = require('cors');

// Middleware que permite enviar e receber dados em formato JSON
server.use(express.json());
// Middleware que habilita CORS para permitir requisições de domínios diferentes
server.use(cors());


// ========================================
// ROTA GET - LISTAR TODOS OS CLIENTES
// ========================================
// Esta rota retorna uma lista de todos os clientes cadastrados no banco de dados
server.get('/clientes', (req, res) => {
    // SQL para selecionar todos os registros da tabela clientes
    const sql = 'SELECT * FROM clientes';

    // Executa a query no banco de dados
    connection.query(sql, (erro, resultados) => {
        // Se houver erro na execução, retorna status 500 com a mensagem de erro
        if (erro) {
            return res.status(500).json({ erro: erro.message });
        }
        // Se tudo correr bem, retorna os resultados em formato JSON
        return res.json(resultados);
    });
});


// ========================================
// ROTA GET - BUSCAR CLIENTES POR NOME
// ========================================
// Esta rota busca clientes pelo nome usando busca parcial (LIKE)
server.get('/clientes/buscar', (req, res) => {
    // Obtém o parâmetro 'nome' da query string (?nome=valor)
    const nome = req.query.nome;

    // Valida se o parâmetro nome foi fornecido
    if (!nome) {
        return res.status(400).json({ erro: 'O parâmetro nome é obrigatório' });
    }

    // SQL com LIKE para busca parcial do nome (% representa qualquer caractere)
    const sql = 'SELECT * FROM clientes WHERE nome LIKE ?';
    connection.query(sql, [`%${nome}%`], (erro, resultados) => {
        if (erro) {
            return res.status(500).json({ erro: erro.message });
        }
        return res.json(resultados);
    });
});


// ========================================
// ROTA GET - BUSCAR CLIENTE POR ID
// ========================================
// Esta rota busca um cliente específico através do seu ID
server.get('/clientes/:id', (req, res) => {
    // Obtém o ID do cliente da URL (/clientes/1)
    const id = req.params.id;

    // SQL para selecionar um cliente específico pelo ID
    const sql = 'SELECT * FROM clientes WHERE id = ?';
    connection.query(sql, [id], (erro, resultado) => {
        if (erro) {
            return res.status(500).json({ error: erro.message });
        }
        // Retorna apenas o primeiro resultado (resultado[0])
        return res.json(resultado[0]);
    });
});


// ========================================
// ROTA POST - CADASTRAR NOVO CLIENTE
// ========================================
// Esta rota insere um novo cliente no banco de dados
server.post('/clientes', (req, res) => {
    // Obtém o nome do cliente do corpo da requisição (body)
    const nome = req.body.nome;

    // Valida se o nome foi fornecido
    if (!nome) {
        return res.status(400).json({ erro: 'Nome do cliente é obrigatório' });
    }

    // SQL para inserir um novo registro na tabela clientes
    const sql = 'INSERT INTO clientes (nome) VALUES (?)'
    connection.query(sql, [nome], (erro, resultado) => {
        if (erro) {
            return res.status(500).json({ error: erro.message });
        }
        // Retorna a mensagem de sucesso com o ID do novo cliente
        return res.json({ mensagem: 'Cliente cadastrado com sucesso', id: resultado.insertId, nome });
    });
});


// ========================================
// ROTA PUT - ATUALIZAR DADOS DO CLIENTE
// ========================================
// Esta rota atualiza o nome de um cliente existente
server.put('/clientes/:id', (req, res) => {
    // Obtém o ID do cliente da URL
    const id = req.params.id;
    // Obtém o novo nome do corpo da requisição
    const nome = req.body.nome;

    // Valida se o novo nome foi fornecido
    if (!nome) {
        return res.status(400).json({ erro: 'Nome do cliente é obrigatório' });
    }

    // SQL para atualizar o nome do cliente onde o ID corresponde
    const sql = 'UPDATE clientes SET nome = ? WHERE id = ?';
    connection.query(sql, [nome, id], (erro) => {
        if (erro) {
            return res.status(500).json({ error: erro.message });
        }
        // Retorna mensagem de sucesso com os dados atualizados
        return res.json({ mensagem: 'Cliente atualizado com sucesso', id, nome });
    });
});


// ========================================
// ROTA DELETE - REMOVER CLIENTE
// ========================================
// Esta rota deleta um cliente do banco de dados
server.delete('/clientes/:id', (req, res) => {
    // Obtém o ID do cliente da URL
    const id = req.params.id;

    // SQL para deletar o cliente onde o ID corresponde
    const sql = 'DELETE FROM clientes WHERE id = ?';
    connection.query(sql, [id], (erro) => {
        if (erro) {
            return res.status(500).json({ error: erro.message });
        }
        // Retorna mensagem de sucesso com o ID do cliente deletado
        return res.json({ mensagem: 'Cliente removido com sucesso', id });
    });
});

// ========================================
// INICIAR O SERVIDOR
// ========================================
// Inicia o servidor na porta 3023 e exibe uma mensagem no console
server.listen(3023, () => {
    console.log('Servidor rodando na porta 3023');
});