const express = require("express");
const bodyParser = require("body-parser")
const mongoDb = require("./utils/mongoDb")
mongoDb.getConnection()
const PORT = 3000;
const login = require("./router/login")
const app = express();
// translate api
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/',login)
app.listen(PORT, function () {
    console.log(`Listening on port ${PORT}`)
    console.log(`http://localhost:${PORT}`);
});
