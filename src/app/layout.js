'use client';  // Asegúrate de que este código se ejecute solo en el cliente

// Importa el hook para la redirección
import './globals.css';
import Header from './components/header';


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
