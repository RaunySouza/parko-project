#!/usr/bin/env node

var express = require('express');
var path = require('path');

var app = express();
var publicDir = __dirname + "/public"

app.set('port', (process.env.PORT || 3000));

app.use("/public", express.static(path.join(__dirname, "public")));

app.get("/", function(req, res) {
    res.sendFile(path.join(publicDir + "/index.html"));
});

app.listen(app.get('port'), function() {
    console.log("Server Running on port " + app.get('port'));
})
