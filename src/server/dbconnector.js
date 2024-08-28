const mariadb = require('mariadb');

class DBConnector {
    constructor () {
        this.dbconnector = mariadb.createPool({
            host: 'intellpract2.ddns.net',
            port: 9001,
            user: 'tplabo',
            password: 'juegos2001',
            database: 'ladrillito',
            connectionLimit: 5,
            acquireTimeout: 300
        });
    }

    async query (param) {
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