
export default function handler(req, res) {
    if (req.method === "POST") {
      const { email, password } = req.body;
  
      if (email === "moljat800@gmail.com" && password === "tecome123") {
        const token = "yd37xcnsn12nxiam1"; // Genera un token real aquí
        return res.status(200).json({ token });
      }
  
      return res.status(401).json({ error: "Credenciales incorrectas" });
    }
  
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }