const path = require('path')
const express = require('express')
const app = express();

app.set("port",4000)
app.use(express.json())
app.get("/",(req,res) => {
    res.sendFile(path.join(__dirname + "/../src/public/index.html"))
})
app.get("/api/productos",(req,res) => {
    res.json({id:1,name:"prueba"})
})
app.listen(app.get("port"),() => {
    console.log("Server listening..")
})

//DBConnector = require('./dbconnector.js');

//DBConnector.query("SELECT * FROM productos")

