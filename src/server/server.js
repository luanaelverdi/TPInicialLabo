const path = require('path');
const express = require('express');
const fs = require("fs");
const Postgres=require('./Postgres');

module.exports = class Server {
    constructor () {
        this.app = express();
        this.users = [];

        this.app.set("port", 4000);
        this.app.use('/public', express.static(path.join(__dirname + '/../public/')));
        this.app.use(express.json());
        this.routes();
        Postgres.init();
        this.app.listen(4000, "0.0.0.0", () => {
            console.log("✅ | Server listening...");
        });
    }

    routes () {
        try {
            const files = fs.readdirSync(path.join(__dirname + '/routes/'));
            
            for (const file of files) {
                require(path.join(__dirname + '/routes/' + file))(this);
                console.log('✅ | Loaded:', file);
            }

            this.app.use('/*', (req, res) => {
                res.sendFile(path.join(__dirname + '/../public/index.html'));
            });
        } catch (error) {
            console.error(error)
        }
    }
}