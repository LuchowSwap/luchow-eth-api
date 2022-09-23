let express = require('express');
let cors = require('cors');

let app = express();
let api_route = require('./api_route');

app.use(cors());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-type,Accept');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
app.use('/api/v2', api_route);
app.get('*', function (req, res, next) {
    res.send("All Error");
});
app.get('/404', function (req, res, next) {
    res.send("404 Error");
});

const api_controller = require('./controllers/ApiController');
const port = 1901;
app.listen(port, async function() {
    // await api_controller.summary();
    console.log( '[' + new Date().toLocaleString() + '] ' +'Server listening http://127.0.0.1:' + port);
});