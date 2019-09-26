-- drop database chat;
-- CREATE DATABASE chat;

USE chat;


drop table if exists messages;
drop table if exists friends;
drop table if exists users;
drop table if exists rooms;

create table users (
  id int auto_increment primary key,
  username varchar(20) unique
);

create table rooms (
  id int auto_increment primary key,
  roomname varchar(20) unique
);

create table messages (
  id int auto_increment primary key,
  message varchar(280),
  user_id int not null,
  room_id int not null,
  created_at timestamp default current_timestamp,

  foreign key(user_id)
    references users (id),

  foreign key(room_id)
    references rooms (id)
);

create table friends (
  id int auto_increment primary key,
  friender_user_id int not null,
  friendee_user_id int not null,

  foreign key(friender_user_id)
    references users (id),

  foreign key(friendee_user_id)
    references users (id)
);



/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

