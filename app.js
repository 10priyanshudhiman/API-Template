const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = (module.exports = express());

require("./config/globalConstant");
const configDB = require("./config/db");
// configuration ===============================================================
mongoose.Promise = global.Promise;

//let options = {useNewUrlParser: true, useFindAndModify: false};

mongoose.mainConnection =  mongoose.createConnection(configDB.mongoMainUrl);

//------------------------------------------- MAIN DB CONNECTION EVENTS-----------------------------------------------//
// When successfully connected
mongoose.mainConnection.on("connected", async function () {
    console.log("INFO ::: Connected to main MongoDB ");
    mongoose.set("debug", true);
});

// If the connection throws an error
mongoose.mainConnection.on("error", function (err) {
    console.error("ERROR ::: Mongoose main connection error: " + JSON.stringify(err));
});

// When the connection is disconnected
mongoose.mainConnection.on("disconnected", function () {
    console.log("INFO ::: Mongoose main connection disconnected");
});


app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: false }));

app.listen(PORT,async function (){
    console.log(`INFO ::: Server is Running on ${PORT}`)
})

require("./routes")(app);