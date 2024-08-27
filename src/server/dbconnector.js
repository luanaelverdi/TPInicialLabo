const mariadb = require('mariadb');

class DBConnector {
    constructor () {
        this.dbconnector = mariadb.createPool({
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            connectionLimit: 5,
            acquireTimeout: 300
        });
    }

    async query(param) {
        try {
            const conn = await this.dbconnector.getConnection();
            const ret = await conn.query(param);
            conn.end();
            return ret;
        } catch (error) {
            console.error(error);
        }
    }
}

module.exports = new DBConnector();