var express = require('express');
var app = express();

app.use(express.static('server'));

app.listen(3000);

console.log("Express started at :3000");
console.log("... hang on.  not ready yet...");
