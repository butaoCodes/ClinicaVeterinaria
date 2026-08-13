-- ========================================
-- BANCO DE DADOS - CLÍNICA VETERINÁRIA
-- ========================================
-- Este arquivo SQL cria a estrutura do banco de dados e insere dados iniciais

-- Cria um novo banco de dados chamado 'banco'
CREATE DATABASE banco;

-- Seleciona o banco 'banco' para as operações seguintes
USE banco;

-- ========================================
-- TABELA CLIENTES
-- ========================================
-- Esta tabela armazena os dados dos clientes da clínica veterinária
CREATE TABLE clientes(
    -- ID: identificador único do cliente (chave primária, auto incrementado)
    id INT AUTO_INCREMENT PRIMARY KEY,
    -- NOME: nome completo do cliente (máximo 100 caracteres, obrigatório)
    nome VARCHAR(100) NOT NULL
);

-- ========================================
-- INSERIR DADOS INICIAIS
-- ========================================
-- Insere três clientes de exemplo no banco de dados
INSERT INTO clientes(nome)
VALUES('jose'),       -- Cliente 1: Jose
      ('bimbo'),      -- Cliente 2: Bimbo
      ('oreia seca'); -- Cliente 3: Oreia seca