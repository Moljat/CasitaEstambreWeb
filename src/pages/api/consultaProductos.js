// pages/api/consultaProductos.js

"use client";
import mysql from 'mysql2/promise';

export default async function handler(req, res) {
  console.log('Consultando productos...');
  try {
    const connection = await mysql.createConnection({
      host: "127.0.0.1",
      user: "root",
      port: "3306",
      password: "12345",   
      database: "casitaestambredb",
    });

    console.log('Conexión a la base de datos exitosa');

    // Aquí realizarías la consulta a la base de datos
    const [rows] = await connection.execute('SELECT * FROM productos');
    res.status(200).json(rows);

    await connection.end();
  } catch (error) {
    console.error('Error en la conexión a la base de datos:', error);
    res.status(500).json({ error: 'Error interno del servidor al conectar con la base de datos' });
  }
}

