var Promise = require('bluebird');
var db = require('../db');
var query = Promise.promisify(db.dbConnection.query);

var queryForId = function(message, type) {
  let table;
  let name;
  if (type === 'user') {
    table = 'users';
    name = 'username';
  }
  if (type === 'room') {
    table = 'rooms';
    name = 'roomname';
  }
  let query = `
    select id
    from ${table}
    where ${name} = '${message[name]}'
    `;
  return query(query, []);
};

var insertNewRecord = function(message, type) {
  let table;
  let name;
  if (type === 'user') {
    table = 'users';
  }
  if (type === 'room') {
    table = 'rooms';
    name = 'roomname';
  }
  let query = `
    insert into ${table}(${name})
      values('${message[name]}')`;
  return query(query, []);
};

module.exports = {
  messages: {
    get: function () {
      return new Promise((res, rej) => {
        var queryString = `
          select
            m.text,
            u.username,
            r.roomname
          from messages as m
            join users as u
              on m.user_id = u.id
            join rooms as r
              on m.room_id = r.id
          `;
        var queryArgs = [];
        db.dbConnection.query(queryString, queryArgs, function (err, results) {
          if (err) {
            rej (err);
          } else {
            res (results);
          }
        });
      });
    }, // a function which produces all the messages
    post: function (message) {
      return new Promise((res, rej) => {
        queryForId(message, 'user')
          .then((userId) => {
            if (userId.length > 0) {
              return resolve(message, userId);
            }
            return reject(message);
          });
      })
        .catch((message) => {
          insertNewRecord(message, 'user')
            .then(
              queryForId(message, 'user')
            );
        })
        .then((message, userId) => {
          userId = userId[0].id;
          queryForId(message, 'room')
            .then((roomId) => {
              if (roomId.length > 0) {
                return resolve(message, roomId);
              }
              return reject(message);
            });
        })
        .catch((message) => {
          insertNewRecord(message, 'room')
            .then(
              queryForId(message, 'room')
            );
        })
        .then((message, roomId) => {
          roomId = roomId[0].id;
          let query = `
            insert into messages(text, user_id, room_id)
              values('${message.text}', ${userId}, ${roomId})
            `;
          query(query, []);
        });
    }
  },

  users: {
    // Ditto as above.
    get: function () {
      // promise instantiated
      // get all usernames from db
      // when promise resolves returns  data
    },
    post: function () {}
  }
};


