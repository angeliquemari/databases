var models = require('../models');

module.exports = {
  messages: {
    get: function (req, res) {}, // a function which handles a get request for all messages
    post: function (req, res) {} // a function which handles posting a message to the database
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

