const db = require('../dbconnector.js');

module.exports = (server) => {
    server.app.post('/api/producto/add', async (req, res) => {
        const producto = req.body.producto;

        if (producto.codigo.length <= 0) return res.json({ ok: false, error: { message: "Debes ingresar un codigo." } });
        if (producto.nombre.length <= 0) return res.json({ ok: false, error: { message: "Debes ingresar un nombre." } });
        if (producto.descripcion.length <= 0) return res.json({ ok: false, error: { message: "Debes ingresar una descripcion." } });
        if (producto.stock_minimo < 0) return res.json({ ok: false, error: { message: "Debes ingresar un stock minimo valido." } });
        if (producto.id_categoria < 0) return res.json({ ok: false, error: { message: "Debes ingresar una categoria valida." } });

        try {
            const queryStatus = await db.query(`
                INSERT INTO 
                    producto (codigo, nombre_producto, desc_producto, stock_minimo, id_categoria) 
                VALUES (
                    "${producto.codigo}",
                    "${producto.nombre}",
                    "${producto.descripcion}",
                    ${producto.stock_minimo},
                    ${producto.id_categoria}
                );
            `);
            
            if (!queryStatus) return res.json({ ok: false, error: { message: "Ha ocurrido un error." } });
        } catch (error) {
            console.error(error);
            return res.json({ ok: false, error: { message: error.message } });
        }

        return res.json({ ok:true });
    });
}