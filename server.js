require('dotenv').config()
var express = require('express');
var path = require('path');
var proxy = require('express-http-proxy');
var app = express();

app.listen(3000);

app.use('/api', proxy('api.github.com', {
    https: true,
    decorateRequest: function(proxyReq, originalReq) {
        proxyReq.headers["authorization"] = "token " + process.env.API_KEY;
        return proxyReq;
    }
}));

app.use(express.static(path.join(__dirname, 'mocks')));

console.log("Express started at :3000 / " + process.env.API_KEY);
