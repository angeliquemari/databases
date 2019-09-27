var models = require('../models');
var headers = require('../cors');

module.exports = {
  messages: {
    get: function (req, res) {
      models.messages.get()
        .then ((data) => {
          res.set(headers).status(200).send(data).end();
          // console.log(data);
        })
        .catch ((err) => {
          // console.log(err);
          res.set(headers).status(500).end();
        });
    },
    post: function (req, res) {
      models.messages.post(req.body);
      res.set(headers).status(200).end();
    }
  },

  users: {
    get: function (req, res) {
      models.users.get(req.body)
        .then ((data) => {
          res.set(headers).status(200).send(data).end();
        })
        .catch ((err) => {
          // console.log(err);
          res.set(headers).status(500).end();
        });
    },
    post: function (req, res) {
      models.users.post(req.body)
        .then(() => {
          res.set(headers).status(200).end();
        })
        .catch((err) => {
          // console.log(err);
          res.set(headers).status(200).end();
        });
    }
  }
};
