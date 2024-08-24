const mariadb = require('mariadb')

const config = {
    host: '',
    user: '',
    password: '',
    database: '',
    connectionLimit: 5,
    acquireTimeout: 300
}

class DBConnector {
    dbconnector = mariadb.createPool(config)

    async query(param) {
        var conn = await this.dbconnector.getConnection();
        var ret = null;
        conn.query(param)
        .then(data => {
            ret = data;
            console.log(data);
            conn.end()
        })
        .catch(err => {
            console.log(err)
            conn.end()
        })
        return ret;
    }
}

module.exports = new DBConnector();