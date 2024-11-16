// src/app/consulta_productos/page.jsx

"use client";

import React, { useEffect, useState } from 'react';



export default function ConsultaProductos() {
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Hacer la petición al endpoint API de Next.js
    const fetchData = async () => {
      try {
        const response = await fetch('/api/consultaProductos');
        
        if (!response.ok) throw new Error('Error en la respuesta del servidor');
        const data = await response.json();
        console.log('Productos:', data);
        setProductos(data);
      } catch (error) {
        console.error('Error al obtener los productos:', error);
        setError('No se pudo obtener la lista de productos');
      }
    };

    fetchData();
  }, []);

  if (error) return <p>{error}</p>;

  return (
        <div>
        <h1>Lista de Productos</h1>
       
       
        {productos.length === 0 ? (
          <div >
            <button>
            <svg className='animate-spin  h-5 w-5 mr-3 '
            viewBox='0 0 24 24'>
              <circle cx="50" cy="50" r="40" />
            </svg>

            </button>

          </div>
        ) : (
            <ul>
              {productos.map((producto) => (
                <li key={producto.IDproductos}>
                  {producto.Nombre_Producto} - ${producto.Precio} - {producto.Existencias} - {producto.Descripcion}
                </li>
              ))}
            </ul>
        )}
        </div>

  
  );
}
