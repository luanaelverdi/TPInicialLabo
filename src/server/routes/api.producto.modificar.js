const Postgres=require('../Postgres.js');

module.exports = (server) => {
    server.app.post('/api/producto/modificar', async (req, res) => {        
        try {
            const producto = req.body.producto;
            if (producto.codigo.length <= 0) return res.json({ ok: false, error: { message: "Debes ingresar un codigo." } });
            if (producto.nombre.length <= 0) return res.json({ ok: false, error: { message: "Debes ingresar un nombre." } });
            if (producto.descripcion.length <= 0) return res.json({ ok: false, error: { message: "Debes ingresar una descripcion." } });
            if (producto.stock_minimo < 0) return res.json({ ok: false, error: { message: "Debes ingresar un stock minimo valido." } });
            if (producto.id_categoria < 0) return res.json({ ok: false, error: { message: "Debes ingresar una categoria valida." } });
            if (producto.depositos.length <= 0) return res.json({ ok: false, error: { message: "Debes seleccionar un deposito." } });

            await Postgres.query().begin(async sql => {
                await sql`SET TRANSACTION ISOLATION LEVEL READ COMMITTED;`;
                await sql`
                    UPDATE
                        producto
                    SET
                        codigo          =  ${producto.codigo},
                        nombre_producto =  ${producto.nombre},
                        desc_producto   =  ${producto.descripcion},
                        stock_minimo    =  ${producto.stock_minimo},
                        id_categoria    =  ${producto.id_categoria}
                    WHERE
                        id_producto = ${producto.id_producto};
                `;

                for (const id of producto.depositos) {
                    const qStockDeposito = await sql`
                        SELECT 
                            stock
                        FROM 
                            almacenamiento
                        WHERE
                            id_producto = ${producto.id_producto} and id_deposito = ${id};
                    `;
                   
                   if (qStockDeposito[0] && qStockDeposito[0].stock > 0) return res.json({ ok: false, error: { message: "El producto en deposito seleccionados tiene stock. No se puede modificar Depositos.", id_error: "stockDeposito"}});
                }

                await sql`
                    DELETE FROM
                        almacenamiento
                    WHERE
                        id_producto = ${producto.id_producto};
                `;

                for (const id of producto.depositos) {
                    await sql`
                        INSERT INTO 
                            almacenamiento (id_producto, id_deposito) 
                        VALUES (
                            ${producto.id_producto},
                            ${id}
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