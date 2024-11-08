// src/app/layout.js
import './globals.css';
import Header from './components/header';

export const metadata = {
  title: 'Casita de estambre',
  description: 'Sitio web de Casita de estambre',
};

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