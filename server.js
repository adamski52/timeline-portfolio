require('dotenv').config();

var express = require('express'),
    path = require('path'),
    proxy = require('express-http-proxy'),
    app = express(),
    fs = require('fs');

function handleMock(res, req) {

}

app.listen(3000);

if(process.env.API_USE_MOCK) {
    app.use('/api', function(req, res) {
        var url = req.originalUrl,
            pieces = url.split("/");

        switch(pieces[pieces.length-1]) {
            case "adamski52":
                url = "mocks/user.json";
                break;
            case "repos":
                url = "mocks/repos.json";
                break;
            case "languages":
                url = "mocks/languages.json";
                break;
            case "thumbnail.png":
                url = "mocks/img/thumbnail.png";
                break;
            case "events":
                url = "mocks/events.json";
                break;
            default:
                url = "";
                break;
        }

        fs.readFile(url, 'utf8', function(err, data) {
            if (err) {
                res.status(500).send("Error with " + url);
                return;
            }

            res.send(data);
        });
    });
    console.log("Express started at :3000 / using mock");
}
else {
    app.use('/api', proxy('api.github.com', {
        https: true,
        decorateRequest: function (proxyReq, originalReq) {
            proxyReq.headers["authorization"] = "token " + process.env.API_KEY;
            return proxyReq;
        }
    }));
    console.log("Express started at :3000 / " + process.env.API_KEY);
}

app.use(express.static(path.join(__dirname, 'mocks')));

