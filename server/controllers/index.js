var models = require('../models');
var headers = require('../cors');

module.exports = {
  messages: {
    get: function (req, res) {
      return models.messages.get()
        .then ((data) => {
          res.status(200).send(data).end();
          // console.log(data);
        })
        .catch ((err) => {
          console.log(err);
        });
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      // console.log(req.body);
      models.messages.post(req.body);
      res.end();
      // models.messages.post(req);
      // return models.messages.post(req)
      //   .then (() => {
      //     res.status(200).end();
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      //create a promise
      // promise instantiated with req
      // models.get()
      // with a then that gives res.statuscode and data
    },
    post: function (req, res) {}
  }
};

