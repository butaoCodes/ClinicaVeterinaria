// ========================================
// CONEXÃO COM BANCO DE DADOS MySQL
// ========================================
// Este arquivo configura e exporta a conexão com o banco de dados MySQL

// Importa o módulo mysql2 para gerenciar a conexão com o banco
const mysql = require('mysql2')

// Cria a conexão com o banco de dados especificando:
// - host: endereço do servidor MySQL (localhost = máquina local)
// - user: nome do usuário do MySQL
// - password: senha do usuário do MySQL
// - database: nome do banco de dados a ser usado
const connection = mysql.createConnection({
    host:'localhost',      // Servidor MySQL local
    user:'root',           // Usuário padrão do MySQL
    password:'root',       // Senha do usuário
    database:'banco'       // Nome do banco de dados
    
});

// Tenta conectar ao banco de dados e verifica se houve erro
connection.connect((erro) => {
    // Se houver erro na conexão, exibe mensagem e retorna
    if(erro){
        console.log('Erro ao conectar: ', erro)
        return;
    }
    // Se conectar com sucesso, exibe mensagem de confirmação
    console.log("Banco conectado!")
});

// Exporta a conexão para ser usada em outros arquivos do projeto
module.exports = connection;