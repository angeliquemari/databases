var Promise = require('bluebird');
var db = Promise.promisifyAll(require('../db').dbConnection);

module.exports = {
  messages: {
    get: function () {
      var getMessages = `
        select
          m.text,
          u.username,
          r.roomname
        from messages as m
          join users as u
            on m.user_id = u.id
          join rooms as r
            on m.room_id = r.id`;
      return db.queryAsync(getMessages);
    },
    post: function (message) {
      return module.exports.users.getUserId(message.username)
        .then((user) => {
          if (user.length > 0) {
            return Promise.resolve(user[0].id);
          } else {
            return Promise.reject(message.username);
          }
        })
        .catch((username) => {
          return module.exports.users.post(username);
        }) // ideally, check for and maybe add new room after this
        .then((user) => {
          var userId = user.insertId || user; // insertId for newly created user
          var insertMessage = `
            insert into messages(text, user_id, room_id)
              values('${message.text}', ${userId}, 1)`; // hard-code roomId for now
          return db.queryAsync(insertMessage);
        });
    }
  },

  users: {
    get: function () {
      var getUsers = `
        select
          id as user_id,
          username
        from users`;
      return db.queryAsync(getUsers);
    },
    getUserId: function (username) {
      var getUserId = `
        select
          id
        from users
        where username = '${username}'`;
      return db.queryAsync(getUserId);
    },
    post: function (username) {
      var insertUser = `
        insert into users(username)
          values('${username}')`;
      return db.queryAsync(insertUser);
    }
  }
};
