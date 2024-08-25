const path = require('path');

module.exports = (server) => {
    server.app.get("/api/server", (_, res) => {
        const data = require(path.join(__dirname + "/../config.json"));
        res.json(data);
    });
}