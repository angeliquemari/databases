var Promise = require('bluebird');
var db = require('../db');

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
    post: function (req) {
      // console.log(req.body)
      var queryString = `
      insert into messages(text, user_id, room_id) values('testing', 1, 1)
      `;
      var queryArgs = [];
      db.dbConnection.query(queryString, queryArgs, function (err, results) {
        if (err) {
          console.log('error');
        } else {
          console.log('success');
        }
      });

    } // a function which can be used to insert a message into the database
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

