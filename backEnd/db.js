const mysql = require('mysql2')

// Use env vars so the app can connect to local MySQL or a Docker service named 'db'
const connection = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'root',
    database: process.env.DB_NAME || 'banco'
});

connection.connect((erro) => {
    if(erro){
        console.log('Erro ao conectar: ', erro)
        return;
    }
    console.log("Banco conectado!")
});

module.exports = connection;