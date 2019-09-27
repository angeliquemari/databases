var controller = require('./controllers');
var router = require('express').Router();
var headers = require('./cors');
//Connect controller methods to their corresponding routes

router.options('/messages', function(req, res) {
  res.set(headers).status(200).end();
});
router.get('/messages', controller.messages.get);
router.post('/messages', controller.messages.post);

router.options('/users', function(req, res) {
  res.set(headers).status(200).end();
});
router.get('/users', controller.users.get);
router.post('/users', controller.users.post);


module.exports = router;

