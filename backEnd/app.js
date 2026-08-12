//Importa o framework express
const express = require('express');
const server = express();
const path = require('path');
const connection = require('./db')
const cors = require('cors')
server.use(express.json());
server.use(cors());

// Log simples de todas as requisições (debug)
server.use((req, res, next) => {
    console.log('REQ', req.method, req.path);
    return next();
});

// Serve arquivos estáticos do front-end
server.use(express.static(path.join(__dirname, '..', 'frontEnd')));
// Também permite servir com o prefixo /frontEnd (para links absolutos antigos)
server.use('/frontEnd', express.static(path.join(__dirname, '..', 'frontEnd')));
console.log('Static path:', path.join(__dirname, '..', 'frontEnd'));

// Endpoint de debug para enviar um arquivo específico e confirmar acessibilidade
server.get('/debug-login', (req, res) => {
    return res.sendFile(path.join(__dirname, '..', 'frontEnd', 'deslogado', 'login.html'));
});

server.get('/clientes', (req, res) => {
    const sql = 'select * from clientes';

    connection.query(sql, (erro, resultados) => {
        if(erro){
            return res.status(500).json({erro: erro.message})
        }
        return res.json(resultados)
    })
})

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

server.post('/clientes', (req, res)=> {

    const nome = req.body.nome;

    const sql = 'INSERT INTO clientes (nome) VALUES (?)';

    connection.query(sql, [nome], (erro, resultado) => {
        if (erro) {
            console.log(erro);
            return res.status(500).json({ error: erro.message });
        }
    return res.json({ mensagem: 'Cliente cadastrado com sucesso', id: resultado.insertId, nome: nome});
    });
});

server.put('/clientes/:id', (req, res) => {

    const id = req.params.id;

    const nome = req.body.nome;

    const sql = 'UPDATE clientes SET nome = ? WHERE id = ?';
    connection.query(sql, [nome, id], (erro, resultado) => {
        if (erro) {
            console.error(erro);
            return res.status(500).json({ error: erro.message });
        }

    return res.json({ mensagem: 'Cliente atualizado com sucesso', id: id, nome: nome });
    });
});

server.delete('/clientes/:id', (req, res) => {

    const id = req.params.id;

    const sql = 'DELETE FROM clientes WHERE id = ?';
    connection.query(sql, [id], (erro) => {
        if (erro) {
            console.error(erro);
            return res.status(500).json({ error: erro.message });
        }

    return res.json({ mensagem: 'Cliente removido com sucesso', id: id });
    });
});

server.use((req, res, next) =>{
    console.log("resquisição chamada")
    return next();
})
    
function clienteExiste(req, res){
    if(req.body.nome){
        return res.status(400).json({erro: "Nome do cliente é obrigatório"})
    }
    return next();
};

function idClienteExiste(req, res){
    const cliente = clientes[req.params.id]
    if(req.body.nome){
        return res.status(400).json({erro: "o cliente não foi encontrado"})
    }
    return next();
};

server.get('/clientes', (req, res) => {
    return res.json(clientes);
});

server.get('/clientes/:id', (req, res) => {

    const {id} = req.params;        
    const sql = 'select * from clientes where id = ?'

    connection.query(sql, (erro, resultados) => {
        if(erro){
            return res.statusMessage(500).json({erro: erro.message})
        }
        return res.json(resultados[0])
    })
});

server.post('/clientes', clienteExiste, (req, res)=> {

    const nome = req.body.nome;

    clientes.push(nome);

    return res.json(clientes);    
});

server.put('/clientes/:id', (req, res) => {

    const id = req.params.id;

    const nome = req.body.nome;

    clientes[id] = nome;

    return res.json(clientes);

});

server.delete('/clientes/:id', (req, res) => {

    const id = req.params.id;

    clientes.splice(id, 1);

    return res.json(clientes);
});

server.listen(3023 , () => {
    console.log("Servidor rodando na porta 3023");
});