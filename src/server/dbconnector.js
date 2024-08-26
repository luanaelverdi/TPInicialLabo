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
        CreateDB(this.dbconnector);
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

async function CreateDB (dbconnector) {
    try {
        const conn = await dbconnector.getConnection();
        
        await conn.query(`
            CREATE DATABASE IF NOT EXISTS ladrillito;  
        `);

        await conn.query(`
            DROP TABLE IF EXISTS ordencompra; 
        `);

        await conn.query(`
            DROP TABLE IF EXISTS productos;
        `);

        await conn.query(`
            CREATE TABLE productos (
                id_producto INT(11) NOT NULL AUTO_INCREMENT,
                nombre_producto TEXT NOT NULL COLLATE 'latin1_swedish_ci',
                desc_producto TEXT NULL DEFAULT NULL COLLATE 'latin1_swedish_ci',
                stock INT(10) UNSIGNED NOT NULL,
                stock_minimo INT(11) NOT NULL,
                PRIMARY KEY (id_producto) USING BTREE
            )
            COLLATE='latin1_swedish_ci'
            ENGINE=InnoDB
            AUTO_INCREMENT=3; 
        `);

        await conn.query(`
            CREATE TABLE ordencompra (
                id_ordenCompra INT(11) NOT NULL AUTO_INCREMENT,
                id_producto INT(11) NOT NULL,
                cantidad INT(11) NULL DEFAULT NULL,
                fecha_emision DATE NULL DEFAULT NULL,
                PRIMARY KEY (id_ordenCompra) USING BTREE,
                INDEX id_producto_fk (id_producto) USING BTREE,
                CONSTRAINT id_producto_fk FOREIGN KEY (id_producto) REFERENCES productos (id_producto) ON UPDATE NO ACTION ON DELETE NO ACTION
            )
            COLLATE='latin1_swedish_ci'
            ENGINE=InnoDB
            AUTO_INCREMENT=3;
        `);

        await conn.query(`
            INSERT INTO productos (nombre_producto, desc_producto, stock, stock_minimo)
            VALUES ('Producto de Prueba 1', 'Descripcion de Prueba 1', 20, 5);    
        `);

        conn.end();
    } catch (error) {
        console.error(error);
    }     
}

module.exports = new DBConnector();