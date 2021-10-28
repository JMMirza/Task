const express = require("express");
const sessions = require('express-session');
const bodyParser = require("body-parser")
const mongoDb = require("./utils/mongoDb")
mongoDb.getConnection()
const PORT = 3000;
const login = require("./router/login")
const app = express();
// translate api
const oneDay = 1000 * 60 * 60 * 24;

//session middleware
app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false
}));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/',login)
app.listen(PORT, function () {
    console.log(`Listening on port ${PORT}`)
    console.log(`http://localhost:${PORT}`);
});
