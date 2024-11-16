'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { useEffect } from "react";

export default function InicioSesion() {
 

  const router = useRouter();  // Redirección
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
  
    // Validación de inicio de sesión (por ejemplo, con un usuario y contraseña predeterminados)
    if (username === 'admin' && password === '1234') {
      // Guardar el usuario en localStorage
      localStorage.setItem('user', JSON.stringify({ username }));
      console.log('Inicio de sesión correcto');
      toast.success('Inicio de sesión correcto');
  
      // Actualiza el estado de autenticación
      setIsAuthenticated(true);
      
    
  
      // Redirige a la página de inicio después de actualizar el estado
      router.push('/inicio');
    } else {
      toast.error('Usuario o contraseña incorrectos');
      console.error('Usuario o contraseña incorrectos');
    }
  };

  useEffect(() => {
    console.log('Autenticación actualizada:', isAuthenticated);
  }, [isAuthenticated]);

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
    <div className="bg-white p-8 rounded-lg shadow-lg w-96">
      <h2 className="text-2xl font-bold text-center mb-4">Iniciar sesión</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="username">Usuario</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700" htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md"
        >
          Iniciar sesión
        </button>
      </form>
    </div>
  </div>
  );
}
