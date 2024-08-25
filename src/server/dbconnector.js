const mariadb = require('mariadb');

const config = {
    host: 'localhost',
    user: 'root',
    password: 'juegos2001',
    database: 'ladrillito',
    connectionLimit: 5,
    acquireTimeout: 300
}

class DBConnector {
    constructor () {
        this.dbconnector = mariadb.createPool(config);
    }

    async query(param) {
        try {
            const conn = await this.dbconnector.getConnection();
            const ret = await conn.query(param) 
            conn.end()
            return ret;
        } catch (error) {
            console.error(error);
        }
    }
}

module.exports = new DBConnector();