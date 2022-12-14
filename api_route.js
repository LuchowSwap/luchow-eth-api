let express = require('express');
let router = express.Router();

let api_controller = require('./controllers/ApiController');

router.get('/summary', function (req, res, next) {
    api_controller.summary(req, res, next);
});
router.get('/tokens', function (req, res, next) {
    api_controller.tokens(req, res, next);
});
router.get('/tokens/:address', function (req, res, next) {
    api_controller.tokensFromAddress(req, res, next);
});
router.get('/pairs', function (req, res, next) {
    api_controller.pairs(req, res, next);
});

module.exports = router;