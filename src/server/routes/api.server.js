const os = require('os');

module.exports = (server) => {
    server.app.get("/api/server", (req, res) => {
        try {
            const networkInteraces = os.networkInterfaces();
            const serverIps = [];

            for (const interface in networkInteraces) {
                networkInteraces[interface].forEach((details) => {
                    if (details.family === 'IPv4' && !details.internal) {
                        serverIps.push(details.address);
                    }
                })
            }

            return res.json({
                host: `${process.env.SERVER_HOST}` || `${req.protocol}://${serverIps[1]}:4000`
            });
        } catch (error) {
            console.error(error);
            return res.json({ ok: false, error: { message: "Ha ocurrido un error." } });
        }
    });
}