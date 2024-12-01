"use client";

import mysql from "mysql2/promise";

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Método no permitido. Solo POST es aceptado.' });
    }

    const { IDproductos, Nombre_Producto, Existencias, Precio, Descripcion, ID_proveedor } = req.body;

    if (!IDproductos || !Nombre_Producto || !Existencias || !Precio || !Descripcion || !ID_proveedor) {
        return res.status(400).json({ error: 'Todos los campos son requeridos.' });
    }

    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            port: process.env.DB_PORT,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
        });

        console.log('Conexión a la base de datos exitosa');
        await connection.query('USE casitaestambrebd');

        try {
            const query = `
                INSERT INTO productos 
                (IDproductos, Nombre_Producto, Existencias, Precio, Descripcion, ID_proveedor)
                VALUES (?, ?, ?, ?, ?, ?)
            `;
            const values = [IDproductos, Nombre_Producto, Existencias, Precio, Descripcion, ID_proveedor];

            const [result] = await connection.execute(query, values);

            res.status(200).json({ success: true, result });
        } catch (error) {
            console.error('Error al ejecutar el query:', error);
            const sqlMessage = error.sqlMessage;
            res.status(500).json({ error: 'Error al insertar datos en la base de datos. \n' + sqlMessage });
        } finally {
            await connection.end();
        }
    } catch (error) {
        console.error('Error en la conexión a la base de datos:', error);
        res.status(500).json({ error: 'Error interno del servidor al conectar con la base de datos' });
    }
}
