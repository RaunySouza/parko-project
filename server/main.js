var express = require('express'),
    path = require('path'),
    load = require('express-load'),
    bodyParser = require('body-parser');

var app = express();

load('controllers')
    .into(app);

var publicDir = __dirname + "/public"

app.set('port', (process.env.PORT || 3000));

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", function(req, res) {
    res.sendFile("index.html");
});

app.listen(app.get('port'), function() {
    console.log("Server Running on port " + app.get('port'));
});
