'use client';  // Asegúrate de que este código se ejecute solo en el cliente

// Importa el hook para la redirección
import './globals.css';
import Header from './components/header';
import { useEffect, useState } from "react";
import Link from 'next/link';
import LoginPage from './LoginPage/page';
import toast, { Toaster } from 'react-hot-toast';

export default function RootLayout({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsAuthenticated(!!token); 
    toast.success('Bienvenido'+ setIsAuthenticated);
  }, []);

 

  return (
    <html lang="es">
      <body>
        
        {isAuthenticated ? (
          <>
        
            <Header />
            <main>{children}</main> 
          </>
        ) : (
          <div>
     
           
            <LoginPage />
          </div>
        )}
        
      </body>
    </html>
  );
}
