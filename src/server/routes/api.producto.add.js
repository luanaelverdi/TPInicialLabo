const Postgres=require('../Postgres.js');

module.exports = (server) => {
    server.app.post('/api/producto/add', async (req, res) => {        
        try {
            const producto = req.body.producto;
    
            if (producto.codigo.length <= 0) return res.json({ ok: false, error: { message: "Debes ingresar un codigo." } });
            if (producto.nombre.length <= 0) return res.json({ ok: false, error: { message: "Debes ingresar un nombre." } });
            if (producto.descripcion.length <= 0) return res.json({ ok: false, error: { message: "Debes ingresar una descripcion." } });
            if (producto.stock_minimo < 0) return res.json({ ok: false, error: { message: "Debes ingresar un stock minimo valido." } });
            if (producto.id_categoria < 0) return res.json({ ok: false, error: { message: "Debes ingresar una categoria valida." } });
            if (producto.depositos.length <= 0) return res.json({ ok: false, error: { message: "Debes ingresar un deposito." } });
            if (producto.stockActual <= 0) return res.json({ ok: false, error: { message: "El stock actual debe ser mayor a 0." } });
            if (producto.stockActual < producto.stock_minimo) return res.json({ ok: false, error: { message: "El stock actual no puede ser menor que el stock minimo." } });

            await Postgres.query().begin(async sql => {
                await sql`SET TRANSACTION ISOLATION LEVEL READ COMMITTED;`;
                await sql`
                    INSERT INTO 
                        producto (codigo, nombre_producto, desc_producto, stock_minimo, id_categoria) 
                    VALUES (
                        ${producto.codigo},
                        ${producto.nombre},
                        ${producto.descripcion},
                        ${producto.stock_minimo},
                        ${producto.id_categoria}
                    );    
                `;
                const qProducto = await sql`
                    SELECT
                        max(id_producto)
                    FROM
                        producto    
                `;
                if (!qProducto[0]) throw new Error("Ha ocurrido un error.");
                for (const id of producto.depositos) {
                    await sql`
                        INSERT INTO 
                            almacenamiento (id_producto, id_deposito,stock) 
                        VALUES (
                            ${qProducto[0].max},
                            ${id},
                            ${producto.stockActual}
                        );
                    `;
                }       
            });

            return res.json({ ok: true });
        } catch (error) {
            console.error(error);
            return res.json({ ok: false, error: { message: error.message } });
        }
    });
}