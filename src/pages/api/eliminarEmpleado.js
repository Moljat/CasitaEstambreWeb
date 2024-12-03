"use client";
import mysql from 'mysql2/promise';

export default async function handler(req, res) {
  const { IDempleado } = req.body;


  try {
    const connection = await mysql.createConnection({ // Conexión a la base de datos
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      port: process.env.DB_PORT,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    console.log('Conexión a la base de datos exitosa');
    
    // Selecciona explícitamente la base de datos
    await connection.query('USE casitaestambrebd');

    // Realiza la consulta
    try {
      const query = `DELETE FROM empleados WHERE IDempleado = ?`;
      const values = [IDempleado];

      const [result] = await connection.execute(query, values);
      
      // Verifica si se eliminó alguna fila
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Proveedor no encontrado" });
      }

      res.status(200).json({ message: "Proveedor eliminado correctamente" });

    } catch (error) {
      console.error('Error al ejecutar el query:', error);
      res.status(500).json({ error: 'Error al acceder a ese proveedor' });
    } finally {
      await connection.end();
    }

  } catch (error) {
    console.error('Error en la conexión a la base de datos:', error);
    res.status(500).json({ error: 'Error interno del servidor al conectar con la base de datos' });
  }
}