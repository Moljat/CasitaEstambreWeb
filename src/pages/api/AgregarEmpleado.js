import mysql from "mysql2/promise";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Método no permitido. Solo POST es aceptado." });
    }

    const {
        NombreEmp, ApellEmp, Celular, Fecha_Nac, Fecha_Alta, Folio
    } = req.body;

    // Validación de campos requeridos
    if (
        !NombreEmp ||
        !ApellEmp ||
        !Celular ||
        !Fecha_Nac ||
        !Fecha_Alta ||
        !Folio
    ) {
        return res.status(400).json({ error: "Todos los campos son requeridos." });
    
    }

    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            port: process.env.DB_PORT,
            password:process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
        });

        console.log("Conexión a la base de datos exitosa");

        await connection.query('USE casitaestambrebd');

        try {
            const query = `
                INSERT INTO empleados
                (NombreEmp, ApellEmp, Celular, Fecha_Nac, Fecha_Alta, Folio)
                VALUES ( ?, ?, ?, ?, ?, ?)
            `;
            const values = [
                NombreEmp, ApellEmp, Celular, Fecha_Nac, Fecha_Alta, Folio
            ];

            const [result] = await connection.execute(query, values);

            res.status(200).json({
                success: true,
                message: "Empleado agregado exitosamente.",
                result,
            });
        } catch (error) {
            console.error("Error al ejecutar el query:", error);
            res.status(500).json({ error: "Error al insertar datos en la base de datos." });
            
        } finally {
            await connection.end();
        }
    } catch (error) {
        console.error("Error en la conexión a la base de datos:", error);
        res.status(500).json({
            error: "Error interno del servidor al conectar con la base de datos.",
        });
    }
}
