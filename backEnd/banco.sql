create database banco;
use banco;

create table clientes(
    id int auto_increment primary key,
    nome varchar(100)not null
);

insert into clientes(nome)
values('jose'),
      ('bimbo'),
      ('oreia seca');