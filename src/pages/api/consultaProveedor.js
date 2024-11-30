// pages/api/consultaProductos.js

"use client";
import mysql from 'mysql2/promise';

export default async function handler(req, res) {
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
    const [rows] = await connection.execute('SELECT * FROM proveedores'); // Consulta a la base de datos
    res.status(200).json(rows);

    await connection.end();
  } catch (error) {
    console.error('Error en la conexión a la base de datos:', error);
    res.status(500).json({ error: 'Error interno del servidor al conectar con la base de datos' });
  }
}


