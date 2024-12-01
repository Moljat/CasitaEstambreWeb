
export default async function handler(req, res) {
    if (req.method === 'POST') {
      const { email, password } = req.body;
  
      // Aquí realizarías la lógica de validación de usuario (como consultar una base de datos)
      if (email === 'moljat500@gmail.com' && password === '123') {
        // Si las credenciales son correctas, devuelve un token (esto es un ejemplo)
        const token = 'your-jwt-token'; // Genera un token JWT real en una aplicación real
        res.status(200).json({ token });
      } else {
        res.status(401).json({ error: 'Credenciales incorrectas' });
      }
    } else {
      res.status(405).json({ error: 'Método no permitido' });
    }
  }
  