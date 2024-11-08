import mysql from 'mysql2/promise';



async function testConnection() {
  
  try {
    const connection = await mysql.createConnection({
      host: "127.0.0.1",
      user: "root",
      port: "3306",
      password: "12345",
      
      database: "casitaestambredb",
    });

    console.log('Conexión a la base de datos exitosa');
    const [rows] = await connection.execute('SELECT * FROM productos');
    console.log(rows);

    await connection.end();
  } catch (error) {
    console.error('Error en la conexión a la base de datos:', error);
  }
}

testConnection();
