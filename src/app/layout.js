'use client';  // Asegúrate de que este código se ejecute solo en el cliente

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';  // Importa el hook para la redirección
import './globals.css';
import Header from './components/header';
import InicioSesion from './components/inicioSesion';

export default function RootLayout({ children }) {
  

 

    return (
      <html lang="es">
        <body>
          <Header />
          <main>{children}</main>
        </body>
      </html>
    );
  
}
