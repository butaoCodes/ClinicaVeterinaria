//Importa o framework express
const express = require('express');
const server = express();
const connection = require('./db')
const cors = require('cors')
server.use(express.json());
server.use(cors());
//Middleware que permite o servidor entender requisições com JSON no corpo (req.body)


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

    const id = req.params.id; // Desestrutura o parâmetro "id" da URL

    const sql = 'SELECT * FROM clientes WHERE id = ?'; // Consulta SQL para selecionar um curso específico

    connection.query(sql, [id], (erro, resultado) => {
        if (erro) {
            return res.status(500).json({ error: erro.message });
        }
        return res.json(resultado[0]); // Retorna o primeiro resultado encontrado
    });
});

server.post('/clientes', (req, res)=> {

    // Desestrutura a propriedade "name" enviada no corpo da requisição
    const nome = req.body.nome;

    const sql = 'INSERT INTO clientes (nome) VALUES (?)'; // Consulta SQL para inserir um novo curso

    connection.query(sql, [nome], (erro, resultado) => {
        if (erro) {
            console.log(erro);
            return res.status(500).json({ error: erro.message });
        }
    return res.json({ mensagem: 'Curso cadastrado com sucesso', id: resultado.insertId, nome: nome});
    });
});

//Método HTTP: PUT
//ATUALIZAR UM CURSO
//localhost:3000/clientes/0
server.put('/clientes/:id', (req, res) => {

    // Obtém o índice do curso a ser atualizado pela URL
    const id = req.params.id;

    // Obtém o novo nome do curso enviado no corpo da requisição
    const nome = req.body.nome;

    const sql = 'UPDATE clientes SET nome = ? WHERE id = ?'; // Consulta SQL para atualizar o curso
    connection.query(sql, [nome, id], (erro, resultado) => {
        if (erro) {
            console.error(erro);
            return res.status(500).json({ error: erro.message });
        }

    // Retorna a lista de clientes atualizada
    return res.json({ mensagem: 'Curso atualizado com sucesso', id: id, nome: nome });
    });
});

//Método HTTP: DELETE
//DELETAR UM CURSO
//localhost:3000/clientes/1
server.delete('/clientes/:id', (req, res) => {

    // Obtém o índice do curso a ser removido
    const id = req.params.id;

    const sql = 'DELETE FROM clientes WHERE id = ?'; // Consulta SQL para deletar o curso

    connection.query(sql, [id], (erro) => {
        if (erro) {
            console.error(erro);
            return res.status(500).json({ error: erro.message });
        }

    // Retorna a lista de clientes após a exclusão
    return res.json({ mensagem: 'Curso removido com sucesso', id: id });
    });
});

server.use((req, res, next) =>{
    console.log("resquisição chamada")
    return next();
})
    
function cursoExiste(req, res){
    if(req.body.nome){
        return res.status(400).json({erro: "Nome do curso é obrigatório"})
    }
    return next();
};

function idCursoExiste(req, res){
    const curso = clientes[req.params.id]
    if(req.body.nome){
        return res.status(400).json({erro: "o curso não foi encontrado"})
    }
    return next();
};
//===================================
//Método HTTP: GET
//LISTAR TODOS OS clientes
//localhost:3000/clientes
server.get('/clientes', (req, res) => {
    // Retorna a lista completa de clientes em formato JSON
    return res.json(clientes);
});

//Método HTTP: GET
//LISTAR UM UNICO CURSO
//localhost:3000/curso/2
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

//Método HTTP: POST
//CRIAR UM NOVO CURSO
//localhost:3000/clientes
//{ "name": "Curso de Python" }
server.post('/clientes', cursoExiste, (req, res)=> {

    // Desestrutura a propriedade "name" enviada no corpo da requisição
    const nome = req.body.nome;

    // Adiciona o novo curso ao array de clientes
    clientes.push(nome);

    // Retorna a lista atualizada de clientes
    return res.json(clientes);    
});

//Método HTTP: PUT
//ATUALIZAR UM CURSO
//localhost:3000/clientes/0
server.put('/clientes/:id', (req, res) => {

    // Obtém o índice do curso a ser atualizado pela URL
    const id = req.params.id;

    // Obtém o novo nome do curso enviado no corpo da requisição
    const nome = req.body.nome;

    // Atualiza o curso no índice informado
    clientes[id] = nome;

    // Retorna a lista de clientes atualizadas
    return res.json(clientes);

});

//Método HTTP: DELETE
//DELETAR UM CURSO
//localhost:3000/clientes/1
server.delete('/clientes/:id', (req, res) => {

    // Obtém o índice do curso a ser removido
    const id = req.params.id;

    // Remove 1 elemento do array a partir do índice informado
    clientes.splice(id, 1);

    // Retorna a lista de clientes após a exclusão
    return res.json(clientes);
});



//O metodo listen() faz o servidor começar a escutar
// requisiçoes em uma determinada porta.
server.listen(3023 , () => {
    console.log("Servidor rodando na porta 3023");
});