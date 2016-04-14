var express = require('express');
var path = require('path');

var port = 3000;
var app = express();
var publicDir = __dirname + "/public"

app.use("/public", express.static(path.join(__dirname, "public")));

app.get("/", function(req, res) {
    res.sendFile(path.join(publicDir + "/index.html"));
});

app.listen(port, function() {
    console.log("Server Running on port " + port);
})
