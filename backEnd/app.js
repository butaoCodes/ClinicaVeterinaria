const express = require('express');
const server = express();
const path = require('path');
const connection = require('./db');
const cors = require('cors');

server.use(express.json());
server.use(cors());

server.get('/clientes', (req, res) => {
    const sql = 'SELECT * FROM clientes';

    connection.query(sql, (erro, resultados) => {
        if (erro) {
            return res.status(500).json({ erro: erro.message });
        }
        return res.json(resultados);
    });
});

server.get('/clientes/buscar', (req, res) => {
    const nome = req.query.nome;

    if (!nome) {
        return res.status(400).json({ erro: 'O parâmetro nome é obrigatório' });
    }

    const sql = 'SELECT * FROM clientes WHERE nome LIKE ?';
    connection.query(sql, [`%${nome}%`], (erro, resultados) => {
        if (erro) {
            return res.status(500).json({ erro: erro.message });
        }
        return res.json(resultados);
    });
});

server.get('/clientes/:id', (req, res) => {
    const id = req.params.id;

    const sql = 'SELECT * FROM clientes WHERE id = ?';
    connection.query(sql, [id], (erro, resultado) => {
        if (erro) {
            return res.status(500).json({ error: erro.message });
        }
        return res.json(resultado[0]);
    });
});

server.post('/clientes', (req, res) => {
    const nome = req.body.nome;

    if (!nome) {
        return res.status(400).json({ erro: 'Nome do cliente é obrigatório' });
    }

    const sql = 'INSERT INTO clientes (nome) VALUES (?)';
    connection.query(sql, [nome], (erro, resultado) => {
        if (erro) {
            return res.status(500).json({ error: erro.message });
        }
        return res.json({ mensagem: 'Cliente cadastrado com sucesso', id: resultado.insertId, nome });
    });
});

server.put('/clientes/:id', (req, res) => {
    const id = req.params.id;
    const nome = req.body.nome;

    if (!nome) {
        return res.status(400).json({ erro: 'Nome do cliente é obrigatório' });
    }

    const sql = 'UPDATE clientes SET nome = ? WHERE id = ?';
    connection.query(sql, [nome, id], (erro) => {
        if (erro) {
            return res.status(500).json({ error: erro.message });
        }
        return res.json({ mensagem: 'Cliente atualizado com sucesso', id, nome });
    });
});

server.delete('/clientes/:id', (req, res) => {
    const id = req.params.id;

    const sql = 'DELETE FROM clientes WHERE id = ?';
    connection.query(sql, [id], (erro) => {
        if (erro) {
            return res.status(500).json({ error: erro.message });
        }
        return res.json({ mensagem: 'Cliente removido com sucesso', id });
    });
});

server.listen(3023, () => {
    console.log('Servidor rodando na porta 3023');
});